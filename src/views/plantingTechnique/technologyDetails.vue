<template>
  <div>
    <el-card v-loading="loading">
      <div class="box">
        <div v-html="detailsHtml"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        detailUrl: '',
      },
      detailsHtml: '',
      loading:true
    }
  },
  created() {
    this.getDetailUrl()
    this.getDetailHtml()
  },
  methods: {
    getDetailUrl() {
       this.obj.detailUrl = this.$route.query.url
      // console.log(this.detailUrl, '参数')
    },

    // 根据url获取详情页
   async getDetailHtml() {
    const {data:res} =  await this.$http.post(`/dev1/technology/detail`,this.obj)
    if(res.code === 0) {
        this.detailsHtml = res.data.detailHtml
    }
    this.loading = false
   }
  },
}
</script>

<style scoped>
.box {
  min-height: 640px;
}
::v-deep .article-title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
}
::v-deep .article-detail .shrink {
  font-size: 16px;
  line-height: 10px;
}
</style>