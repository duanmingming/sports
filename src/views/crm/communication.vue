<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>客户筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="客户名称">
          <el-select
            v-model="goodsQuery.name"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="(item, index) in userOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户联系电话">
          <el-input v-model="goodsQuery.tel" disabled />
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="goodsQuery.address" disabled />
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>客户列表</span>
        <el-button style="float: right;" type="primary" @click="handleMultipleDelete">批量删除</el-button>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>
    <Dialog :options="dialogOptions" @handleSubmit="handleSubmit"></Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getCustomerList as getList, addPrivateCommunication as add, editPrivateCommunication as edit, deleteCommunication as deleteData, searchName } from '@/api/crm'
import parameters from '@/utils/parameter'

export default {
  name: 'Communication',
  components: { Table, Dialog },
  data() {
    const checkTel = (rule, value, callback) => {
      if (value) {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
        const flag = reg.test(value)
        if (flag) {
          return callback()
        } else {
          return callback(new Error('请填写正确的手机号'))
        }
      } else {
        return callback()
      }
    }

    const checkNum = (rule, value, callback) => {
      if (value) {
        const reg = /\D/
        const flag = (value + '').match(reg)
        if (flag) {
          return callback(new Error('请只输入数字'))
        } else {
          return callback()
        }
      } else {
        return callback()
      }
    }

    return {
      goodsQuery: {
        name: '',
        tel: '',
        address: ''
      },

      historyQuery: {

      },

      options: {
        data: [],
        border: false,
        maxHeight: window.innerHeight * 0.63,
        style: 'width: 100%; marginLeft:10px',
        columnDataInfo: [
          {
            name: '编号',
            value: 'F0002',
            width: '15%'
          },
          {
            name: '姓名',
            value: 'F0003',
            width: '15%'
          }, {
            name: '生日',
            value: 'F0007',
            width: '10%'
          }, {
            name: '住址',
            value: 'F0015',
            width: '30%'
          }, {
            name: '联系人',
            value: 'F0017',
            width: '10%'
          },{
            name: '联系电话',
            value: 'F0018',
            width: '10%'
          }, {
            name: '建立日期',
            value: 'F0091',
            width: '10%'
          }, {
            name: '状态',
            value: 'F0094',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '编辑',
            style: ''
          },
          {
            name: '删除',
            style: 'color:red'
          },
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true,
        multipleSelect: []
      },

      dialogOptions: {
        title: "沟通记录",
        labelWidth: "130px",
        labelPosition: "left",
        show:false,
        data: null,
        settings: [
          {
            type: 'input',
            label: '客户名称',
            disabled: true,
            name:'F0003'
          },
          {
            type: 'dateTime',
            label: '开始时间',
            width: 12,
            name: 'F0007'
          },
          {
            type: 'dateTime',
            label: '结束时间',
            width: 12,
            name: 'F0008'
          },
          { 
              type: 'select',
              label: '沟通方式',
              name: 'F0006',
              options: parameters.PA0053
          },
          {
            type: 'text',
            label: '沟通内容',
            rows: 6,
            name: 'F0010'
          },
          {
            type: 'input',
            label: '结论',
            name: 'F0011'
          },
          { 
              type: 'select',
              label: '下次沟通方式',
              width: 12,
              name: 'F0013',
              options: parameters.PA0053
          },
          {
            type: 'dateTime',
            label: '下次沟通时间',
            width: 12,
            name: 'F0012'
          }
          
        ]
      },

      statusOptions: parameters.PA0030,

      form:{
        F0032: '',
        F0033: '',
        F0034:'',
        F0035:'',
        F0036:''
      },

      userOptions:[],
      loading: false
    }
  },

  created() {
    
    
  },

  computed:{
    userName() {
      return this.goodsQuery.name
    }
  },

  watch:{
    userName(newVal){
      let arr = this.userOptions
      let temp = null
      for(let item of arr){
        if(item.F0000 === newVal){
          temp = item
          break
        }
      }
      if(temp){
        this.goodsQuery.tel = temp.F0024
        this.goodsQuery.address = temp.F0015
        this.getListData()
      }
    }
  },

  mounted() {
    
  },

  methods: {
    handleQuery() {
      let { time, others, status} = this.goodsQuery
      this.historyQuery = 
      {
        time,others,status
      }
      this.getListData()
    },

    getListData() {
      let arr = this.userOptions
      let temp = null
      for(let item of arr){
        if(item.F0000 === this.goodsQuery.name){
          temp = item
          break
        }
      }
      const params = {
        cid: localStorage.getItem('cid'),
        pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
        name: temp.F0003
      }

      getList(params).then(res => {
        this.options.data = this.changeFormat(res.data.items)
        this.options.total = res.data.total
      })
    },

    handleAdd() {
      this.dialogOptions.title = "添加沟通记录"
      this.dialogOptions.show = !this.dialogOptions.show
    },

    handleTable(data) {
      if (data.type === 'getTable') {
        this.getListData()
      } else if (data.type === 'pageSizeChange') {
        this.options.pageSize = data.pageSize
      } else if (data.type === 'pageNumChange') {
        this.options.pageNum = data.pageNum
      } else if (data.type === 'multipleSelect') {
        this.options.multipleSelect = data.data
      } else if (data.type === '编辑') {
        this.dialogOptions.title = "编辑记录"
        this.dialogOptions.data = data.data
        this.dialogOptions.show = !this.dialogOptions.show
      } else if (data.type === '删除') {
        this.$confirm('此操作将永久删除该客户沟通记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteData(data.data.F0000).then(res => {
             this.getListData()
             this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      }
    },

    handleSubmit(data, callback) {
      data.F0001 = localStorage.getItem('cid')
      if(this.dialogOptions.title === "编辑记录"){
        edit(data).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }
    },

    handleMultipleDelete() {
      console.log(this.options.multipleSelect, 'OOOKJJHG');
    },

    
    changeFormat(data) {
      let obj = parameters.PA0011
      for(let item of data){
        item.F0094 = obj[item.F0094]
      }
      return data
    },

    reverseChangeFormat(data) {
      if(data.F0094){
        let obj = parameters.PA0048
        data.F0094 = obj[data.F0094]
      }
      return data
    },

    remoteMethod(query) {
      console.log(query);
        if (query !== '') {
          this.loading = true;
          let params ={
            cid: localStorage.getItem('cid'),
            name: query
          }
          searchName(params).then(res => {
            this.loading = false;
            let arr = res.data
            for(let item of arr){
              item.label = item.F0003
              item.value = item.F0000
            }
            this.userOptions = arr
          })
        } else {
          this.options = [];
        }
      }


  }
}
</script>

<style>
  .container{
    height: calc(100vh - 84px)
  }

  .boxHeader{
    width: 96%;
    margin: 10px auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .goodsSelect {
    height: 160px;
    border: 1px dashed #d9d9d9;
    overflow: scroll;
  }

</style>