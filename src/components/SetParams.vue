<template>
    <el-form ref="ruleFormRef" :model="form" label-width="120px" :rules="rules" status-icon>
        <el-form-item label="token" prop="token">
            <el-input v-model.trim="form.token" placeholder="请设置token"/>
        </el-form-item>
        <el-form-item label="cardId" prop="cardId">
            <el-input type="password" v-model.trim="form.cardId" placeholder="cardId"/>
        </el-form-item>
        <el-form-item label="doctorId" prop="doctorId">
            <el-input type="password" show-password v-model.trim="form.doctorId" placeholder="请设置doctorId"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">下一步</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from "element-plus";
import defaultConfig from "../../defaultConfig";
import {storageKey} from "@/utils/api";

const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(['onSubmit'])

const {token, cardId, doctorId} = defaultConfig;

const form = reactive({
    token,
    cardId,
    doctorId
})
const rules = reactive<FormRules>({
    token: [
        {required: true, message: 'token为必填项！', trigger: 'blur'}
    ],
    doctorId: [
        {required: true, message: 'doctorId为必填项！', trigger: 'blur'}
    ]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return
    }
    await formEl.validate((valid, fields) => {
        if (valid) {
            window.localStorage.setItem(storageKey, JSON.stringify(form))
            window.localStorage.setItem('helpLess', '抢号不易,求大佬放过')
            emit('onSubmit', form)
        }
    })
}
</script>
