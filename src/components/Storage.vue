<template>
    <div>
        重要登录信息 请勿修改 直接复制，如果没有显示值则表明获取失败需要手动获取
    </div>
    <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            placeholder="请勿修改值！"
    />
</template>

<script lang="ts" setup>
import { ref ,onMounted} from 'vue'
const textarea = ref('')

onMounted(()=>{
    const storageObj = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key){
            const value = localStorage.getItem(key);
            storageObj[key] = value;
        }

    }
    textarea.value=JSON.stringify(storageObj)
})
</script>

<style scoped>

</style>
