<script setup lang="ts">
import SetParams from "@/components/SetParams.vue";
import GetTokenDoc from "@/components/GetTokenDoc.vue";
import GetScheduleList from "@/components/GetScheduleList.vue";
import AutoAppointment from "@/components/AutoAppointment.vue";
import Storage from "@/components/Storage.vue";

import {ref} from "vue";

const stepActive = ref(1);
const tabActive = ref('2');

const changeStepTo = (step: number, data?: object | undefined) => {
    stepActive.value = step;
}
</script>

<template>
    <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane label="获取LocalStorage" name="1">
            <Storage/>
        </el-tab-pane>
        <el-tab-pane label="预约" name="2">
            <el-container>
                <el-header>
                    <el-steps :active="stepActive" finish-status="success" process-status="finish">
                        <el-step title="Step 1" description="设置token"/>
                        <el-step title="Step 2" description="选择挂号日期"/>
                        <el-step title="Step 3" description="自动抢号"/>
                    </el-steps>

                </el-header>
                <el-main>
                    <el-row :gutter="10" v-if="stepActive===0">
                        <el-col :span="12">
                            <SetParams @on-submit="changeStepTo(1)"/>
                        </el-col>
                        <el-col :span="12">
                            <GetTokenDoc/>
                        </el-col>
                    </el-row>


                    <el-row :gutter="10" v-if="stepActive===1">
                        <el-col :span="12">
                            <GetScheduleList @on-submit="(rowData)=>{changeStepTo(2,rowData)}"/>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" v-if="stepActive===2">
                        <el-col :span="12">
                            <AutoAppointment/>
                        </el-col>
                    </el-row>
                    <el-alert
                        style="margin: 20px 0"
                        title="警告！当前操作直接忽略系统8点锁定和选就诊卡步骤，直接进入预约确认页面,不能保证100%能预约成功。"
                        type="warning"/>
                </el-main>
            </el-container>
        </el-tab-pane>
        <el-tab-pane label="报告" name="3">Config</el-tab-pane>
    </el-tabs>

</template>
