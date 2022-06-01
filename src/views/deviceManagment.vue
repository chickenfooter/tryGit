<template>
    <div>
      <el-card shadow="never">
      <el-table v-loading="loading" :data="tableData" max-height="510" border style="width: 100%; cursor: pointer" @row-click="openedDetails">
        <el-table-column  label="序号" width="80"> </el-table-column>
        <el-table-column label="类型编号" width="140"> </el-table-column>
        <el-table-column label="类型名" width="300"> </el-table-column>
        <el-table-column  label="指标参数" width="100"> </el-table-column>
        <el-table-column  label="操作"> </el-table-column>
      </el-table>
    </el-card>
    </div>
</template>
