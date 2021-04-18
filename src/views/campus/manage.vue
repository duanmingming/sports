<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>校区筛选</span>
      </div>

      <el-form :inline="true" :model="formInline">
        <el-form-item label="校区地址">
          <!-- <el-select v-model="formInline.region" placeholder="校区地址">
            <el-option label="未付款" value="shanghai"></el-option>
            <el-option label="已付款" value="beijing"></el-option>
            <el-option label="已排课" value="shanghai1"></el-option>
            <el-option label="已结课" value="shanghai2"></el-option>
            <el-option label="已转课" value="shanghai3"></el-option>
          </el-select> -->
          <el-cascader
            v-model="value"
            :options="goodsTree"
          />
        </el-form-item>
        <el-form-item label="建立时间">
          <el-date-picker
            v-model="formInline.user"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>校区列表</span>
        <el-button style="float: right;" type="primary">批量导出</el-button>
        <el-button style="float: right;marginRight:10px;" type="primary" @click="handleAdd">添加校区</el-button>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >

      <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px">
        <el-form-item label="校区名称：" prop="F0002">
          <el-input v-model="createForm.F0002" placeholder="校区名称" />
        </el-form-item>
        <el-form-item label="校区封面：" prop="F0033">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="beforeAvatarUpload"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="可运营商品：" prop="F0013">
          <div class="goodsSelect">
            <el-tree
              :data="goodsTree"
              show-checkbox
              node-key="id"
              :props="defaultProps"
            />
          </div>
        </el-form-item>
        <el-form-item label="合作方式：" prop="cooperationMethod">
          <el-radio v-model="createForm.cooperationMethod" label="1">官方自营</el-radio>
          <el-radio v-model="createForm.cooperationMethod" label="2">区域授权</el-radio>
          <el-radio v-model="createForm.cooperationMethod" label="3">合作伙伴</el-radio>
        </el-form-item>

        <el-form-item label="校区地址：" prop="F0024">
          <el-input v-model="createForm.F0024" placeholder="校区地址" />
        </el-form-item>

        <el-form-item label="校区介绍：" prop="introduction">
          <el-input v-model="createForm.introduction" type="textarea" :rows="3" placeholder="校区介绍" />
        </el-form-item>

        <el-form-item label="负责人：" prop="F0011">
          <el-input v-model="createForm.F0011" placeholder="负责人" />
        </el-form-item>

        <el-form-item label="联系电话：" prop="F0008">
          <el-input v-model="createForm.F0008" placeholder="联系电话" />
        </el-form-item>

        <el-form-item label="校区状态：" prop="F0094">
          <el-switch
            v-model="createForm.F0094"
            style="display: block;marginTop: 6px;"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="正常营业"
            inactive-text="停止营业"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import { getCampusList, login, getUserInfo } from '@/api/campus'

