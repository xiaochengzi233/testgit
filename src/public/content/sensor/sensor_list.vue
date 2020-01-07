<template>
  <div>
    <!--search bar-->
    <el-card shadow="hover" style="padding: 0">
      <el-row  type="flex" justify="center" :gutter="20">
        <!--选择搜索条件-->
        <el-col :span="3.5" style="text-align: right;">
          <el-select
            style="" v-model="search_condition"
            @change="onConditionChange"
            placeholder="请选择搜索条件">
            <el-option
              v-for="item in search_conditions"
              :key="item.id"
              :label="item.label"
              :value="item.condition">
            </el-option>
          </el-select>
        </el-col>
        <!--输入搜索关键字-->
        <el-col :span="3.5" style="align-items: center">
          <el-select
            style="" v-model="search_input"
            placeholder="请键入搜索关键字" filterable>
            <el-option
              v-for="item in searchList"
              :key="item.id"
              :label="item.index"
              :value="item.index"
              clearable>
            </el-option>
          </el-select>
        </el-col>
        <!--search button-->
        <el-col :span="3">
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            @click="onSearchClick">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--main table-->
    <el-card shadow="hover">
      <!--添加传感器的按钮-->
      <el-row>
        <el-col :span="24" style="text-align: right;padding-right: 7%">
          <el-button type="warning" plain icon="el-icon-s-custom" @click="add_sensor">添加传感器</el-button>
        </el-col>
      </el-row>
      <!--表格显示主体-->
      <el-table
        ref="multipleTable"
        :data="tableData.slice((current_page - 1) * page_size, current_page * page_size)"
        height="71.5vh"
        tooltip-effect="dark"
        style="width: 100%"
        @filter-change="total_rows=this.data.length">
        <el-table-column
          prop="id"
          label="序号"
          min-width="10%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="base_url+image"
          label="缩略图"
          min-width="10%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sensor_id"
          label="传感器显示编号"
          min-width="12%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂商"
          min-width="12%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sensor_status"
          label="状态"
          min-width="10%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="enterprise_id"
          label="企业编号"
          min-width="12%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="device_id"
          label="设备编号"
          min-width="10%"
          align="center">
        </el-table-column>
        <el-table-column
          min-width="15%"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetails(scope.$index, scope.row.sensor_id)"
              :disabled="scope.row.sensor_status=='off'"
            >详情
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="clickDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--翻页-->
      <el-pagination
        :page-sizes="[5,10,15,20]"
        :page-size="page_size"
        :pager-count="11"
        layout="total,sizes,prev, pager, next,jumper"
        :total="tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        style="text-align: center;margin-top:20px">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {request} from "network/request";

  export default {
    name: "user_list_test",
    data() {
      return {
        //用对象列表定义搜索条件
        search_conditions: [
          {
            id: 1, label: '按传感器显示编号搜索', condition: 'sensor_id'
          }, {
            id: 2, label: '按生产厂商搜索', condition: 'manufacturer'
          }
        ],
        base_url: "http://117.78.37.249:8001/",
        //搜索条件
        search_condition: '',
        search_input: '',
        sensors: [],   //接收后端返回的sensor_list初始数据
        searchList: [],   //搜索条件确定后的搜索下拉选单
        search: '',    //点击按钮给列表传入过滤变量
        page_size: 10,   //一页显示行数
        current_page: 1,   //当前页码
        total_rows: 0,   //搜索条目总数，默认为sensors的长度
        tableData: [],   //处理后的表格数据
      }
    },
    methods: {
      //获取sensor_list数据
      get_sensorlist() {
        request({
          url: "sensor/index/",
          method: "post",
        })
          .then(res => {
            console.log(res,1111);
            this.sensors = res.data.sensor_list;   //保留所有sensor_list的初始值
            this.tableData = res.data.sensor_list;   //tableData初始化
          }).catch(err => {
          console.log(err);
        });
        console.log(this.sensors);
      },
      //切换搜索条件时清空search_input和searchList并给searchList赋值
      onConditionChange(value) {
        this.search_input = '';
        this.searchList = [];
        let sList = [];
        if (this.search_condition == 'manufacturer') {
          sList = this.sensors.map(obj => {
            return obj.manufacturer
          });
        } else {
          sList = this.sensors.map(obj => {
            return obj.sensor_id
          });
        }
        //生产厂商搜索列表的数组去重
        sList.sort();
        for (let i = 0; i < sList.length; i++) {
          if (sList[i] === sList[i + 1]) {
            sList.splice(i, 1);
            i--;
          }
        }
        // 创建值为对象的搜索关键字的下拉列表
        for (let i = 0; i < sList.length; i++) {
          this.searchList[i] = {id: i, index: sList[i]};
        }
      },
      //搜索功能
      onSearchClick() {
        this.search = this.search_input;
        console.log(this.search);
        this.tableData = this.sensors.filter(
          data => !this.search
            || data.sensor_id.toLowerCase().includes(this.search.toLowerCase())
            || data.manufacturer.toLowerCase().includes(this.search.toLowerCase()));
        // console.log(this.tableData);
      },
      // 传感器详情
      handleDetails(index, id) {
        console.log(index,id);
        sessionStorage.setItem('sensorDetail',id); // 存入值
        this.$router.replace('sensor_detail');
      },
      // 点击页面号码改变显示页面
      handleCurrentChange(cPage) {
        this.current_page = cPage;
      },
      // 改变一页的条数
      handleSizeChange(pSize) {
        this.page_size = pSize;
      },
      //点击删除按钮
      clickDelete(row) {
        console.log(row.sensor_id);
        this.$prompt('验证密码', '请输入验证密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let formdata = new FormData();
          formdata.append('sensor_id ', row.sensor_id);
          formdata.append('control_password', value);
          request({
            url: 'sensor/delsensor/',
            method: 'post',
            data: formdata,
          }).then(res =>{
            if(res.data.message == 'delete success')
            {
              this.$alert('删除成功', '提示', {
                confirmButtonText: '确定',
              });
              this.get_sensorlist();
            }
            else
            {
              this.$alert('密码输入错误', '提示', {
                confirmButtonText: '确定',
              });
            }
          }).catch(err =>{
            this.$alert('请检查网络设置', '提示', {
              confirmButtonText: '确定',
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      },
      //添加sensor
      add_sensor(){
        this.$router.replace('sensor_add');
      },
      // change_tableData() {
      //
      // }
    },
    created() {
      this.get_sensorlist();
    },
    // 钩子函数处理后端接收到的sensors
    mounted: function () {
      // this.tableData = this.sensors.filter(
      //   data => !this.search
      //     || data.sensor_id.toLowerCase().includes(this.search.toLowerCase())
      //     || data.manufacturer.toLowerCase().includes(this.search.toLowerCase()));
      // // console.log(this.tableData);
    },
  }

</script>

<style scoped>
  .bg-black {
    background-color: #181f29;
  }

  .bg-dark {
    background-color: #000000;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 600px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }

  .not-allowed{
    cursor: not-allowed;
  }

  /*去掉滚动条*/
  .el-table__body-wrapper::-webkit-scrollbar{
    /*width: 0;宽度为0隐藏*/
    width: 0;
  }
  .el-table__body-wrapper::-webkit-scrollbar-thumb{
    border-radius: 2px;
    height: 50px;
    background: #eee;
  }
  .el-table__body-wrapper::-webkit-scrollbar-track{
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background: rgba(0,0,0,0.4);
  }
</style>
