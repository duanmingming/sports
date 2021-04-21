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
            :props="{ checkStrictly: true }"
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

      <el-form ref="createForm" :model="createForm" :rules="rules" label-width="150px">
        <el-form-item label="上级地区：" prop="F0006" style="width:100%">
          <el-cascader
            v-model="createForm.F0006"
            :options="goodsTree"
            :props="{ checkStrictly: true }"
          />
        </el-form-item>
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
          <el-select v-model="createForm.F0013" style="width:100%" placeholder="请选择可运营商品">
            <el-option
              v-for="item in runGoodsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合作方式：" prop="F0034">
          <el-radio v-model="createForm.F0034" label="官方自营">官方自营</el-radio>
          <el-radio v-model="createForm.F0034" label="区域授权">区域授权</el-radio>
          <el-radio v-model="createForm.F0034" label="合作伙伴">合作伙伴</el-radio>
        </el-form-item>

        <el-form-item label="校区地址：" prop="F0024">
          <el-input v-model="createForm.F0024" placeholder="校区地址" />
        </el-form-item>

        <el-form-item label="校区介绍：" prop="F0035">
          <el-input v-model="createForm.F0035" type="textarea" :rows="3" placeholder="校区介绍" />
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
import { getCampusList, login, getUserInfo, uploadImage, addCampus } from '@/api/campus'

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
        F0002: null,
        F0033: null,
        F0013: null,
        F0034: '官方自营',
        F0024: null,
        F0035: null,
        F0011: null,
        F0008: null,
        F0094: null
      },
      rules: {
        F0002: [
          { required: true, message: '请输入校区名称', trigger: 'blur' }
        ],
        F0034: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        F0024: [
          { required: true, message: '请输入校区地址', trigger: 'blur' }
        ],
        F0035: [
          { required: true, message: '请输入校区介绍', trigger: 'blur' }
        ],
        F0011: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        F0008: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        F0013: [
          { required: true, message: '请选择可运营商品', trigger: 'change' }
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
      value: '',
      file: null,
      runGoodsOptions: [
        {
          value: '足球 SOCCER',
          label: '足球 SOCCER'
        }, {
          value: '篮球 BASKETBALL',
          label: '篮球 BASKETBALL'
        }, {
          value: '游泳 SWIM',
          label: '游泳 SWIM'
        }, {
          value: '美式橄榄球  AMERICAN FOOTBALL',
          label: '美式橄榄球  AMERICAN FOOTBALL'
        }, {
          value: '棒球 BASEBALL',
          label: '棒球 BASEBALL'
        },
        {
          value: '高尔夫 GOLF',
          label: '高尔夫 GOLF'
        }, {
          value: '体适能 MULTISPORT',
          label: '体适能 MULTISPORT'
        }, {
          value: '活动商品',
          label: '活动商品'
        }, {
          value: '赛事商品',
          label: '赛事商品'
        }, {
          value: '教练员培训',
          label: '教练员培训'
        }, {
          value: '普通商品',
          label: '普通商品'
        }, {
          value: '短期营商品',
          label: '短期营商品'
        }
      ]
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
        pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
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
      this.$refs['createForm'].resetFields()
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
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          if (this.file) {
            const fd = new FormData()
            fd.append('file', this.file.raw, this.file.name)
            uploadImage(fd).then(res => {
              const createForm = this.createForm
              createForm.F0033 = res.data.file
              createForm.F0094 = createForm.F0094 ? 0 : 1
              createForm.F0006 = createForm.F0006.shift()

              addCampus(createForm).then(res => {
                this.getListData()
              })
            })
          } else {
            this.$message.error('请上传校区封面')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleAdd() {
      this.dialogVisible = true
    },

    beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.file = file
    },

    handleTable(data) {
      if (data.type === 'getTable') {
        this.getListData()
      } else if (data.type === 'pageSizeChange') {
        this.options.pageSize = data.pageSize
      } else if (data.type === 'pageNumChange') {
        this.options.pageNum = data.pageNum
      } else if (data.type === '查看') {
        console.log(data)
        this.createForm = data.data
        this.imageUrl = data.data.F0033
        this.dialogVisible = true
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
