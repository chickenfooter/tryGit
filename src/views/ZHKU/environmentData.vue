<template>
  <div>
    <div>
      <div id="main1" class="common1"></div>
      <div id="main2" class="common1"></div>
      <div id="main3" class="common1"></div>
    </div>
    <div>
      <div id="main4" class="common1"></div>
      <div id="main5" class="common1"></div>
      <div id="main6" class="common1"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
// 引入echarts
import Vue from 'vue'
// import echarts from 'echarts'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// echarts = require('echarts')
export default {
  data() {
    return {}
  },

  methods: {
    async getData(code) {
      const { data: res } = await this.$http.get(`/environment/getDate/${code}`).then((data) => {
        console.log(data)
        console.log(data.data.data)
        return data
      })
      if (res.code === 0) {
        console.log(res.data.data)
        // this.setKQWD(res)

        return {
          res,
        }
      }
    },
    setEcharts(res, name, labelName, idName) {
      var time = []
      var dataValue = []
      for (var i = 0; i < 10; i++) {
        time[i] = res.data.data[i].gmtCreate.substr(11, 5)
        dataValue[i] = res.data.data[i].value
      }
      console.log(time)
      let myChart = echarts.init(document.getElementById(idName))
      console.log(myChart)
      var option = {
        title: {
          text: labelName,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
            },
          },
        },
        legend: {
          //图例组件，通过点击图例控制哪些系列不显示，即小图例
          data: labelName,
        },
        xAxis: {
          data: time,
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            name: labelName,
            type: 'line',
            data: dataValue,
          },
        ],
      }
      myChart.clear() //如果图表有修改需求建议加上此方法先清后画
      myChart.setOption(option)
    },
    setKQWD() {
      //设置空气湿度
      var KQWD = 'KQWD'
      const res = this.getData(KQWD).then((res) => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        var time = []
        res = res.res
        this.setEcharts(res, KQWD, '空气温度', 'main1')
      })
    },
    setKQSD() {
      //设置空气湿度
      var KQSD = 'KQSD'
      const res = this.getData(KQSD).then((res) => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, KQSD, '空气湿度', 'main2')
      })
    },
    setGZQD() {
      //设置空气湿度
      var GZQD = 'GZQD'
      const res = this.getData(GZQD).then((res) => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, GZQD, '光照强度', 'main3')
      })
    },
    setEYHT() {
      //设置空气湿度
      var EYHT = 'EYHT'
      const res = this.getData(EYHT).then((res) => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, EYHT, '二氧化碳', 'main4')
      })
    },
    setPM() {
      //设置空气湿度
      var PM = 'PM'
      const res = this.getData(PM).then((res) => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, PM, 'PM2.5', 'main5')
      })
    },
    setZZ() {
      //设置空气湿度
      var ZZ = 'ZZ'
      const res = this.getData(ZZ).then((res) => {
        console.log(res.res.data.data)
        var promiseValueData = []
        promiseValueData = res.res.data.data
        console.log(promiseValueData)
        console.log(promiseValueData)
        // var time = []
        res = res.res
        this.setEcharts(res, ZZ, '噪音', 'main6')
      })
    },
  },
  mounted() {
    this.setKQWD()
    this.setKQSD()
    this.setGZQD()
    this.setEYHT()
    this.setPM()
    this.setZZ()
  },
}
</script>
<style>
.common1 {
  width: 500px;
  height: 400px;
  background-color: antiquewhite;
  border-radius: 1rem;
  display: inline-block;
  margin-left: 2rem;
}
</style>
