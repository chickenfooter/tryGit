<template>
  <div>
    <el-card shadow="never" class="body-card">
      <!-- 头部名称 -->
      <div class="title">{{ detailsInfo.diseaseChineseName }}</div>
      <!-- tabs -->
      <div class="tabsBox">
        <div class="tabsName">{{ tabsName[activeName] }}</div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first"></el-tab-pane>
          <el-tab-pane label="防控措施" name="second"></el-tab-pane>
          <el-tab-pane label="发生&分布" name="third"></el-tab-pane>
          <el-tab-pane label="图片集" name="fourth"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="card-left">
        <!-- 图片 -->
        <div>
          <img class="imgBox" :src="detailsInfo.diseasePictureUrl" />
          <el-card shadow="never">
            <div class="contain">
              <el-row v-if="detailsInfo.diseaseChineseName != ''" :gutter="10" class="dashed">
                <el-col :span="20">
                  <div class="mes">
                    <p class="mes1">名称：</p>
                    <p class="mes2">{{ detailsInfo.diseaseChineseName }}</p>
                  </div>
                </el-col>
              </el-row>

              <el-row v-if="detailsInfo.diseaseTrivialName != ''" :gutter="10" class="dashed">
                <el-col :span="20">
                  <div class="mes">
                    <p class="mes1">常用名/俗名：</p>
                    <p class="mes2">{{ detailsInfo.diseaseTrivialName }}</p>
                  </div>
                </el-col>
              </el-row>

              <el-row v-if="detailsInfo.diseaseEnglishName != ''" :gutter="10" class="dashed">
                <el-col :span="20">
                  <div class="mes">
                    <p class="mes1">英文名：</p>
                    <p class="mes2">{{ detailsInfo.diseaseEnglishName }}</p>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="10" class="dashed">
                <el-col :span="20">
                  <div class="mes">
                    <p class="mes1">分类：</p>
                    <!-- <p>{{ showPassword }}</p> -->
                  </div>
                </el-col>
              </el-row>

              <el-row v-if="detailsInfo.diseasePathogen != ''" :gutter="10" class="dashed">
                <el-col :span="20">
                  <div class="mes">
                    <p class="mes1">病原物：</p>
                    <p class="mes2">{{ detailsInfo.diseasePathogen }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div class="footer"></div>
      </div>
      <div class="card-right">
        <el-card style="height: 620px" shadow="never">
          <!-- 基础信息 -->
          <div v-show="activeName === 'first'" class="baseInfoBox">
            <div>简介：</div>
            <br />
            <div style="color: coral">{{ detailsInfo.diseaseIntroduce }}</div>
            <br />
            <div>主要症状：</div>
            <br />
            <div style="color: coral">{{ detailsInfo.diseaseSymptom }}</div>
          </div>
          <!-- 防控措施 -->
          <div v-show="activeName === 'second'">
            <div class="controlBox">
              <span>病原物：</span>
              <span style="color: rgb(255, 153, 0)">{{ detailsInfo.diseasePathogen }}</span>
              <div style="margin-top: 20px; font-size: 20px; color: coral">防控措施</div>
              <el-divider></el-divider>
              <div style="color: rgb(255, 153, 0)">{{ detailsInfo.diseaseTreatment }}</div>
              <div style="margin-top: 40px; font-size: 20px; color: coral">{{ detailsInfo.diseaseChineseName }}防治课堂</div>
              <el-divider></el-divider>
              <a :href="detailsInfo.diseaseVideo">{{ detailsInfo.diseaseChineseName }}防治视频教学：{{ detailsInfo.diseaseVideo }}</a>
              <div style="margin-top: 40px; font-size: 20px; color: coral">{{ detailsInfo.diseaseChineseName }}用药指导</div>
              <el-divider></el-divider>
              <span class="insecticideName" v-for="(item, index) in picAndInfo" :key="index" @click="insecticideUse(item)">
                {{ item }}
              </span>
            </div>
          </div>
          <!-- 分布 -->
          <div v-show="activeName === 'third'">
            <img style="height: 600px; width: 100%" :src="detailsInfo.diseaseDistribution" alt="" />
          </div>
          <!-- 图片集 -->
          <div class="picture" v-show="activeName === 'fourth'">
            <div class="pictureChoose">
              <el-radio @change="pictureType" v-for="(item, index) in radioInfo" :key="index" v-model="radio" :label="index">{{ item }}</el-radio>
            </div>
            <img v-for="(item, index) in pictureInfo" :key="index" :src="item" alt="" />
          </div>
        </el-card>
      </div>
    </el-card>
    <!-- 使用详情 -->
    <el-dialog title="使用详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div>
        <div style="margin-bottom:15px">
          <span class="dialog_span">使用说明：</span><span class="dialog_span1">{{ insecticideDetails.instruction }}</span>
        </div>
        <div style="margin-bottom:15px">
          <span class="dialog_span">储存说明：</span><span class="dialog_span1">{{ insecticideDetails.attention }}</span>
        </div>
        <div style="margin-bottom:15px">
          <span class="dialog_span">使用注意事项：</span><span class="dialog_span1">{{ insecticideDetails.emergencyTreatment }}</span>
        </div>
        <div style="margin-bottom:15px">
          <span class="dialog_span">其他：</span><span class="dialog_span1">{{ insecticideDetails.remarks }}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioInfo: ['全部', '根', '茎', '叶', '树干', '枝', '新梢', '果'],
      radio: 0,
      diseaseId: '',
      detailsInfo: {},
      activeName: 'first',
      tabsName: {
        first: '基础信息',
        second: '防控措施',
        third: '发生&分布',
        fourth: '图片集',
      },
      cardInfo: {
        diseaseChineseName: '',
        diseaseEnglishName: '',
        diseaseTrivialName: '',
      },
      pictureInfo: [],
      picAndInfo: [],
      // 农药使用详情
      insecticideDetails: {},
      dialogVisible: false,
    }
  },
  created() {
    this.getDiseaseId()
    this.getDetailsInfo()
    this.getPictureInfo()
  },
  methods: {
    // 接收参数
    getDiseaseId() {
      this.diseaseId = this.$route.query.id
      console.log(this.diseaseId, '参数')
    },
    // 根据主键获取详情页信息
    async getDetailsInfo() {
      const { data: res } = await this.$http.get(`/dev2/disease-information/showDiseaseInformation?diseaseId=${this.diseaseId}`)
      console.log(res)
      if (res.code === 0) {
        this.detailsInfo = res.data.showDiseaseInfoVO
        this.getpicAndInfo()
      }
    },
    // 根据主键获取图片集
    async getPictureInfo() {
      const { data: res } = await this.$http.get(`/dev3/picture/getpicAndName/${this.diseaseId}`)
      if (res.code === 0) {
        this.pictureInfo = res.data.list
      }
    },
    // 对应部位的图片
    async pictureType() {
      if (this.radio) {
        const { data: res } = await this.$http.get(`/dev3/picture/getpicAndName/${this.diseaseId}/${this.radio}`)
        if (res.code === 0) {
          // 将文字都删除掉，留下对应的链接
          res.data.list.forEach((item, index, arr) => {
            // 不是链接的删除掉
            if (item.indexOf('http') == -1) {
              arr.splice(index, 1)
            }
          })
          this.pictureInfo = res.data.list
        }
      } else {
        this.getPictureInfo()
      }
    },
    // 根据疾病名称获取对应农药
    async getpicAndInfo() {
      // this.detailsInfo.diseaseTrivialName
      if (this.detailsInfo.diseaseChineseName === '柑桔黄龙病') {
        this.detailsInfo.diseaseChineseName = '柑橘黄龙病'
      }
      const { data: res } = await this.$http.get(`/orange_service/insecticide/getpicAndName/{diseaseName}?diseaseName=${this.detailsInfo.diseaseChineseName}`)
      // console.log(res)
      if (res.code === 0) {
        this.picAndInfo = res.data.list
      }
    },
    // 根据农药名称获取农药使用详情
    async insecticideUse(e) {
      this.dialogVisible = true
      const { data: res } = await this.$http.get(`/orange_service/insecticide/getpicAndName/{insecticideName}?insecticideName=${e}`)
      if (res.code === 0) {
        this.insecticideDetails = res.data.insecticideVoArrayList[0]
      }
    },
    handleClick(tab, event) {
      console.log(tab.name, event)
      console.log(this.activeName)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<style scoped>
.body-card {
  width: 100%;
}
.card-left {
  width: 30%;
  float: left;
}
.card-right {
  width: 69%;
  float: right;
  margin-left: 1%;
}
.title {
  font-size: 20px;
  color: coral;
}
.tabsBox {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.tabsName {
  font-size: 18px;
  color: #666;
}
::v-deep .el-tabs__content {
  overflow: visible;
}
::v-deep .el-tabs__item {
  font-size: 16px;
  color: #000;
}
::v-deep .el-tabs__item:hover {
  color: rgb(255, 102, 0);
}
::v-deep .el-tabs__item.is-active {
  color: rgb(255, 102, 0);
}
::v-deep .el-icon-arrow-left {
  color: #000;
}
::v-deep .el-icon-arrow-right {
  color: #000;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
::v-deep .el-tabs__active-bar {
  background-color: rgb(255, 102, 0);
}
.imgBox {
  border: 1px solid #000;
  width: 270px;
  height: 240px;
}
.dashed {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: dashed 1px #e5e5e5;
}
.mes {
  display: flex;
  align-items: center;
}
.mes1 {
  white-space: nowrap;
  font-weight: 700;
  margin-right: 15px;
}
.mes2 {
  font-weight: 700;
  color: coral;
}
.footer {
  height: 10px;
}
.baseInfoBox {
  font-size: 18px;
}
.controlBox {
  font-size: 18px;
}
.el-divider--horizontal {
  margin-top: 0px;
  height: 3px;
  background-color: coral;
}
.picture img {
  margin-right: 10px;
  width: 285px;
  height: 245px;
}
.pictureChoose {
  margin-bottom: 25px;
}
::v-deep .el-radio__label {
  font-size: 17px;
}
.insecticideName {
  font-size: 19px;
  margin-right: 25px;
  cursor: pointer;
}
.insecticideName:hover {
  color: coral;
}
.dialog_span {
  font-size: 18px;
  color: coral;
}
.dialog_span1 {
  font-size: 16px;
  line-height: 15px;
}
</style>