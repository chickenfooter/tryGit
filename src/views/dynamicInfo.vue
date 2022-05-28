<template>
    <div class="all" v-html="newInfo">
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            newInfo: "<div id='c108w' class='d-art'><p> <strong>【柑橘<a href='http://m.ganjuren.com/bhch/peifang/36' target='_blank'><u>灰霉病</u></a>的症状】</strong></p> <p> 在我国柑橘产区多有发生。为害花、嫩叶、枝条和幼果。开花期间遇阴雨天气，花瓣上先出现水渍状小圆点，随后迅速扩大为黄褐色的病斑，引起花瓣腐烂，并长出灰黄色霉层。天气干燥，则呈淡褐色干腐。当发病的花瓣与嫩叶、幼果或有伤口的小枝条接触时，则可使其发病。嫩叶上的病斑，在潮湿天气时呈水渍状软腐，干燥时呈淡黄褐色，半透明。小枝受害后常枯萎。果上病斑常呈木栓化，或稍隆起，形状不规则，幼果受害易脱落。成熟果发病部位褐色、变软，上生鼠灰色霉层，失水后干枯变硬。</p> <p> <strong>【<a href='http://m.ganjuren.com/bhch/peifang/36' target='_blank'><u>柑橘灰霉病</u></a>的防治方法】</strong></p> <p> (1)农业措施。冬季清园结合修剪，剪除病枝病叶烧毁。花期发病，早晨趁露水未干时摘除病花，以减少侵染源。</p> <p> (2)化学防治。在开花前喷1~2次药剂预防，可用70%甲基托布津可湿性粉剂800倍液，0.5%石灰等量式波尔多液，20%噻菌铜悬浮剂500倍液等。</p> </div>",
            html: ""
        }
    },
    created() {
        this.getInfo()
    },
    methods: {
       async getInfo() {
           const {data: res} = await this.$http.get('http://www.ganjuren.com/jishu/bchgl/')
           console.log(res)
        }
    }
}
</script>

<style scoped>
.all {
    width: 100%;
    height: 600px;
}
</style>