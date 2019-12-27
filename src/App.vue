<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class='content'>
      <div ref="newUsers" class="minecharts" :style="{height: '600px',padding:'10px 0 10px 5px'}"></div>
      <div ref="echarts" class="minecharts" :style="{height: '600px',padding:'10px 0 10px 5px'}"></div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data(){
    return {
      minioEcharts:null,
      initOptions:{
        tooltip: {
            trigger: 'axis'
        },
        legend:{
            // 更新此处数据
            data:[],
            // 更新此处数据
            selected:{
                // '邮件营销':false
            },
            // type: 'scroll',
            bottom: 0,
        },
        xAxis: {
            data: []
        },
        grid: {
            left: '2%',
            right: '3%',
            top: '2%',
            containLabel: true
        },
        // yAxis: {
        //     minInterval: 1,
        // },
         yAxis: [
          {  
            type: 'value',  
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              },  
            show: true,
            max: 100,
            interval: 10
          }  
        ],
        series: [],
      },
      init2options:{
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter(params){
          let str = params[0].name+"<br/>";
          for (let index = 0; index < params.length; index++) {
              const element = params[index];
              str += element['marker']+element['seriesName'] + ' '+element['value']+"%";
              if(str != params.length - 1){
                  str += '<br/>';
              }
          };
          return str;
        }
    },
    legend: {
        data:['CPU占用','内存占用','硬盘剩余']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : 
        {
            type : 'category',
            data : [],
            axisLabel:{
              fontSize:20,
            }
            
        }
    ,
    yAxis : [
        {
            type: 'value',  
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              },  
            show: true,
            splitArea: {show: false},
            max: 100,
            interval: 10,
        }
    ],
    series : [
      {
            name:'CPU占用',
            type:'bar',
            data:[],
            label: {
              normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{a} : {c}%' // 这里是数据展示的时候显示的数据
              }
            },
        },
        {
            name:'内存占用',
            type:'bar',
            data:[],
        },
        {
            name:'硬盘剩余',
            type:'bar',
            data:[]
        }
        
    ]
},
      datalist:{},
      mEcharts:null,
    }
  },
  mounted(){
    let data = {"code":"000000","message":"操作成功","data":{"total":3,"rows":[{"memoryData":{"memoryAvailable":2282266624,"memoryTotal":3974848512,"memoryUsed":1419563008},"diskData":{"diskUserPercent":13.796638373229117,"diskUsed":2961358848,"diskTotal":21464350720,"diskFree":18502991872},"cpuData":{"cpuFrequency":2499,"cpuLoadMessage":"空闲","cpuModelName":"Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz","cpuCoreCount":1,"cpuLoad1":0.01,"cpuPercent":1.4925373103208202,"cpuLoad15":0.05,"cpuLoad5":0.03},"hostData":"172.18.61.251"},{"memoryData":{"memoryAvailable":6058364928,"memoryTotal":8202706944,"memoryUsed":1829556224},"diskData":{"diskUserPercent":9.23286245994035,"diskUsed":9248497664,"diskTotal":105554829312,"diskFree":90920845312},"cpuData":{"cpuFrequency":2499,"cpuLoadMessage":"空闲","cpuModelName":"Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz","cpuCoreCount":1,"cpuLoad1":0.1,"cpuPercent":3.4825870621841224,"cpuLoad15":0.12,"cpuLoad5":0.09},"hostData":"172.18.61.242"},{"memoryData":{"memoryAvailable":1924493312,"memoryTotal":3974848512,"memoryUsed":1780592640},"diskData":{"diskUserPercent":14.366794394235466,"diskUsed":3083739136,"diskTotal":21464350720,"diskFree":18380611584},"cpuData":{"cpuFrequency":2500,"cpuLoadMessage":"持续繁忙","cpuModelName":"Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz","cpuCoreCount":1,"cpuLoad1":3.59,"cpuPercent":98.99999999906868,"cpuLoad15":2.54,"cpuLoad5":3.69},"hostData":"172.18.61.240"}]}};
    this.minioEcharts = this.$echarts.init(this.$refs['newUsers']);
    data.data.rows.forEach((row)=>{
      console.log(row)
      this.datalist[row.hostData] = {
        'name':row.hostData+'&nbsp;&nbsp;&nbsp;'+row.cpuData.cpuLoadMessage,
        '内存':'内存 剩余:'+(parseInt((row.memoryData.memoryUsed/row.memoryData.memoryTotal).toFixed(2)*100))+'%&nbsp;&nbsp;('+ this.byteConvert(row.memoryData.memoryUsed)+')',
        'CPU':'CPU 占用率:'+parseInt(row.cpuData.cpuPercent)+'% ',
        '硬盘':'硬盘 剩余'+ parseInt(row.diskData.diskUserPercent)+'%&nbsp;&nbsp;('+this.byteConvert(row.diskData.diskFree)+')'
      };
      this.init2options.xAxis.data.push(row.hostData+" "+row.cpuData.cpuLoadMessage+" "+parseInt(row.cpuData.cpuPercent)+'%')
      this.init2options.series[0].data.push(parseInt(row.cpuData.cpuPercent));
      this.init2options.series[1].data.push(parseInt((row.memoryData.memoryUsed/row.memoryData.memoryTotal).toFixed(2)*100)||this.byteConvert(row.memoryData.memoryUsed));
      this.init2options.series[2].data.push(parseInt((row.diskData.diskFree/row.diskData.diskTotal).toFixed(2)*100)||this.byteConvert(row.diskData.diskFree));
    });
    let minioOptions = this.handleOptions(data.data.rows);
    this.minioEcharts.setOption(minioOptions);

    this.mEcharts = this.$echarts.init(this.$refs['echarts']);
    console.log(this.init2options)
    let option = this.init2options;
  this.mEcharts.setOption(option);
  },
  methods:{
    // 处理echarts数据
    handleOptions(allData){
      let returnData = Object.assign({},this.initOptions);
      returnData.tooltip.formatter = this.mainFormatter;
      let xAxisDate = [];
      let seriesData = [{
        type:'line',
        name:'内存',
        data:[]
      },{
        type:'line',
        name:'CPU',
        data:[]
      },{
        type:'line',
        name:'硬盘',
        data:[]
      }];
      returnData.legend.data.push('内存');
      returnData.legend.data.push('CPU');
      returnData.legend.data.push('硬盘');
      for (let i = 0; i < allData.length; i++) {
          const list = allData[i];
          xAxisDate.push(list.hostData);
          seriesData[0].data.push((parseInt((list.memoryData.memoryUsed/list.memoryData.memoryTotal).toFixed(2)*100)));
          seriesData[1].data.push(list.cpuData.cpuPercent);
          seriesData[2].data.push(parseInt(list.diskData.diskUserPercent));
      }
      returnData.xAxis.data = xAxisDate;
      returnData.series = seriesData;
      return returnData;
    },
    // 鼠标移动到ECharts节点时显示内容
    mainFormatter: function(params){
      let time = params[0].name;
      let str = '';
      str += this.datalist[time]['name']+'<br/>';
      str += this.datalist[time]['内存']+'<br/>';
      str += this.datalist[time]['CPU']+'<br/>';
      str += this.datalist[time]['硬盘']+'<br/>';
      return str;
    },
    // 数据转为带单位字符串
    byteConvert(bytes) {
      if (isNaN(bytes)) {
          return '';
      }
      var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var exp = Math.floor(Math.log(bytes)/Math.log(2));
      if (exp < 1) {
          exp = 0;
      }
      var i = Math.floor(exp / 10);
      bytes = bytes / Math.pow(2, 10 * i);
  
      if (bytes.toString().length > bytes.toFixed(2).toString().length) {
          bytes = bytes.toFixed(2);
      }
      return bytes + '' + symbols[i];
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
.content{
  margin-left:220px;
  padding:20px;
}
</style>
