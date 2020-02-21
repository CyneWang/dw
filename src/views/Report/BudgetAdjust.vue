<template>
    <div class="viewBox">
        <PanelTitle>预算调整</PanelTitle>
        <PanelBody>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item class="mr-20">
                    <el-select v-model="sysValue"  @change="getSysName">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="mr-20">
                    <el-autocomplete class="inline-input" v-model="sysName" :fetch-suggestions="querySearch"
                                     :placeholder="placeTip" :trigger-on-focus="false"
                                     @select="handleSelect" :maxlength=30></el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
            <p v-if="tip" class="tip">{{tip}}</p>
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="修改用户：">
                                <span>{{ props.row.objName }}</span>
                            </el-form-item>
                            <el-form-item label="对象名称：">
                                <span>{{ props.row.objName }}</span>
                            </el-form-item>
                            <el-form-item label="对象类型：">
                                <span>{{ props.row.dbType }}</span>
                            </el-form-item>
                            <el-form-item label="年中受益数：">
                                <span>{{ props.row.budget }}</span>
                            </el-form-item>
                            <el-form-item label="调整时间：">
                                <span>{{ props.row.time }}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="年份" prop="year">
                </el-table-column>
                <el-table-column label="对象名称" prop="objName">
                </el-table-column>
                <el-table-column label="环境" prop="env">
                </el-table-column>
                <el-table-column label="数据库类型" prop="dbType">
                </el-table-column>
                <el-table-column label="编号" prop="number">
                </el-table-column>
                <el-table-column label="单价" prop="price">
                </el-table-column>
                <el-table-column label="预算" prop="budget">
                </el-table-column>
                <el-table-column label="状态" prop="status">
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" :disabled='scope.row.status==="调整中"?true:false'
                                   @click="handleEdit(scope.$index, scope.row)">调整
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="tableData.length>0" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]"
                           :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                           :total="tableData.length">
            </el-pagination>
            <el-dialog title="预算调整" :visible.sync="adjustTableVisible" width="70%">
                <vxe-table highlight-hover-row :edit-config="{trigger: 'click', mode: 'cell'}"
                           @edit-actived="editActivedEvent" @edit-closed="editClosedEvent" ref="xTable"
                           :data="adjustTableData">
                    <vxe-table-column type="index" width="60"></vxe-table-column>
                    <vxe-table-column field="objName" title="对象名称"></vxe-table-column>
                    <vxe-table-column field="actualSize" title="本月实际容量"
                                      :formatter="['toFixedString', 2]"></vxe-table-column>
                    <vxe-table-column field="thisYearEnd" title="今年年底容量" :formatter="['toFixedString', 2]"
                                      :edit-render="{name: 'input', attrs: {type: 'number'},immediate: true,}"></vxe-table-column>
                    <vxe-table-column field="nextYearEnd" title="明年年底容量" :formatter="['toFixedString', 2]"
                                      :edit-render="{name: 'input', attrs: {type: 'number'},immediate: true,}"></vxe-table-column>
                    <vxe-table-column field="" title="明年年中容量">
                        <template v-slot="{ row, rowIndex }">
                            <span>{{((parseFloat(row.thisYearEnd)+parseFloat(row.nextYearEnd))/2).toFixed(2)}}</span>
                        </template>
                    </vxe-table-column>
                </vxe-table>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content" style="text-align: center;margin-top: 20px;">
                            <el-button @click="adjustTableVisible = false">取消</el-button>
                            <el-button type="primary" @click="adjustTableVisible = false">提交</el-button>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                </el-row>
            </el-dialog>
        </PanelBody>
    </div>
</template>

<script>
    import PanelTitle from "../../components/PanelTitle";
    import PanelBody from '../../components/PanelBody';
    import {
        Suggest
    } from 'v-suggest';

    export default {
        name: "budgetAdjust",
        components: {
            PanelTitle,
            PanelBody,
            "v-suggest": Suggest,
        },
        data() {
            return {
                true: true,
                options: [{
                    value: 'database',
                    label: '数据库'
                }, {
                    value: 'subsystem',
                    label: '子系统'
                }],
                sysValue: 'database',
                input: '',
                placeText: '',
                tableData: [],
                adjustTableData: [],
                tip: "",
                currentPage: 1,
                adjustTableVisible: false,
                sysName: "",        //state2: ''
                sysNameList: [],   // restaurants: [],
                dbNameList: [],
                subNameList: [],
                placeTip:"请输入数据库名称",
            }
        },
        mounted() {
            this.getSysNameList();
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.axios.post('/api/report/budgetAdjustSub/')
                    .then((res) => {
                        this.adjustTableData = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    });
                this.adjustTableVisible = true;

            },
            getData() {
                if (this.sysValue !== '' && this.sysName !== '') {
                    this.tip = '';
                    this.axios.post('/api/report/budgetAdjust/', {
                        params: {
                            obj: "name111"
                        }
                    })
                        .then((res) => {
                            this.tableData = res.data;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    this.tip = '请填入完成的查询条件';
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            editActivedEvent({
                                 row,
                                 column
                             }, event) {
                console.log(`打开 ${column.title} 列编辑`)
            },
            editClosedEvent({
                                row,
                                column
                            }, event) {
                console.log(`关闭 ${column.title} 列编辑`)
            },
            async getSysNameList() {
                await this.axios.get('/api/report/budgetAdjust/dbname', {})
                    .then((res) => {
                        this.dbNameList = res.data;
                        this.sysNameList = this.dbNameList;
                    })
                    .catch(err => {
                        console.log(err)
                    });
                this.axios.get('/api/report/budgetAdjust/subname', {})
                    .then((res) => {
                        return this.subNameList = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getSysName() {
                let selectName = this.sysValue;
                this.sysName = "";
                if(selectName === "database"){
                    this.sysNameList = this.dbNameList;
                }else{
                    this.sysNameList = this.subNameList;
                    this.placeTip = "请输入子系统名称";
                }
            },
            querySearch(queryString, cb) {
                var sysNameList = this.sysNameList;
                var results = queryString ? sysNameList.filter(this.createFilter(queryString)) : sysNameList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (sysNameList) => {
                    return (sysNameList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        },
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .el-dialog {
        width: 70%;
    }
</style>
