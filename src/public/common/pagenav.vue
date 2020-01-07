<!--分页导航组件-->
<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "pagenav",
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$emit('page_change',this.currentPage);
      }
    },
    props:{
      total:{
        type: Number,
        default: 0
      },
      pageSize:{
        type: Number,
        default: 6
      },
      page:{
        type: Number,
        default: 1
      },
    },
    data() {
      return {
        currentPage: this.page
      }
    },
    created(){
      console.log('pagenav 初始化:' + this.page);
    }
  }
</script>

<style scoped>

</style>