<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>课程筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="goodsQuery.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="goodsQuery.others" placeholder="请输入商品名称或其他关键词" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>课程列表</span>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getScheduleList } from '@/api/class'
import parameters from '@/utils/parameter'

export default {
  name: 'General',
  components: { Table, Dialog },
  data() {
    const checkEmail = (rule, value, callback) => {
      if (value) {
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        const flag = reg.test(value)
        if (flag) {
          return callback()
        } else {
          return callback(new Error('请填写正确的邮箱格式'))
        }
      } else {
        return callback()
      }
    }

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

    return {
      options: {
        data: [],
        border: false,
        maxHeight: window.innerHeight * 0.63,
        style: 'width: 100%; marginLeft:10px',
        columnDataInfo: [
          {
            name: '班名编号',
            value: 'F0002',
            width: '15%'
          },
          {
            name: '班名',
            value: 'F0003',
            width: '15%'
          }, {
            name: '状态',
            value: 'F0094',
            width: '10%'
          }, {
            name: '教练',
            value: 'F0004s',
            width: '30%'
          }, {
            name: '开始日期',
            value: 'F0006',
            width: '10%'
          }, {
            name: '结束日期',
            value: 'F0007',
            width: '10%'
          }, {
            name: '学员',
            value: 'F0005s',
            width: '10%'
          }, {
            name: '上课频次',
            value: 'F0015',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '签到',
            style: ''
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true
      },
      goodsQuery: {
        status: '',
        time: '',
        others: ''
      },
      historyQuery: {
        status: '',
        time: '',
        others: ''
      },
      title: '添加校区',
      dialogVisible: false,
      createForm: {
        name: null,
        color: null,
        size: null,
        img: null,
        weight: null,
        unitPrice: null,
        discountedPrice: null,
        introduction: null,
        maker: null,
        status: null
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        unitPrice: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入商品简介', trigger: 'blur' }
        ]
      },

      editFlag: false,

      imageUrl: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },

  mounted() {
    this.getListData()
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    },

    getListData() {
      let params = {
        cid: localStorage.getItem('cid'),
         pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
        name: this.historyQuery.hasOwnProperty('others') ? this.historyQuery.others : "",
        time:  this.historyQuery.hasOwnProperty('time') ? this.historyQuery.time : null,
        status:  this.historyQuery.status
      }
      getScheduleList(params).then(res => {
        for(let item of res.data.items){
          console.log(item);
          item.F0004 = JSON.parse(item.F0004)
          item.F0005 = JSON.parse(item.F0005)
          item.F0004s = this.changeStrArr(item.F0004s)
          item.F0005s = this.changeStrArr(item.F0005s)
        }
        
        this.options.data = res.data.items

        this.options.total = res.data.total
      })
    },

    changeStrArr(str) {
      let obj = JSON.parse(str), result = ''
      for(let key in obj){
        result = result + obj[key] + ','
      }
      return result
    },

    handleSubmit() {

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
      } else if (data.type === '签到') {
        this.$router.push({path:'/curriculum/sign', query: data.data})
      } 
    },

    handleAdd() {
      this.$router.push({path:'/curriculum/add'})
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
