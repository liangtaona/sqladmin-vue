<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="模块代码" prop="moduleCode">
        <el-input
          v-model="queryParams.moduleCode"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模块名称" prop="moduleName">
        <el-input
          v-model="queryParams.moduleName"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="程序代码" prop="programCode">
        <el-input
          v-model="queryParams.programCode"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="程序名称" prop="programName">
        <el-input
          v-model="queryParams.programName"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行序号" prop="executionO">
        <el-input
          v-model="queryParams.executionO"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否更新" prop="updateOrNot">
        <el-input
          v-model="queryParams.updateOrNot"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['source:program:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['source:program:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['source:program:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['source:program:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="programList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="模块代码" align="center" prop="moduleCode" />
      <el-table-column label="模块名称" align="center" prop="moduleName" />
      <el-table-column label="程序代码" align="center" prop="programCode" />
      <el-table-column label="程序名称" align="center" prop="programName" />
      <el-table-column label="执行序号" align="center" prop="executionO" />
      <el-table-column label="创建人ID" align="center" prop="userId" />
      <el-table-column label="创建时间" align="center" prop="creationTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creationTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人ID" align="center" prop="updateId" />
      <el-table-column label="是否更新" align="center" prop="updateOrNot" />
      <el-table-column label="SQL语句" align="center" prop="sql" :formatter="sqlFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['source:program:edit']"
          >查看SQL语句</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改程序配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="模块代码" prop="moduleCode">
          <el-input v-model="form.moduleCode" placeholder="请输入模块代码" />
        </el-form-item>
        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="form.moduleName" placeholder="请输入模块名称" />
        </el-form-item>
        <el-form-item label="程序代码" prop="programCode">
          <el-input v-model="form.programCode" placeholder="请输入程序代码" />
        </el-form-item>
        <el-form-item label="程序名称" prop="programName">
          <el-input v-model="form.programName" placeholder="请输入程序名称" />
        </el-form-item>
        <el-form-item label="执行序号" prop="executionO">
          <el-input v-model="form.executionO" placeholder="请输入执行序号" />
        </el-form-item>

        <el-form-item label="SQL语句" prop="sql">
          <el-input v-model="form.sql" placeholder="请输入SQL语句" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listProgram, getProgram, delProgram, addProgram, updateProgram, exportProgram } from "@/api/source/program";

export default {
  name: "Program",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 程序配置表格数据
      programList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // SQL语句字典
      sqlOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        moduleCode: undefined,
        moduleName: undefined,
        programCode: undefined,
        programName: undefined,
        executionO: undefined,
        userId: undefined,
        creationTime: undefined,
        updateId: undefined,
        updateOrNot: undefined,
        sql: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_oper_type").then(response => {
      this.sqlOptions = response.data;
    });
  },
  methods: {
    /** 查询程序配置列表 */
    getList() {
      this.loading = true;
      listProgram(this.queryParams).then(response => {
        this.programList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // SQL语句字典翻译
    sqlFormat(row, column) {
      return this.selectDictLabel(this.sqlOptions, row.sql);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        moduleCode: undefined,
        moduleName: undefined,
        programCode: undefined,
        programName: undefined,
        executionO: undefined,
        userId: undefined,
        creationTime: undefined,
        updateId: undefined,
        updateTime: undefined,
        updateOrNot: undefined,
        sql: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加程序配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getProgram(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改程序配置";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateProgram(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addProgram(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除程序配置编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delProgram(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有程序配置数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportProgram(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
