<template>
    <div style="display: flex;align-items: center;padding: 20px 0;">
        <el-avatar :size="50" :src="doctorInfo.docHeadImage"/>
        <el-text style="margin-left: 10px" class="mx-1" size="default" type="primary">{{ doctorInfo.docName }}</el-text>
        <el-text style="margin-left: 10px" class="mx-1" size="small" type="danger">
            请确认好医生和要预约的日期！！！剩余量为空无法挂号！！
        </el-text>
    </div>
    <el-table stripe :data="tableData" style="width: 100%" highlight-current-row>
        <el-table-column type="index"/>
        <el-table-column label="日期">
            <template #default="scope">
                <div>{{ scope.row.scheduleDate}}{{scope.row.scheduleRange==1?'下午':'上午'}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="availableCount" label="剩余量" width="180"/>
        <el-table-column label="挂号费" width="80">
            <template #default="scope">
                <div>{{ scope.row.regFee + scope.row.serviceFee }}</div>
            </template>
        </el-table-column>
        <el-table-column fixed="right" width="80">
            <template #default="scope">
                <el-button size="small" type="primary" round @click="onSubmit(scope.row)">预约</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script lang="ts" setup>
import {onMounted, ref, reactive, toRefs} from "vue";
import {postAppointment, storageKey, getStorage} from "@/utils/api";
import type {AppointmentData, DoctorData, DoctorScheduleRowData} from "@/type/AppointmentData";
import {ElMessage, ElMessageBox, ElLoading} from 'element-plus';
import defaultConfig from "../../defaultConfig";

/* 这里只获取 华西本部的 hospitalCode:"HID0101" */
const emit = defineEmits(['onSubmit'])
const tableData = ref([])
const doctorInfo: DoctorData = reactive({
    docName: '',
    docHeadImage: ''
})

const appointment: AppointmentData = reactive({
    appointmentType: defaultConfig.appointmentType,
    channelCode: "PATIENT_IOS",
    hospitalAreaCode: "",
    deptCode: "",
    doctorId: defaultConfig.doctorId,
    appCode: defaultConfig.appCode,
    hospitalCode: defaultConfig.hospitalCode,
    tabAreaCode: "",
    deptCategoryCode: ""
});


const getTableData = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '数据加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    postAppointment.post('/cloud/hosplatcustomer/call/appointment/selDoctorDetailsTwo', appointment)
        .then((res) => {
            doctorInfo.docName = res.docName;
            doctorInfo.docHeadImage = res.docHeadImage;
            tableData.value = res.sourceItemsRespVos;
            setTimeout(() => {
                loading.close()
            }, 1000)
        }).catch(error => {
        ElMessage.error('获取排班列表失败');
        setTimeout(() => {
            loading.close()
        }, 1000)
    })
}

onMounted(() => {
    let params = getStorage();
    if (!params.doctorId) {
        ElMessage.error('医生Id为空')
    } else {
        appointment.doctorId = params.doctorId;
        getTableData()
    }
})

const onSubmit = (rowData: DoctorScheduleRowData | undefined) => {
    if (!rowData || rowData.availableCount === 0) {
        ElMessageBox.confirm(
            '请优先选择有余量的!!!',
            'Warning',
            {
                confirmButtonText: '我就要这个',
                cancelButtonText: '换一个',
                type: 'warning',
            }
        )
            .then(() => {
                if (rowData) {
                    emit('onSubmit', toRefs(rowData));
                    setSysScheduleId(rowData.sysScheduleId)
                }
            })
            .catch(() => {

            })
    } else {
        emit('onSubmit', toRefs(rowData));
        setSysScheduleId(rowData.sysScheduleId)
    }
}

const setSysScheduleId = (sysScheduleId:string) => {
    let data = getStorage() || {};
    data.sysScheduleId = sysScheduleId;
    window.localStorage.setItem(storageKey, JSON.stringify(data))
}


</script>