export default {
  name: 'Management',
  components: { Table },
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
            name: '编号',
            value: 'F0000',
            width: '15%'
          },
          {
            name: '名称',
            value: 'F0002',
            width: '15%'
          }, {
            name: '营业状态',
            value: 'F0094',
            width: '10%'
          }, {
            name: '地址',
            value: 'F0024',
            width: '30%'
          }, {
            name: '联系人',
            value: 'F0007',
            width: '10%'
          }, {
            name: '建立日期',
            value: 'F0091',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '查看',
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
        multiple: true
      },
      formInline: {
        user: '',
        region: ''
      },
      title: '添加校区',
      dialogVisible: false,
      createForm: {
        userName: null,
        showName: null,
        organization: null,
        email: null,
        tel: null,
        expireTime: null,
        remark: null,
        id: null,
        jobNo: null
      },
      rules: {
        campusName: [
          { required: true, message: '请输入校区名称', trigger: 'blur' }
        ],
        showName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 50, message: '长度至少2位至多50位', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        tel: [
          { validator: checkTel, trigger: 'blur' }
        ],
        remark: [
          { max: 200, message: '长度至多200位', trigger: 'blur' }
        ],
        jobNo: [
          { max: 50, message: '长度至多50位', trigger: 'blur' }
        ]
      },

      editFlag: false,

      imageUrl: '',

      goodsTree: [
        {
          label: '上海校区',
          value: 10000,
          children: [
            {
              label: '静安校区',
              value: 10001,
              children: [
                {
                  label: '静安训练中心',
                  value: 10002
                }
              ]
            },
            {
              label: '闵行校区',
              value: 10003,
              children: [{
                label: '闵行训练中心',
                value: 10004
              }]
            }
          ]
        },
        {
          label: '北京校区',
          value: 10005,
          children: [{
            label: '北京嘉里中心',
            value: 10006
          }
          ]
        },
        {
          label: '贵州省校区',
          value: 10007,
          children: [{
            label: '贵阳市校区',
            value: 10008,
            children: [
              {
                label: '贵州训练中心',
                value: 10009
              }
            ]
          }]
        },
        {
          label: '香港校区',
          value: 10010,
          children: [{
            label: '香港训练中心',
            value: 10011
          }]
        },
        {
          label: '测试校区（省)',
          value: 90000,
          children: [
            {
              label: '测试省属培训中心1',
              value: 90001
            },
            {
              label: '测试校区（市）',
              value: 90002,
              children: [
                {
                  label: '测试市属培训中心1',
                  value: 90003
                },
                {
                  label: '测试校区1（县)',
                  value: 90004,
                  children: [
                    {
                      label: '测试培训中心11',
                      value: 90005
                    },
                    {
                      label: '测试培训中心12',
                      value: 90006
                    }
                  ]
                },
                {
                  label: '测试校区2（县)',
                  value: 90007,
                  children: [{
                    label: '测试培训中心21',
                    value: 90008
                  },
                  {
                    label: '测试培训中心22',
                    value: 90009
                  }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '测试总部直营校区',
          value: 90010,
          children: [
            {
              label: '测试直营校区1',
              value: 90011
            },
            {
              label: '测试直营校区2',
              value: 90012
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      value: ''
    }
  },

  mounted() {
    login().then(res => {
      const { token } = res.data
      localStorage.setItem('token', token)
      getUserInfo().then(res => {
        const { F0001: cid } = res.data
        this.cid = cid
      })
      this.getListData()
    })
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    },

    getListData() {
      const params = {
        cid: 1,
        cmode: 2,
        pageNum: 1,
        pageSize: 10,
        name: ''
      }

      getCampusList(params).then(res => {
        for (const item of res.data.items) {
          item.F0094 = item.F0094 === 0 ? '正常营业' : '停业'
        }
        this.options.data = res.data.items
        this.options.total = res.data.total
      })
      const arr = this.options.columnDataInfo
      const result = []

      for (let i = 0; i < 10; i++) {
        const obj = {}
        for (const item of arr) {
          obj[item.value] = Math.random() * 10
        }
        result.push(obj)
      }

      // this.options.data = result
      // this.options.total = 30
    },

    handleClose() {
      this.dialogVisible = false
      // this.editFlag = false
      // this.$refs['createForm'].resetFields()
      // this.resetTree = !this.resetTree
      // this.defaultText = ''
      this.createForm = {
        userName: null,
        showName: null,
        organization: null,
        email: null,
        tel: null,
        expireTime: null,
        remark: null,
        id: null,
        jobNo: null
      }
    },

    handleSubmit() {

    },

    handleAdd() {
      this.dialogVisible = true
    },

    beforeAvatarUpload(file) {
      console.log('==========filefilefilefile==========================')
      console.log(file)
      console.log('====================================')
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      this.imageUrl = URL.createObjectURL(file.raw)
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG && isLt2M
    },

    handleTable(val) {
      console.log(val, '*****')
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
