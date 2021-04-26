<template>
  <div>
    <el-table
      :data="options.data"
      :border="options.border"
      :max-height="options.maxHeight"
      :style="(options.style || '')"
      @selection-change="handleSelectionChange"
    >
      <div v-if="options.multiple">
        <el-table-column
          type="selection"
          width="55"
        />
      </div>

      <template v-for="(item, index) in options.columnDataInfo">
        <template v-if="item.type && item.type === 'switch'">
          <el-table-column
            :key="index"
            :prop="item.value"
            :label="item.name"
            :min-width="(item.width || '')"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row[item.value]"
                active-text=""
                inactive-text=""
                @change="handleSwitchChange(scope.row)"
              />
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :key="index"
            :prop="item.value"
            :label="item.name"
            :min-width="(item.width || '')"
            :show-overflow-tooltip="(item.overflow || false)"
          />
        </template>
      </template>
      <el-table-column
        v-if="options.hasOwnProperty('columnOpreationInfo')"
        label="操作"
        :min-width="options.opreationWidth || 20"
        :fixed="options.fixed ? options.fixed : false"
      >
        <template slot-scope="scope">
          <el-button v-for="(item, index) in options.columnOpreationInfo" :key="index" type="text" size="small" :style=" item.checkField ? (scope.row[item.checkField] === item.checkValue ? {} : item.style) : item.style" :disabled="item.checkField ? (scope.row[item.checkField] === item.checkValue ? true : false) : false" @click="handleTable(item.name, scope.row)">{{ item.name }}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :current-page.sync="pageNum"
      :page-sizes="options.pageSizes || [10, 20, 30]"
      :page-size="pageSize"
      layout="total,  prev, pager, next, sizes, jumper"
      :total="options.total"
      :style="{position:'fixed', bottom:( options.bottom || '10px')}"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      pageNum: this.options.pageNum || 1,
      pageSize: this.options.pageSize || 10,
      multipleSelection: []
    }
  },

  computed: {
    num() {
      return this.options.pageNum || 1
    },

    size() {
      return this.options.pageSize || 10
    }
  },

  watch: {
    num(val) {
      this.pageNum = val
    },

    size(val) {
      this.pageSize = val
    }
  },

  methods: {
    handleTable(type, data) {
      this.$emit('handleTable', {
        type,
        data
      })
    },

    handleSizeChange(val) {
      this.$emit('handleTable', {
        type: 'pageSizeChange',
        pageSize: val
      })
      const newPageNum = (this.options.total - this.options.total % val) / val + 1
      if (newPageNum < this.pageNum) {
        this.pageSize = val
      } else {
        this.$emit('handleTable', {
          type: 'getTable',
          pageSize: val,
          pageNum: this.pageNum
        })
        this.pageSize = val
      }
    },

    handleCurrentChange(val) {
      this.$emit('handleTable', {
        type: 'pageNumChange',
        pageNum: val
      })
      this.$emit('handleTable', {
        type: 'getTable',
        pageSize: this.pageSize,
        pageNum: val
      })
    },

    handleSwitchChange(data) {
      this.$emit('handleTable', {
        type: 'switchChange',
        data
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleTable', {
        type: 'multipleSelect',
        data: val
      })
    }
  }

  // checkField: 'status',
  // checkValue: true
}
</script>

<style>

</style>
