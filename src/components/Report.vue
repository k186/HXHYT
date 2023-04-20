<template>
    <div class="reporter-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="条码号" style="display: flex">
                <el-input v-model="formInline.reportNo" pattern="[0-9]*" type='tel' placeholder="请输入报告号">
                    <template #append>
                        <el-button icon="Search" @click="Search">
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
        >
            <el-table-column prop="date" label="项目" width="180"/>
            <el-table-column prop="name" label="结果" width="180">

            </el-table-column>
            <el-table-column prop="address" label="单位"/>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
/*
* {"appCode":"HXGYAPP","organCode":"HID0101","channelCode":"PATIENT_IOS","cardId":"357951771529842688","reportType":"1","reportNo":"120749663100","reportName":"尿液分析(干化学)+尿沉渣定量分析"}

https://hytapiv2.cd120.com/cloud/hosplatcustomer/elecreport/querydetails

* */
import {reactive} from "vue";
import {getReport} from "@/utils/api";

interface Row {
    "resultType": number,
    "itemName": string,
    "resultValue": string,
    "unit": string,
    "referValue": string
}

interface FormData {
    reportNo: string
}

const formInline: FormData = reactive({
    reportNo: "120749663100",
    "appCode": "HXGYAPP",
    "organCode": "HID0101",
    "channelCode": "PATIENT_IOS",
    "cardId": "357951771529842688",
    "reportType": 2,
    "reportName": "尿液分析(干化学)+尿沉渣定量分析"
})


const tableRowClassName = ({row, rowIndex,}: {
    row: Row
    rowIndex: number
}) => {
    if (rowIndex === 1) {
        return 'warning-row'
    } else if (rowIndex === 3) {
        return 'success-row'
    }
    return ''
}

let tableData: Row[] = reactive([])

const Search = () => {
    getReport.post('/cloud/hosplatcustomer/elecreport/querydetails', formInline)
        .then(res => {
            tableData = res
        })
        .catch(error => {

        })
}


</script>

<style scoped>
.reporter-container {
    display: flex;
    flex-direction: column;
}

</style>
