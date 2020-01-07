<template>
  <div style="background-color: #1B232F; min-height: 85vh; margin-top: 5px;">
    <h4>
      文件列表
      <i class="el-icon-refresh-right" style="float: right;padding-top:4px;cursor: pointer" @click="device_refresh"></i>
    </h4>
    <!--<el-divider></el-divider>-->
    <div class="div-date">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
        unlink-panels
        size="small"
        format="yyyy-MM-dd "
        value-format="yyyy-MM-dd"
        @change="date_change"
        style="margin-top: 5px">
      </el-date-picker>
      <el-select v-model="high_low"  placeholder="频率" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @change="hl_change">
        <!--可禁用、可清空、可搜索-->
        </el-option>
      </el-select>
    </div>
    <el-row style="margin-top: 10px" v-for="(item,index) in file_list" :key="index">
      <h4 style="float: left"><i class="el-icon-document"></i>{{item }}</h4>
      <h4 style="float: right; margin-right: 5px">下载</h4>
      <h4 style="float: right; margin-right: 5px; cursor: pointer" @click="data_switch(item)">查看</h4>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "file_list",
    props:{
      file_list: '',
    },
    data(){
      return{
        date: '',
        start_date: '',
        end_date: '',
        options: [{
          value: 'hf',
          label: '高频'
        }, {
          value: 'lf',
          label: '低频'
        }],
        high_low: 'lf'
      }
    },
    methods:{
      //刷新接口
      device_refresh(){
      },
      //高低频切换
      hl_change(){
        //发送高低频
        this.$emit('datatype_change', this.hige_low);
      },
      //日期切换
      date_change(){
        //发送起止日期
        console.log('起止日期');
        this.$emit('date_change', this.start_date, this.end_date);
      },
      //查看数据切换
      data_switch(filename){
        this.$emit('data_switch', filename);
      }
    },
    watch:{
      date: function (new_value) {
        this.start_date = new_value[0];
        this.end_date = new_value[1];
      }
    }
  }
</script>

<style scoped>
  h4 {
    padding: 0;
    margin: 0;
    margin-left: 5px;
    color: white;
    font-weight: lighter;
  }
  .el-divider {
    margin: 0;
  }
  .div-date{
    width: 100%;
    overflow: hidden;
  }
  .el-select--small {
    width: 25%;
    margin-right: 10px;
    margin-top: 5px;
    float: right;
  }

</style>