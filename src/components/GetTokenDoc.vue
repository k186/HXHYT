<template>
    <el-link type="primary" :href="href">
        点击查看获取token教程
        <el-icon class="el-icon--right">
            <icon-view/>
        </el-icon>
    </el-link>
</template>

<script setup>
import { ref } from "vue";
import {  View as IconView } from '@element-plus/icons-vue'

const href = ref('')

</script>
