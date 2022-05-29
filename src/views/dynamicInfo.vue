<template>
  <div>
    <el-card shadow="never" class="body-card">  </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
        const {data:res} = await this.$http.get(`/dev1/news/paChong/9`)
        console.log(res)
    },
  },
}
</script>

<style scoped>
.body-card {
    width: 100%;
    height: 700px;
}
</style>