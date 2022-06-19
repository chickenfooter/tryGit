<template>
  <div>
    <el-card shadow="never" style="min-height: 400px">
      <div>选择图片进行智能诊断</div>
      <div class="upImg">
        <el-upload
          class="upload-demo"
          ref="upload"
          list-type="picture-card"
          action="http://120.77.156.205:8804/dev1/test/intelligent_diagnosis"
          name="pic"
          :limit="1"
           :on-exceed="handleExceed"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="changefn"
          :on-success="successfn"
          :on-progress="progressfn"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-button class="jugdgeBtn" style="margin-left: 10px" size="small" type="success" @click="submitUpload">智能诊断</el-button>
      </div>
      <div  v-loading="loading" class="diseaseName">
        <div class="title">疾病名称</div>
        <span class="name" v-for="(item,index) in diseaseName" :key="index">{{item}}</span>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      diseaseName: [],
      loading: false
    }
  },
  methods: {
    changefn(file) {
        console.log(file,"123")
        this.dialogImageUrl = file.url
    },
    progressfn(event, file) {
        console.log(event, file,"图片")
    },
    successfn(response) {
        console.log(response,"诊断")
        if(response.code === 200) {
            this.diseaseName = response.data.classes
            this.$message.success("诊断成功！")
            this.loading = false
        }
    },
      handleExceed() {
        this.$message.warning(`当前限制选择 1 张图片`);
      },
    submitUpload() {
        this.loading = true
      this.$refs.upload.submit()
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePreview(file) {
      console.log(file)
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped>
.upImg {
  float: left;
  width: 40%;
  text-align: center;
  border-right: 1px solid rgb(193, 193, 193);
}
.jugdgeBtn {
  margin-top: 20px;
}
.title {
  font-size: 20px;
  font-weight: 500;
}
.diseaseName {
  float: right;
  width: 58%;
  margin-left: 1%;
}
.name {
    margin-top: 20px;
    margin-right: 10px;
    font-size: 15px;
}
</style>