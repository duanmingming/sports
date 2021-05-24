<template>
  <div>
      <div class="content" style="marginTop:30px">
        <el-form ref="ruleForm" :inline="true" border :model="formInline" label-width="100px">
            <el-form-item style="width:36%" label="教练">
                <el-select style="width:100%"  v-model="formInline.F0005" placeholder="请选择">
                    <el-option
                    v-for="item in studentOptions"
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
                placeholder="选择日期"
                style="width:100%"
                value-format="yyyy-MM-dd"
            />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleQuery">筛选</el-button>
            </el-form-item>
        </el-form>
        </div>

        <el-table
        :data="tableData"
        border
        style="width: 80%;margin: 10px auto;">
            <el-table-column
                prop="date"
                label="序号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="星期">
            </el-table-column>
            <el-table-column
                prop="date"
                label="开始时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="结束时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="校区">
            </el-table-column>
            <el-table-column
                prop="date"
                label="课程名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="状态"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="备注">
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import { getStudentList, getClassStudent, getClassCoach,  getCoachList, createClass, editClass, addClassTimes, deleteClassTimes, getClassTimesDetail} from '@/api/class'

export default {
    name: 'CoachSchedule',
    data() {
        return {
            formInline: {},
            studentOptions: [],
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    },

    created() {
        let orgId = 1
    //parseInt(this.$route.query.F0001)

        getCoachList(orgId).then(res =>{
        let arr = res.data.items, coachOptions = []
        for(let item of arr){
            coachOptions.push({
            value: item.F0000,
            label: item.F0002
            })
        }
        this.studentOptions= coachOptions
        })
    },

    methods: {
        handleQuery() {
            if(this.formInline.F0006 && this.formInline.F0005){
                let arr = this.formInline.F0006.split('-')
                let month = arr[0] + arr [1]
                let params = {
                    coach: this.formInline.F0005,
                    month,
                    cid: localStorage.getItem('cid'),
                }
                console.log(params, 'PPPPP');
                getClassCoach(params).then(res => {
                    this.tableData = res.data
                })
            }
        }
    }
}
</script>

<style scoped>
    .content{
        width: 80%;
        margin: 10px auto;
    }
</style>