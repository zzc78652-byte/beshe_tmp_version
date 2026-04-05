<!-- <template>
  <div class="home">
    <el-card shadow="hover">
      <div class="header">
        <div class="page-header">
          <el-page-header @back="goBack" content="主页">
          </el-page-header>
        </div>
      </div>
    </el-card>

    <div style="margin: 20px 0; text-align: center;">
      <span style="font-size: 28px; color: #f6692b; font-weight: bold;">
        欢迎使用健身房后台管理系统！
      </span>
    </div>

    <el-card shadow="hover" style="margin-top: 20px;">
      <div id="myChart" style="width: 100%; height: 500px;"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      Keyword: '',
      chartData: {
        xData: [], 
        yData: []  
      }
    }
  },
  mounted() {
    this.fetchDynamicData();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    
    fetchDynamicData() {
      // 请求后端接口获取最近7天的新增会员数据
      this.$axios.get('/getMemberStats').then(res => {
        if (res.data && res.data.days) {
          this.chartData.xData = res.data.days;
          this.chartData.yData = res.data.counts;
          this.drawLine(); 
        }
      }).catch(err => {
        console.error("获取统计数据失败", err);
      });
    },

    drawLine() {
      const chartDom = document.getElementById('myChart');
      if (!chartDom) return;
      
      const myChart = this.$echarts.init(chartDom);
      
      const option = {
        title: { 
          text: '近七天新增会员统计', 
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.chartData.xData
        },
        yAxis: {
          type: 'value',
          name: '新增人数',
          minInterval: 1 // 保证Y轴只能是整数
        },
        series: [{
          name: '办卡人数',
          type: 'bar',
          data: this.chartData.yData,
          itemStyle: {
            color: '#00c996', 
            borderRadius: [4, 4, 0, 0] 
          },
          barWidth: '40%'
        }]
      };
      
      myChart.setOption(option);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.drawLine);
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.page-header {
  width: 20%;
}
.buttons {
  margin: 0px 0 10px 0;
}
.search {
  margin-right: 10px;
  width: 50%;
  float: left;
}
.search-input input{
  width: 110px;
}
</style> -->
<template>
  <div class="home-container">
    
    <el-card class="welcome-card" shadow="never">
      <div class="welcome-content">
        <div class="welcome-text">
          <h2 class="greeting">欢迎回来，管理员 👋</h2>
          <p class="subtitle">在这里随时掌控健身房的会员增长动态，让数据驱动您的运营决策。</p>
        </div>
        
        <div class="data-badge">
          <div class="data-icon">
            <i class="el-icon-user-solid"></i>
          </div>
          <div class="data-info">
            <div class="data-label">平台总会员人数</div>
            <div class="data-value">{{ totalMember }} <span class="unit">人</span></div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="chart-card" shadow="hover">
      <div id="myChart" style="width: 100%; height: 500px;"></div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      totalMember: 0, // 真实总会员数
      chartData: {
        xData: [], 
        yData: []  
      }
    }
  },
  mounted() {
    this.fetchTotalMember(); // 获取总会员数
    this.fetchDynamicData(); // 获取七天注册图表数据
  },
  methods: {
    // 获取总会员数
    fetchTotalMember() {
      this.$axios.get('/totalMember').then(res => {
        if(res.data && res.data.dataTotal !== undefined) {
           this.totalMember = res.data.dataTotal;
        }
      });
    },

    // 获取近七天新增会员数据
    fetchDynamicData() {
      this.$axios.get('/getMemberStats').then(res => {
        if (res.data && res.data.days) {
          this.chartData.xData = res.data.days;
          this.chartData.yData = res.data.counts;
          this.drawLine(); 
        }
      }).catch(err => {
        console.error("获取统计数据失败", err);
      });
    },

    drawLine() {
      const chartDom = document.getElementById('myChart');
      if (!chartDom) return;
      
      const myChart = this.$echarts.init(chartDom);
      
      const option = {
        title: { 
          text: '会员增长趋势 (近七天)', 
          left: '20px',
          top: '20px',
          textStyle: { color: '#303133', fontSize: 18, fontWeight: 'bold' }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;',
          padding: [10, 15],
          textStyle: { color: '#606266' }
        },
        grid: {
          left: '3%', right: '4%', bottom: '5%', top: '80px', containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, 
          data: this.chartData.xData,
          axisLine: { lineStyle: { color: '#E4E7ED' } },
          axisLabel: { color: '#909399', margin: 15 }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          splitLine: { 
            lineStyle: { color: '#EBEEF5', type: 'dashed' } 
          }, 
          axisLabel: { color: '#909399' }
        },
        series: [{
          name: '新增会员',
          type: 'line',       
          smooth: true,       // 开启平滑曲线
          data: this.chartData.yData,
          symbol: 'circle',   
          symbolSize: 8,      
          showSymbol: false,  
          itemStyle: {
            color: '#00c996',
            borderColor: '#fff',
            borderWidth: 2
          },
          lineStyle: {
            width: 4,
            color: '#00c996',
            shadowColor: 'rgba(0, 201, 150, 0.3)', 
            shadowBlur: 10,
            shadowOffsetY: 5
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 201, 150, 0.4)' }, 
              { offset: 1, color: 'rgba(0, 201, 150, 0.02)' } 
            ])
          }
        }]
      };
      
      myChart.setOption(option);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.drawLine);
  }
}
</script>

<style scoped>
.home-container {
  padding: 10px;
}

/* 顶部欢迎卡片样式 */
.welcome-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fdfb 100%);
  border: 1px solid #e3f2ed;
  border-radius: 12px;
  margin-bottom: 25px;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.welcome-text .greeting {
  font-size: 26px;
  color: #303133;
  margin: 0 0 12px 0;
  font-weight: bold;
}

.welcome-text .subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* 核心数据徽章样式 */
.data-badge {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #00c996 0%, #0abf91 100%);
  padding: 20px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 201, 150, 0.25);
  color: white;
  transition: transform 0.3s ease;
}

.data-badge:hover {
  transform: translateY(-5px); /* 鼠标悬浮时有上浮的动态效果 */
}

.data-icon {
  font-size: 40px;
  margin-right: 25px;
  background: rgba(255, 255, 255, 0.2);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-label {
  font-size: 15px;
  opacity: 0.9;
  margin-bottom: 5px;
}

.data-value {
  font-size: 40px;
  font-weight: bold;
  line-height: 1;
}

.unit {
  font-size: 16px;
  font-weight: normal;
  opacity: 0.9;
  margin-left: 5px;
}

/* 图表卡片样式 */
.chart-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
  padding: 10px;
}
</style>