<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>商品筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="上架状态">
          <el-select v-model="goodsQuery.status" placeholder="">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="goodsQuery.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="goodsQuery.others" placeholder="请输入商品名称或其他关键词" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>普通商品列表</span>
        <el-button v-if="!dialogOptions.check" style="float: right;" type="primary" @click="handleMultipleDelete">批量删除</el-button>
        <el-button v-if="!dialogOptions.check" style="float: right;marginRight:10px;" type="primary" @click="handleAdd">添加商品</el-button>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>
    <Dialog :options="dialogOptions" @handleSubmit="handleSubmit" />
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { addGeneralClass as addClass, getGeneralClass as getClass, editGeneralClass as editClass, deleteGeneralClass as deleteClass, checkClass } from '@/api/commodity'
import parameters from '@/utils/parameter'

export default {
  name: 'General',
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
        status: '',
        time: '',
        others: ''
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
            value: 'F0000',
            width: '15%'
          },
          {
            name: '名称',
            value: 'F0003',
            width: '15%'
          }, {
            name: '状态',
            value: 'F0094',
            width: '10%'
          }, {
            name: '颜色',
            value: 'F0005',
            width: '30%'
          }, {
            name: '价格',
            value: 'F0013',
            width: '10%'
          }, {
            name: '尺码',
            value: 'F0006',
            width: '10%'
          }, {
            name: '上传人',
            value: 'F0090',
            width: '10%'
          }, {
            name: '上传时间',
            value: 'F0091',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '编辑',
            style: ''
          },
          {
            name: '上/下架',
            style: ''
          },
          {
            name: '删除',
            style: 'color:red'
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true,
        multipleSelect: []
      },

      dialogOptions: {
        title: "添加课程",
        labelWidth: "130px",
        labelPosition: "left",
        check: false,
        show:false,
        data: null,
        settings: [
          {
            type: 'input',
            label: '商品名称',
            rules: [
                { required: true, message: '请输入名称', trigger: 'blur'},
                { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ],
            name:'F0003'
          },
          {
            type: 'input',
            label: '颜色',
            name:'F0005'
          },
          {
            type: 'input',
            label: '尺码',
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name:'F0006'
          },
          {
            type: 'img',
            label:'商品图片',
            name:'F0015'
          },
          {
            type: 'input',
            label: '重量',
            name: 'F0007'
          },
          {
            type: 'input',
            label: '商品单价',
            rules: [{ validator: checkNum, trigger: 'blur' },  { required: true, message: '请商品单价', trigger: 'blur'}],
            name: 'F0013'
          },
          {
            type: 'input',
            label: '优惠价格',
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0019'
          },
          {
            type: 'text',
            label: '商品简介',
            name: 'F0014',
            roew:3
          },
          {
            type: 'text',
            label: '制造商',
            name: 'F0011'
          }
        ]
      },

      statusOptions: parameters.PA0049
    }
  },

  created() {
    let role = parseInt(localStorage.getItem('role'))
    if(role === 1){
      for(let item of this.dialogOptions.settings){
        item.disabled = true
      }

      this.dialogOptions.check = true

      this.options.columnOpreationInfo = [
        {
          name: '审核',
          style: ''
        }
      ]

    }
    
  },

  mounted() {
    this.getListData()
  },

  methods: {
    handleQuery() {
      let {status, time, others} = this.goodsQuery
      this.historyQuery = 
      {
        status,time,others
      }
      this.getListData()
    },

    getListData() {
      const params = {
        cid: localStorage.getItem('cid'),
        pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
        name: this.historyQuery.hasOwnProperty('others') ? this.historyQuery.others : "",
        time:  this.historyQuery.hasOwnProperty('time') ? this.historyQuery.time : null,
        status:  this.historyQuery.hasOwnProperty('status') ? this.historyQuery.status : null,
      }

      getClass(params).then(res => {
        this.options.data = this.changeFormat(res.data.items)
        this.options.total = res.data.total
      })
    },

    handleAdd() {
      this.dialogOptions.data = null
      this.dialogOptions.title = "添加课程"
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
      }  else if (data.type === '审核') {
        this.dialogOptions.title = "审核课程"
        this.dialogOptions.data = data.data
        this.dialogOptions.show = !this.dialogOptions.show
      } else if (data.type === '编辑') {
        this.dialogOptions.title = "编辑课程"
        this.dialogOptions.data = data.data
        this.dialogOptions.show = !this.dialogOptions.show
      } else if (data.type === '删除') {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteClass(data.data.F0000).then(res => {
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
       
      } else if (data.type === '上/下架') {
        if(data.data.F0094 === '已上架'){
          data.data.F0094 = '下架'
        }else{
          data.data.F0094 = '上架审核中'
        }

        editClass(this.reverseChangeFormat(data.data)).then(res => {
          this.getListData()
        })
      } 
    },

    handleSubmit(data, callback) {
      data.F0001 = localStorage.getItem('cid')
      if(this.dialogOptions.title === "添加课程"){
        addClass(this.reverseChangeFormat(data)).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }else if(this.dialogOptions.title === "审核课程"){
        console.log(data, 'PPPPPP');
        let params = {
          cid: localStorage.getItem('cid'),
          type: 140,
          F0000: data.F0000,
          F0094: data.checkStatus,
          F0095: data.checkNote,
          F0001: 1
        }
        checkClass(params).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }else{
        editClass(this.reverseChangeFormat(data)).then(res => {
          callback({success:true})
          this.dialogOptions.title = "添加课程"
          this.getListData()
        }).catch(err => {
          callback({success:false})
          this.dialogOptions.title = "添加课程"
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
