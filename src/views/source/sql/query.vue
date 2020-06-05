<template >
  <div class="app-container"   >
    <el-row :gutter="20" >
    <el-col :span="4" :xs="24">
      <el-form ref="form" :model="form" >
        <el-form-item >
        <el-select v-model="value" placeholder="请选择"  @change='getValue'>
       <el-option
          v-for="item  in options"
          :value="item">{{item}}
        </el-option>
      </el-select>
        </el-form-item>
      </el-form>
     <div class="head-container" style="height:35rem;overflow:auto ">
       <el-tree
         :props="props"
         :load="loadNode"
         lazy
         >
       </el-tree>
    </div>
    </el-col>
      <el-col :span="20" :xs="24" >
        <el-card>
          <el-tabs v-model="activeName" >
           <el-tab-pane label="SELECT" name="select">
              <el-form  :inline="true" label-width="68px">
                <el-form-item label="SELECT" prop="select"　>
                  <el-input
                    type="textarea"
                    autosize
                    style="width: 40rem"
                    placeholder="请输入字段（默认 * ）"
                    v-model="textarea1">
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="FROM"
                  prop="age"
                  :rules="[{ required: true, message: '表名不能为空'}]">
                  <el-input type="age" placeholder="请输入表名"　 style="width: 40rem"　v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :key="domain.key"
                  :label="'关联' + index"
                >
                  <el-input
                    placeholder="请输入内容"
                    v-model="input3"
                    class="input-with-select"
                    style="width: 40rem"
                  >
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                      <el-option label="left join" value="1"></el-option>
                      <el-option label="right join" value="2"></el-option>
                      <el-option label="inner join" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" @click.prevent="removeDomain(domain)">删除</el-button>
                  </el-input>
                  </el-form-item>
                <el-form-item label="WHERE" prop="where">
                  <el-input
                    type="textarea"
                    autosize
                    style="width: 40rem"
                    placeholder="请输入条件"
                    v-model="textarea1">
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="GROUP　BY"
                  prop="group by">
                  <el-input type="textarea" autosize
                            style="width: 40rem"　v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  label="ORDER BY"
                  prop="order by">
                  <el-input type="age"　 style="width: 40rem"　 v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>

            </el-tab-pane>
            <el-tab-pane label="INSERT" name="insert">
              <el-form  :inline="true" label-width="68px">
                <el-form-item label="" prop="userName"style="" 　>
                  <el-input
                    type="textarea"
                    autosize
                    style="width: 40rem;"
                    placeholder=""
                    :autosize="{ minRows: 6}"
                    v-model="textarea1">
                  </el-input>
                </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="DELETE" name="delete">
              <el-form  :inline="true" label-width="68px">
                <el-form-item label="" prop="userName"　>
                  <el-input
                    type="textarea"
                    autosize
                    style="width: 40rem;"
                    placeholder=""
                    :autosize="{ minRows: 6,}"
                    v-model="textarea1">
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="UPDATE" name="update">
              <el-form  :inline="true" label-width="68px">
                <el-form-item label="" prop="userName"　>
                  <el-input
                    type="textarea"
                    autosize
                    style="width: 40rem;"
                    placeholder=""
                    :autosize="{ minRows: 6,}"
                    v-model="textarea1">
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-form label-width="100px">
            <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="addDomain">新增关联</el-button>
              <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>


      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getdatabase } from "@/api/source/sql";
  import axios from 'axios'
  export default {
      name: "Query",
    data() {
      return {
        // 选中选项卡的 name
        activeName: "select",
        // 表格的高度
        tableHeight: document.documentElement.scrollHeight - 245 + "px",
        input3: '',
        select: '',
        textarea1: '',
        value: [],
        form:{
          code:'',
          name:''
        },
        value:'',
        options: [],
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
        numberValidateForm: {
          age: ''
        },
         props: {
           label: 'name',
             children: 'zones',
             isLeaf: 'leaf'
         },

      };
    },
    created() {
      this.getList();
    },
    methods: {
      getValue: function(){
        console.log('您选择了', this.value)
      },
      /** 查询数据库名称列表 */
      getList() {
       getdatabase().then(response => {
         alert(1);
          console.log("获取数据");
      /*    this.options = response.rows;
          this.total = response.total;
         for(let i=0; i < this.options.length; i++){
           this.options.push(arr[i]);
         }*/

        } );
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '表' },{ name: '视图' },{ name: '存储过程'},{ name: '函数'}]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf'
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      }
    }
  };
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
