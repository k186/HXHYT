<template>
    <img class="test-img" :src="imgurl">
    <el-input v-model="appointData.verifyCode" placeholder="手动输入上方验证码,自动抢号"
              @input="readyMakeAppointment"></el-input>
    <ul class="auto-list" id="list">
        <li class="auto-li" v-for="(el,index) in messageList" :key="index">
            <span class="auto-li-time">{{ el.time }}:&nbsp;&nbsp;&nbsp;</span>
            <span class="auto-li-log">{{ el.message }}</span>
        </li>
    </ul>
    <el-button v-if="count<maxCount&&count>0" @click="stopAppointment">停止预约</el-button>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import type {ConfirmAppointmentData} from "@/type/AppointmentData";
import {getImageCode, makeAppointment, getStorage} from "@/utils/api";
import defaultConfig from "../../defaultConfig";


type messageItem = {
    time: string;
    message: string;
}

let messageList = reactive<messageItem[]>([]);
const count = ref(0)
const maxCount = 3;

const sysScheduleId = getStorage('sysScheduleId');
const cardId = getStorage('cardId');

const appointData: ConfirmAppointmentData = reactive({
    hospitalCode: defaultConfig.hospitalCode,
    sysTimeArrangeId: "",
    channelCode: defaultConfig.channelCode,
    type: "HXGYAPP",
    appCode: defaultConfig.appCode,
    hospitalAreaCode: defaultConfig.hospitalCode,
    verifyCode: "",
    sysScheduleId: sysScheduleId,
    imageId: "",
    cardId: cardId,
    encrypt: "CFxR63YhhvL4CAoLtL+hKUnofAzCySKD5OgOIpP3AL4=",// 这个玩意儿每次获取就诊卡后会更新 有效期多久？
    appointmentType: 1
})

const readyMakeAppointment = (val: string) => {

    if (val.length === 4) {
        if (count.value === maxCount) {
            continueAppointment();
        }
        MakAppointment();

        appointData.verifyCode = '';
    }
}
const MakAppointment = () => {
    if (!checkContinue()) {
        debugger
        return
    }
    count.value++;
    addMessage('发起预约中...')
    makeAppointment.post('/cloud/hosplatcustomer/call/appointment/appointmentModel/sureAppointment', appointData)
        .then((res) => {
            addMessage('预约成功.自动预约程序已停止.')
            stopAppointment()
        }).catch(error => {
        addMessage(error)
        getImage();
    })
}
//check
const checkContinue = () => {
    if (count.value >= maxCount) {
        addMessage(`已达最大尝试次数(${maxCount}),如需继续请继续输入验证码.`);
        return false
    }
    return true
}
const imgurl = ref('')

//获取验证码图片 并识别
const getImage = () => {
    addMessage('获取验证码图片中...')
    getImageCode.post('/cloud/hosplatcustomer/customer/image/getimagecode', {
        appCode: defaultConfig.appCode,
        channelCode: defaultConfig.channelCode,
        type: "APP"
    }).then((res) => {
        addMessage('获取验证码图片成功！')
        // appointData.verifyCode
        // appointData.encrypt
        appointData.imageId = res.bizSeq;
        imgurl.value = `data:image/png;base64,${res.imageData}`;
        //imageToBlack(imgurl.value,null)
        addMessage('请输入验证码！！！！')
        checkContinue()
    }).catch(error => {
        addMessage('获取验证码图片失败,重新获取中...')
    })
}

const addMessage = (message: string) => {
    const mes = {
        time: genTime(),
        message,
    }
    messageList.push(mes);
    let dom = document.querySelector('#list')
    if (dom) {
        setTimeout(() => {
            dom.scrollTo(0, dom.scrollHeight)
        }, 0)
    }
}
const resetMessage = () => {
    messageList = [];
}

const genTime = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const startAppointment = () => {
    addMessage(`开启自动预约成功,正在自动操作请勿刷新页面.`)
    getImage();

}

const continueAppointment = () => {
    if (count.value < maxCount) {
        return
    }
    count.value = 0;
    addMessage(`正在继续预约,最大尝试次数${maxCount}`)
    getImage();
}
const stopAppointment = () => {
    count.value = maxCount - 1;
    addMessage(`已停止预约.`)
}

const imageToBlack = (base64Image: string,callback:Function) => {

// 创建一个Image对象
    const img = new Image();

// 当图片加载完成后
    img.onload = function () {
        // 创建一个Canvas元素
        const canvas = document.createElement('canvas');

        // 设置Canvas的宽高与图片一样
        canvas.width = img.width;
        canvas.height = img.height;

        // 在Canvas上绘制图片
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return
        }
        ctx.drawImage(img, 0, 0);

        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // 对图像数据进行黑白去噪处理
        for (let i = 0; i < imageData.data.length; i += 4) {
            const gray = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = gray;
            imageData.data[i + 1] = gray;
            imageData.data[i + 2] = gray;
        }

        // 在Canvas上绘制黑白去噪后的图片
        // // 去噪
        // debugger
        // cv.medianBlur(imageData, imageData, 3);

        ctx.putImageData(imageData, 0, 0);

        // 将Canvas转换为Base64格式
        const resultBase64 = canvas.toDataURL('image/jpeg');

        // 输出黑白去噪后的Base64图片数据
        debugger
        console.log(resultBase64)
        callback&&callback(resultBase64)

    };
// 设置Image的源为Base64图片数据
    img.src = base64Image;
}

onMounted(() => {
    startAppointment()
})

</script>
<style scoped>
.auto-list {
    list-style: none;
    width: 100%;
    padding: 0;
    border: 1px solid var(--el-border-color);
    height: 150px;
    overflow-y: auto;
}

.auto-list::-webkit-scrollbar {
    display: none;
}

.auto-li {
    padding: 5px;
    font-size: 12px;
    display: flex;
}

.auto-li-time {
    color: var(--el-color-success);
}

.auto-li-log {
    color: var(--el-color-primary);
}

.test-img {
    height: 100px;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,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);
}
</style>
