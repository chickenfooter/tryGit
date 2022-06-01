<template>
  <!-- 图文诊断 -->
  <div>
    <!-- 查询 -->
       <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">疾病名称：</div>
          <el-input size="small" style="margin-left: 10px" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>疾病部位:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择">
            <el-option v-for="item in partOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div>
          <span>疾病类型:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择">
            <el-option v-for="item in diseaseOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="search" size="small">查询</el-button>
        </div>
      </div>
    </el-card>
    <!-- 查询结束 -->
    <!-- 展示开始 -->
    <el-card shadow="never">
      <el-row :gutter="20" v-for="(item, index) in Math.ceil(graphicInfo.length / 3)" :key="index">
        <el-col :span="8">
          <div class="boxDiv">
            <el-tooltip class="item" effect="light" content="预览" placement="top">
              <el-image
                style="width: 140px; height: 105px; margin-top: 5px"
                :src="graphicInfo[(item - 1) * 3 + 0].diseasePictureUrl"
                :preview-src-list="[graphicInfo[(item - 1) * 3 + 0].diseasePictureUrl]"
              >
              </el-image>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
              <div @click="openDetails((item - 1) * 3 + 0)" class="boxDivName">{{ graphicInfo[(item - 1) * 3 + 0].diseaseConciseDescription }}</div>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="boxDiv">
            <el-tooltip class="item" effect="light" content="预览" placement="top">
              <el-image
                style="width: 140px; height: 105px; margin-top: 5px"
                :src="graphicInfo[(item - 1) * 3 + 1].diseasePictureUrl"
                :preview-src-list="[graphicInfo[(item - 1) * 3 + 1].diseasePictureUrl]"
              >
              </el-image>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
              <div @click="openDetails((item - 1) * 3 + 1)" class="boxDivName">{{ graphicInfo[(item - 1) * 3 + 1].diseaseConciseDescription }}</div>
            </el-tooltip>
          </div></el-col
        >
        <el-col :span="8">
          <div class="boxDiv">
            <el-tooltip class="item" effect="light" content="预览" placement="top">
              <el-image
                style="width: 140px; height: 105px; margin-top: 5px"
                :src="graphicInfo[(item - 1) * 3 + 2].diseasePictureUrl"
                :preview-src-list="[graphicInfo[(item - 1) * 3 + 2].diseasePictureUrl]"
              >
              </el-image>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
              <div @click="openDetails((item - 1) * 3 + 2)" class="boxDivName">{{ graphicInfo[(item - 1) * 3 + 2].diseaseConciseDescription }}</div>
            </el-tooltip>
          </div></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphicInfo: [],
      pageInfo: {
        pagenum: 1,
        pagesize: 12,
      },
    }
  },
  created() {
    this.getgraphicInfo()
    console.log(Math.ceil(4 / 3))
  },
  methods: {
    // 获取图文
    async getgraphicInfo() {
      const { data: res } = await this.$http.get(`/dev2/disease-information/showDiseasePicture?pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
      if (res.code === 0) {
        this.graphicInfo = res.data.diseasePictureNameVOPage.records
      }
    },
    openDetails(index) {
      this.$router.push({ path: '/diseaseDetails', query: { id: this.graphicInfo[index].diseaseId } })
    },
  },
}
</script>

<style scoped>
.search-card {
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
}
.search-input {
  display: flex;
  align-items: center;
}
.el-button--search {
  background: rgb(8, 46, 83);
  color: #fff;
}
::v-deep .el-col {
  height: 120px;
  width: 452px;
  border: 1px solid #d9d9d9;
  margin-left: 22px;
  margin-bottom: 22px;
}
.boxDiv {
  display: flex;
  /* 针对子元素的垂直方向对齐方式 */
  align-items: center;
  /* 对子元素的水平方向对齐方式 */
  justify-content: center;
}
.boxDivName {
  margin-left: 10px;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.45);
}
::v-deep .el-col-8:hover {
  border: 1px solid #012a5d;
  cursor: pointer;
}
</style>