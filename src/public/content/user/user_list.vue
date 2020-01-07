<template>
  <div>
    <!--topcard-->
    <el-card shadow="hover">
      <el-row>
        <el-col :span="11" style="text-align: right ;margin-right: 2%" ><h4>请选择要查询的公司</h4></el-col>
        <!--select-->
        <el-col :span="8" style="margin-left: 2% ;margin-top: 0.8%">
          <template>
            <el-select v-model="enterprise_id" placeholder="请选择公司" @change="onEnterpriseChange">
              <el-option
                v-for="item in enterprise_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-col>
      </el-row>
    </el-card>
    <!--usertablecard-->
    <div class="el-card" style="margin-top: 5px" >
      <el-row class="user-list-second-top">
        <!-- <div style="margin-top: 0.65%"> -->
        <el-col>
          <!-- <el-popconfirm title="确定删除所选吗？ 删除后将不能恢复" confirm-button-text="确认删除">
            <el-button class="user-list-second-top-remove" slot="reference" type="text">批量删除</el-button>
          </el-popconfirm> -->
          <el-button class="user-list-second-top-remove" type="warning" plain icon="el-icon-s-custom" @click="add_user">添加用户</el-button>


        </el-col>
        <!--                    <el-col :span="1">-->
        <!--                        <el-popconfirm title="确定删除所选条目吗？">-->
        <!--                            <el-button slot="reference" type="text">批量删除</el-button>-->
        <!--                        </el-popconfirm>-->
        <!--                    </el-col>-->

        <!-- </div> -->
      </el-row>
      <!--maintable-->
      <div style="margin-left: 2%;margin-right: 2%">
        <div style="border:1px solid#000">
          <el-table
            height="65vh"
            ref="multipleTable"
            :data="tableData.filter(
                                data => !search
                                || data.enterprise_name.toLowerCase().includes(search.toLowerCase())
                                || data.username.toLowerCase().includes(search.toLowerCase())
                                || data.first_last_name.toLowerCase().includes(search.toLowerCase())
                                || data.department.toLowerCase().includes(search.toLowerCase()))"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              type="index"
              label="编号"
              min-width="15%">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              sortable
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="first_last_name"
              label="姓名"
              sortable
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="enterprise_name"
              label="公司"
              sortable
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="enterprise_id"
              label="公司ID"
              sortable
              min-width="16%">
            </el-table-column>
            <el-table-column
              prop="department"
              label="部门"
              sortable
              min-width="16%">
            </el-table-column>
            <el-table-column
              prop="employee_id"
              label="工号"
              sortable
              min-width="16%">
            </el-table-column>
            <el-table-column
              prop="authority_level"
              label="权限等级"
              sortable
              min-width="50%">
            </el-table-column>
            <el-table-column
              align="center"
              width="300">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="关键字检索: 用户名/姓名/公司名/部门"/>
              </template>
              <template slot-scope="scope" >
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">权限修改</el-button>
                <el-popconfirm title="确定删除所选吗？ 删除后将不能恢复" confirm-button-text="确认删除">
                  <el-button
                    style="margin-left:10px;"
                    slot="reference"
                    size="mini"
                    type="danger"
                    plain
                    @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <el-popconfirm title="确定删除所选吗？ 删除后将不能恢复" confirm-button-text="确认删除">
              <el-button class="user-list-second-top-remove" slot="reference" type="text">批量删除</el-button>
            </el-popconfirm> -->
      </div>
    </div>
  </div>
</template>
<script>
  import {request} from "network/request";

  export default {
    name: "user_list",
    data() {
      return {
        enterprise_options: [{label: '显示所有企业',  value: ''}],
        enterprise_list: [],
        enterprise_id: '',
        tableData: [],
        search: '',
        multipleSelection: []
      }
    },
    methods: {
      onEnterpriseChange(){
        let fd = new FormData();
        fd.append('enterprise_id', this.enterprise_id);
        request({
          url: 'user/manage/list/',
          method: 'post',
          data: fd
        }).then(response => {
          this.tableData = []
          this.user_list = response.data.user_list;
          let ul;
          for (ul of this.user_list){
            let authority_level_name = ''
            if (ul.authority_level == 3){
              authority_level_name = '普通用户'
            }
            if (ul.authority_level == 2){
              authority_level_name = '管理员'
            }
            if (ul.authority_level == 1){
              authority_level_name = '超级管理员'
            }
            this.tableData.push(
              {
                username: ul.full_username,
                first_last_name: ul.last_name + ' ' + ul.first_name,
                enterprise_name: ul.enterprise_name,
                enterprise_id: ul.enterprise_id,
                department: ul.department,
                employee_id: ul.employee_id,
                authority_level: authority_level_name
              }
            )
          }
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(index, row){
        let fd = new FormData();
        fd.append('full_username', row.username);
        request({
          url:'user/manage/delete/',
          method: 'post',
          data: fd,
        }).then(response => {
          console.log(response);
          if ( response.data.message == 'NotAuthorizedToDeleteThisUser'){
            this.$notify({
              title: '错误',
              message: '您没有权限删除此用户',
              type: 'error'
            });
          }
          this.onEnterpriseChange()
        })
      },
      add_user(){
        this.$router.replace('/homepage/user_add');
      }
    },
    created() {
      this.onEnterpriseChange();
      request({
        url: 'user/manage/get_enterprise/',
        method: 'post',
      }).then(response => {
        this.enterprise_list = response.data.enterprise_list;
        console.log(this.enterprise_list)
        this.enterprise_options = [{label: '显示所有企业',  value: ''}];
        for (let enterprise of this.enterprise_list){
          this.enterprise_options.push(
            {
              label: enterprise.enterprise_name + '  ID:' +  enterprise.enterprise_id,
              value: enterprise.enterprise_id
            }
          )
        }
      });

    }

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

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .user-list-second-top{
    margin-left: 2%;
    margin-top:1%;
    margin-bottom:1%;
    margin-right: 2%;
  }
  .user-list-second-top-remove{
    float: right;
  }
</style>