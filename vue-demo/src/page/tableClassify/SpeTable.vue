<template>
<div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.date"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address"></el-input>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.date"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address"></el-input>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.date"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </template>

  <script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters({
    tableData: "allTableData"
  }),
  methods: mapActions(["getAllData"])
};
</script>
