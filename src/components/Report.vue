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
                header-align="center"
                size="small"
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
        >
            <el-table-column prop="itemName" label="项目"/>
            <el-table-column label="结果">
                <template #default="scope">
                    <div>
                        <div>{{ scope.row.resultValue }} <span
                                v-if="scope.row.resultType>1">{{ getArrow(scope.row.resultType) }}</span></div>
                        <div class="reporter-refer">参考范围:({{ scope.row.referValue }})</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="70"/>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
/*
*
* {
	"appCode": "HXGYAPP",
	"organCode": "HID0101",
	"channelCode": "PATIENT_IOS",
	"cardId": "357951771529842688",
	"reportType": "1",
	"reportNo": "120749663200",
	"reportName": "BK-JC病毒载量分析"
}

https://hytapiv2.cd120.com/cloud/hosplatcustomer/elecreport/querydetails

* */
import {reactive, ref} from "vue";
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
    //reportNo: "120749663200",
    reportNo: "120749663100",
    "appCode": "HXGYAPP",
    "organCode": "HID0101",
    "channelCode": "PATIENT_IOS",
    "cardId": "357951771529842688",
    "reportType": "1",
    "reportName": ""
})


const tableRowClassName = ({row, rowIndex,}: {
    row: Row
    rowIndex: number
}) => {
    let result = ''
    switch (row.resultType) {
        case 1:
            result = 'warning-row'
            break
        case 2:
            result = 'primary-row'
            break
    }

    return result
}

let tableData = ref(null)

const Search = () => {
    getReport.post('/cloud/hosplatcustomer/elecreport/querydetails', formInline)
        .then(res => {
            tableData.value = res.resultItems
        })
        .catch(error => {

        })
}
const getArrow = (resultType: number | 0) => {
    let result = ''
    switch (resultType) {
        case 1:
            result = '↑'
            break
        case 2:
            result = '↓'
            break
        default:
            result = ''
            break
    }
    return result
}

</script>

<style>
.reporter-container {
    display: flex;
    flex-direction: column;
}

.reporter-refer {
    color: var(--el-color-info-dark-2);
    font-size: 12px;
}

.el-table .warning-row {
    color: var(--el-color-error) !important;
}

.el-table .primary-row {
    color: var(--el-color-primary) !important;
}
</style>
