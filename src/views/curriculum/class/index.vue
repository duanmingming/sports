<!--
 * @Author: your name
 * @Date: 2021-04-25 15:10:08
 * @LastEditTime: 2021-05-10 16:18:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sports/src/views/curriculum/schedule.vue
-->
<template>
  <div>
    <div class="content" style="marginTop:30px">
      <el-form ref="ruleForm" :inline="true" :rules="rules" :model="formInline" label-width="70px">
        <el-form-item label="班编号" prop="F0002">
          <el-input v-model="formInline.F0002" ></el-input>
        </el-form-item>
        <el-form-item label="班名称">
          <el-input v-model="formInline.F0003" ></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="F0006">
          <el-date-picker
            v-model="formInline.F0006"
            type="date"
            placeholder="选择日期"
            style="width:100%"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="F0007">
          <el-date-picker
            v-model="formInline.F0007"
            type="date"
            placeholder="选择日期"
            style="width:100%"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="上课频次">
          <el-input v-model="formInline.F0015"></el-input>
        </el-form-item>
        <el-form-item style="width:100%" label="教练">
          <el-select style="width:100%"  v-model="formInline.F0004" multiple placeholder="请选择">
            <el-option
              v-for="item in coachOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%" label="学员">
          <el-select style="width:100%"  v-model="formInline.F0005" multiple placeholder="请选择">
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:43%">保存</el-button>
          <el-button style="width:43%" @click="handleGoback">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <el-calendar v-model="value" :key='key'>
        <template
          slot="dateCell"
          slot-scope="{date, data}"
        >
          <div>
            <p :class="data.isSelected ? 'is-selected' : ''" style="fontSize:14px">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
            <template v-if="data.day in schedle ? schedle[data.day] : false">
              <span class="text" :style="{color: schedle[data.day].status == 0 ? 'red' : (schedle[data.day].status == 6 ? 'yellow' : 'green' )}">{{schedle[data.day].start}}--{{schedle[data.day].end}}</span>
            </template>
            
          </div>
        </template>
      </el-calendar>
    </div>
    


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="666px"
      :before-close="handleClose">

      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="时间">
          <el-time-picker
            is-range
            arrow-control
            v-model="formLabelAlign.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width:100%"
            value-format="HH:mm:ss"
            >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formLabelAlign.status">
            <el-radio :label="9">未开始</el-radio>
            <el-radio :label="6">进行中</el-radio>
            <el-radio :label="3">已结束</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formLabelAlign.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStudentList,  getCoachList, createClass, editClass, addClassTimes, deleteClassTimes, getClassTimesDetail} from '@/api/class'

export default {
  data() {
    return {
      value:'',
      schedle:{
        '04-02': {
          status: '',
          start: '',
          end: ''
        }
      },

      dialogVisible: false,
      formLabelAlign: {
        time:null,
        note:'',
        status:''
      },
      now: '',
      key: 0,

      formInline: {
        F0002: '',
        F0003: '',
        F0006: '',
        F0007: '',
        F0015: '',
        F0004: '',
        F0005: ''
      },
      studentOptions: [],
      coachOptions: [],

      rules: {
        F0002: [
            { required: true, message: '请输入班编号', trigger: 'blur' }
          ],
        F0006: [
            {  required: true, message: '请选择日期', trigger: 'change' }
          ],
          F0007: [
            {  required: true, message: '请选择时间', trigger: 'change' }
          ],
      },
      classId: this.$route.query.F0000,

    }
  },

  watch: {
    value(newValue, oldValue) {
      if(this.classId){
        if(oldValue && (newValue.getMonth() === oldValue.getMonth())){
          this.dialogVisible = true
          let year = newValue.getFullYear(),
              month = (newValue.getMonth() + 1) > 9 ? (newValue.getMonth() + 1) : ('0' + (newValue.getMonth() + 1)),
              date = newValue.getDate() > 9 ?  newValue.getDate() : ('0' + newValue.getDate())
          let now = year + '-' + month + '-' + date
          this.now = now
        }
      }else{
         this.$message({
          message: '请先保存课程信息',
          type: 'error'
        });
      }
    }
  },

  created() {
    let orgId = 1
    //parseInt(this.$route.query.F0001)
    getStudentList(orgId).then(res => {
      let arr = res.data.items, studentOptions = []
      for(let item of arr){
        studentOptions.push({
          value: item.F0000,
          label: item.F0002
        })
      }
      this.studentOptions = studentOptions
    })

    getCoachList(orgId).then(res =>{
      let arr = res.data.items, coachOptions = []
      for(let item of arr){
        coachOptions.push({
          value: item.F0000,
          label: item.F0002
        })
      }
      this.coachOptions= coachOptions
    })

    this.formInline = this.$route.query

    if(this.$route.query.hasOwnProperty('F0000')){
      let params = {
        cid: localStorage.getItem('cid'),
        schid: this.$route.query.F0000
      }
      getClassTimesDetail(params).then(res =>{
        let obj = {}
        for(let item of res.data.items){
          let key = (item.F0004).slice(0,10)
          let start = item.F0005
          let end = item.F0006
          let status = item.F0094
          obj[key] = {
            start,
            end,
            status
          }
        }
        console.log(obj, '???????/');
       this.schedle = obj
      })
    }
  },

  mounted() {
    console.log(this.$route.query, '//////');
  },

  methods: {
    handleClick(a,b) {
    },

    handleClose() {
      
    },

    handleSubmit() {
      let {time, note, status} = this.formLabelAlign
      if(time){
        console.log(time, this.value, this.classId, this.now);
        this.schedle[this.now] = {
          time,
          note,
          status
        }

        let params = {
          cid: localStorage.getItem('cid'),
          schid: this.classId,
          F0004: this.now,
          F0005: time[0],
          F0006: time[1]
        }

        addClassTimes(params)
      }else{
        if(this.schedle.hasOwnProperty(this.now)){
          delete this.schedle[this.now]
        }
      }
      
      this.dialogVisible = false
      this.key = this.key  + 1
    },

    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let { F0002, F0003, F0004, F0005, F0006, F0007 } = this.formInline
            let params = {
              F0001: localStorage.getItem('cid'),
              F0002,
              F0003,
              F0004,
              F0005,
              F0006,
              F0007
            }

            if(this.$route.query.hasOwnProperty('F0000')){
              editClass(params).then(res => {
                 this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.classId = this.formInline.F0000
              })
            }else{
              createClass(params).then(res => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                this.classId = this.formInline.F0000
              })
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });



      
    },

    handleGoback() {
      this.$router.back(-1)
    }
  }

}
</script>

<style scoped>
  .text {
    font-size: 14px;
    display: block;
    color:chartreuse;
  }

  .el-form--inline .el-form-item {
    width: 36%
  }

  .content {
    width: 90%;
    margin: 0 auto;
  }

  >>>.el-form-item__content {
    width: 60%
  }

</style>