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
      <el-form ref="ruleForm" :inline="true" :rules="rules" :model="formInline" label-width="100px">
        <el-form-item label="班编号" prop="F0002">
          <el-input disabled v-model="formInline.F0002" ></el-input>
        </el-form-item>
        <el-form-item label="班名称">
          <el-input disabled v-model="formInline.F0003" ></el-input>
        </el-form-item>
        <el-form-item style="width:100%" label="教练">
          <el-select style="width:100%" disabled  v-model="formInline.F0004" multiple placeholder="请选择">
            <el-option
              v-for="item in coachOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="F0006">
          <el-date-picker
            v-model="formInline.F0006"
            type="date"
            disabled
            placeholder="选择日期"
            style="width:100%"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="F0007">
          <el-date-picker
            v-model="formInline.F0007"
            disabled
            type="date"
            placeholder="选择日期"
            style="width:100%"
            value-format="yyyy-MM-dd"
          />
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
  
    <div class="content" style="marginBottom:300px">
      <template v-for="(item, index) in studentInfo">
        <el-row :key="index"  style="lineHeight:43px;height:43px">
          <el-col :span="3"><div class="grid-content bg-purple"><span>{{item.name}}</span></div></el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple">
              <el-radio-group :key="index" v-model="item.status" @change="handleChangeStatus(value, item)">
                <el-radio label="已上课">已上课</el-radio>
                <el-radio label="事假">事假</el-radio>
                <el-radio label="病假">病假</el-radio>
                <el-radio label="旷课">旷课</el-radio>
                <el-radio label="停课">停课</el-radio>
                <el-radio label="其他">其他</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="4"><div class="grid-content bg-purple"><span>剩余课时：{{item.rest}}</span></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"><span>已上课时：{{item.done}}</span></div></el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script>
import { getStudentList,  getCoachList, createClass, editClass, addClassTimes, deleteClassTimes, getClassTimesDetail, getSignClassTimes, signClassTimes} from '@/api/class'

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
      studentInfo: [{
        name: '王小虎',
        status: "已上课",
        rest: 3,
        done: 2
      },
      {
        name: '王小虎',
        status: "已上课",
        rest: 3,
        done: 2
      },{
        name: '王小虎',
        status: "已上课",
        rest: 3,
        done: 2
      },
      {
        name: '张三',
        status: "已上课",
        rest: 3,
        done: 2
      }],

      classDetailId: null

    }
  },

  watch: {
    value(newValue, oldValue) {
      if(this.classId){
        if(oldValue && (newValue.getMonth() === oldValue.getMonth())){
          let year = newValue.getFullYear(),
              month = (newValue.getMonth() + 1) > 9 ? (newValue.getMonth() + 1) : ('0' + (newValue.getMonth() + 1)),
              date = newValue.getDate() > 9 ?  newValue.getDate() : ('0' + newValue.getDate())
          let now = year + '-' + month + '-' + date
          this.now = now
          this.classDetailId = this.schedle[now].id
          if(now in this.schedle){
            let params ={
              cid: localStorage.getItem('cid'),
              classid: this.schedle[now].id
            }

            getSignClassTimes(params).then(res => {
              
            })
          }
          
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
            status,
            id: item.F0000
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
    },

    handleChangeStatus(index, item){
      console.log(this.studentOptions, 'statusstatusstatus');
      let memberid = null
      for(let temp of this.studentOptions){
        if(temp.label === item.name){
          memberid = temp.value
        }
      }
      let params = {
        classid: this.classDetailId,
        state: item.status,
        memberid
      }

      signClassTimes(params)
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