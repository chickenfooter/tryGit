<template>
  <div>
    <el-card v-html="htmlInfo"></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        detailUrl: '',
      },
      htmlInfo: '',
    }
  },
  created() {
    this.obj.detailUrl = this.$route.query.url
    this.getDetails()
  },
  methods: {
    //   根据url获取详情页信息
    async getDetails() {
      const { data: res } = await this.$http.post(`/dev1/news/detail`, this.obj)
      console.log(res, '详情')
      if (res.code === 0) {
        this.htmlInfo = res.data.htmlText
      }
    },
  },
}
</script>

<style scoped>
</style>