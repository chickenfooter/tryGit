<template>
  <div>
    <el-card shadow="never" style="margin-bottom: 15px">
      <div class="search-card">
        <div class="search-input">
          <div style="flex-shrink: 0">疾病名称：</div>
          <el-input size="small" style="margin-left: 10px" v-model="searchInfo.name" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>疾病部位:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择" v-model="searchInfo.part">
            <el-option v-for="part in partOptions" :key="part.value" :label="part.label" :value="part.value"> </el-option>
          </el-select>
        </div>
        <div>
          <span>疾病类型:</span>
          <el-select size="small" style="margin-left: 10px" placeholder="请选择" v-model="searchInfo.disease">
            <el-option v-for="item in diseaseOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div>
          <el-button v-if="loginStatus == '2'" size="small" @click="addSearchInfo()">添加</el-button>
          <el-drawer title="我嵌套了 Form !" :before-close="handleClose" :visible.sync="dialog" direction="ltr" custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
              <!-- 嵌套的表单 -->
              <el-form :model="form">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                  <div v-for="item in formLabelAlign">
                    <el-form-item :label="item.title">
                      <el-input v-model="formLabelAlign.citruspartid"></el-input>
                    </el-form-item>
                  </div>
                </el-form>
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
              </div>
            </div>
          </el-drawer>
          <el-button size="small" @click="newSearchInfo()">重置</el-button>
          <el-button type="search" size="small" @click="toSearch()">查询</el-button>
        </div>
      </div>
    </el-card>
    <el-card shadow="never">
      <el-table v-loading="loading" :data="tableData" min-height="400" border style="width: 100%; cursor: pointer" @row-click="openedDetails">
        <!-- <el-table-column prop="date" label="序号" width="80"> </el-table-column> -->
        <el-table-column header-align="center" align="center" prop="diseaseChineseName" label="疾病名称" width="150"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="disasterTypeName" label="疾病类型" width="150"> </el-table-column>
        <el-table-column header-align="center" prop="diseaseIntroduce" label="疾病简介"> </el-table-column>
        <el-table-column header-align="center" label="疾病表现">
          <template slot-scope="props">
            <el-tooltip class="item" effect="dark" placement="top">
              <div style="width: 440px; font-size: 16px" slot="content">{{ props.row.diseaseSymptom }}</div>
              <div>{{ props.row.diseaseSymptom }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-if="loginStatus == '2'"
          fixed="right"
          label="操作"
          width="50">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[7, 10, 14, 16]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 7,
      },
      total: 10,
      flag: true,
      partOptions: [
        { value: '1', label: '根' },
        { value: '2', label: '茎' },
        { value: '3', label: '叶' },
        { value: '4', label: '树干' },
        { value: '5', label: '枝' },
        { value: '6', label: '新梢' },
        { value: '7', label: '果' },
      ],
      diseaseOptions: [
        { value: '1', label: '虫害' },
        { value: '2', label: '病害' },
        { value: '3', label: '生理病害' },
        { value: '4', label: '草害' },
        { value: '5', label: '天敌' },
      ],
      searchInfo: {
        name: '',
        part: '',
        disease: '',
      },
      tableData: [],
      loading: true,
      formLabelAlign: [
        { title: '柑橘编号' },
        { title: '疾病分类' },
        { title: '名称' },
        { title: '疾病介绍' },
        { title: 'diseaseIntelligence' },
        { title: '病原体' },
        { title: '英文名' },
        { title: '疾病症状' },
        { title: '治疗方法' },
        { title: '常用名/俗名' },
      ],
      form: {
        diseasetypeid: '',
        diseaseclass: '',
        chinesename: '',
        distribution: '',
        diseaseintelligence: '',
        pathogen: '',
        englishname: '',
        diseasesymptom: '',
        diseasetreatment: '',
        diseasetrivialname: '',
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },
  created() {
    this.getDiseaseInfo()
    const loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'));
    if (loginStatus !== null) {
      this.$store.commit('user/login_status', loginStatus)
    }
  },
  mounted() {
    window.addEventListener('beforeunload', (e) => {
      sessionStorage.setItem('loginStatus', JSON.stringify(this.$store.state.user.loginStatus))
    })
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
    })
  },
  methods: {
    // 分页获取疾病数据
    async getDiseaseInfo() {
      const { data: res } = await this.$http.get(`/dev2/disease-information/browse?pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
      console.log(res)
      if (res.code === 0) {
        this.tableData = res.data.browse.records
        this.total = res.data.browse.total
      }
      this.loading = false
    },
    // 查看详情
    openedDetails(row) {
      console.log('点击', row)
      this.$router.push({ path: '/diseaseDetails', query: { id: row.diseaseId } })
    },
    // 查询
    async toSearch() {
      // console.log(this.searchInfo, '查询数据')
      if (this.searchInfo.name === '' && this.searchInfo.part === '') {
        const { data: res } = await this.$http.get(`/dev2/disease-information/browseLike?disasterTypeId=${this.searchInfo.disease}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      } else if (this.searchInfo.name === '' && this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(`/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`)
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      } else if (this.searchInfo.part === '' && this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      } else if (this.searchInfo.name === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&disasterTypeId=${this.searchInfo.disease}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      } else if (this.searchInfo.part === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?disasterTypeId=${this.searchInfo.disease}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      } else if (this.searchInfo.disease === '') {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      } else {
        const { data: res } = await this.$http.get(
          `/dev2/disease-information/browseLike?citrusPartId=${this.searchInfo.part}&disasterTypeId=${this.searchInfo.disease}&diseaseChineseName=${this.searchInfo.name}&pageNum=${this.pageInfo.pagenum}&pageSize=${this.pageInfo.pagesize}`
        )
        if (res.code === 0) {
          this.tableData = res.data.browse.records
          this.total = res.data.browse.total
          this.$message.success('查询成功')
        }
      }
    },
    // 重置查询条件
    newSearchInfo() {
      ;(this.searchInfo.name = ''), (this.searchInfo.part = ''), (this.searchInfo.disease = '')
    },
    // 添加疾病数据
    async addSearchInfo() {
      const { data: res } = await this.$http.post(`/dev2/disease-information/add`)
      if (res.code === 0) {
        //添加成功
      } else {
        //添加失败
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pagesize = val
      this.getDiseaseInfo()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pagenum = val
      this.getDiseaseInfo()
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch((_) => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
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
/* ::v-deep .cell {
  height: 71px;
  overflow: hidden;
  text-overflow: ellipsis;
} */
</style>
