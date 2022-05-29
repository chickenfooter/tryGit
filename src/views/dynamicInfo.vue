<template>
  <div>
    <el-card shadow="never" class="body-card" v-loading="loading">
      <div class="newBox" v-for="(item, index) in newInfo" :key="index">
        <img v-show="item.picUrl === ''" class="imgBox" :src="item.picUrl" alt="" />
        <div class="textBox" @click="openDetail(item.detailUrl)">
          <div class="title">{{ item.title }}</div>
          <p class="content">{{ item.introduction }}</p>
          <div class="time">{{ item.publishTime }}</div>
          <el-divider></el-divider>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newInfo: [],
      loading: true,
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    //   获取数据
    async getInfo() {
      const { data: res } = await this.$http.get(`/dev1/news/paChong/9`)
      if (res.code === 0) {
        this.newInfo = res.data.list
        console.log(this.newInfo)
      }
      this.loading = false
    },
    openDetail(e) {
      this.$router.push({ path: '/dynamicDetails', query: { url: e } })
    },
  },
}
</script>

<style scoped>
.body-card {
  width: 100%;
}
.newBox {
  display: flex;
  margin-bottom: 15px;
}
.imgBox {
  width: 240px;
  height: 190px;
  margin-right: 30px;
}
.textBox {
  cursor: pointer;
}
.title {
  font-size: 25px;
  margin-bottom: 20px;
}
.title:hover {
  color: coral;
}
.content {
  color: #888;
  word-break: break-all;
  word-wrap: break-word;
  width: 750px;
  font-size: 15px;
  margin-bottom: 65px;
}
.content:hover {
  color: coral;
}
.time {
  font-size: 15px;
  color: #888;
}
</style>