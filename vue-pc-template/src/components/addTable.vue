<template>
<div>
 <el-dialog title="个人信息" :visible.sync="dialogFormVisible.flag">
  <el-form :model="form">
    <el-form-item label="日期" :label-width="formLabelWidth">
      <el-input v-model="form.date" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址" :label-width="formLabelWidth">
      <el-input v-model="form.address" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible.flag = false">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  props:['addFlag','editTableData'],
  data() {
    return {
      form: {
        date: "",
        name: "",
        address: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed:{
    dialogFormVisible(){
      return this.addFlag;
    },
  },
  watch:{
    editTableData(){
      this.form=this.editTableData[0];
    }
  },
  methods:{
    addSubmit(){
      let diaArr=['date','name','address'];
      for(let i=0,len=diaArr.length;i<len;i++){
        console.log(this.form[diaArr[i]])
        if(!this.form[diaArr[i]]){
          this.$message.warning(diaArr[i]+'不能为空!');
          return;
        }
      }
      if(!this.editTableData){
        this.$emit('addFather',this.form);
      }
      this.dialogFormVisible.flag=false;
    }
  }
};
</script>

