<template>
    <div class="viewBox">
        <PanelTitle>预算调整</PanelTitle>
        <PanelBody class="min-height">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item class="mr-20">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="mr-20">
                    <el-input v-model="input" :placeholder="placeText"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
            <p v-if="tip" class="tip">{{tip}}</p>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
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
                <el-table-column
                        label="年份"
                        prop="year">
                </el-table-column>
                <el-table-column
                        label="对象名称"
                        prop="objName">
                </el-table-column>
                <el-table-column
                        label="环境"
                        prop="env">
                </el-table-column>
                <el-table-column
                        label="数据库类型"
                        prop="dbType">
                </el-table-column>
                <el-table-column
                        label="编号"
                        prop="number">
                </el-table-column>
                <el-table-column
                        label="单价"
                        prop="price">
                </el-table-column>
                <el-table-column
                        label="预算"
                        prop="budget">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status">
                </el-table-column>
                <el-table-column
                        label="操作"
                        prop="">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" :disabled='scope.row.status==="调整中"?true:false'
                                   @click="handleEdit(scope.$index, scope.row)">调整
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-show="tableData.length>0"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
            </el-pagination>
            <el-dialog title="预算调整" :visible.sync="adjustTableVisible" width="70%">
                <vxe-table
                        highlight-hover-row
                        :edit-config="{trigger: 'click', mode: 'cell'}"
                        @edit-actived="editActivedEvent"
                        @edit-closed="editClosedEvent"
                        :footer-method="footerMethod"
                        :footer-cell-class-name="footerCellClassName"
                        class="editable-footer"
                        ref="xTable"
                        :data="adjustTableData">
                    <vxe-table-column type="index" width="60"></vxe-table-column>
                    <vxe-table-column field="objName" title="对象名称"></vxe-table-column>
                    <vxe-table-column field="actualSize" title="本月实际容量"></vxe-table-column>
                    <vxe-table-column field="thisYearEnd" title="今年年底容量" :edit-render="{name: 'input', attrs: {type: 'number'},immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
                    <vxe-table-column field="nextYearEnd" title="明年年底容量" :edit-render="{name: 'input', attrs: {type: 'number'},immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
                    <vxe-table-column field="nextYearHalf" title="明年年中容量"></vxe-table-column>
                </vxe-table>
            </el-dialog>
        </PanelBody>
    </div>
</template>

<script>
    import PanelTitle from "../../components/PanelTitle";
    import PanelBody from '../../components/PanelBody';

    export default {
        name: "budgetAdjust",
        components: {PanelTitle, PanelBody},
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
                value: '',
                input: '',
                placeText: '',
                tableData: [],
                adjustTableData:[],
                tip: "",
                currentPage: 1,
                adjustTableVisible: false,
            }
        },
        mounted() {
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
                if (this.value !== '' && this.input !== '') {
                    this.tip = '';
                    this.axios.post('/api/report/budgetAdjust/', {params: {obj: "name111"}})
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
            editActivedEvent ({ row, column }, event) {
                console.log(`打开 ${column.title} 列编辑`)
            },
            editClosedEvent ({ row, column }, event) {
                console.log(`关闭 ${column.title} 列编辑`)
            },
            footerCellClassName ({ $rowIndex, column, columnIndex }) {
                if (columnIndex === 0) {
                    if ($rowIndex === 0) {
                        return 'col-blue'
                    } else {
                        return 'col-red'
                    }
                }
            },
            footerMethod ({ columns, data }) {
                return [
                    columns.map((column, columnIndex) => {
                        if (columnIndex === 0) {
                            return '和值'
                        }
                        if (['actualSize', 'thisYearEnd','nextYearEnd','nextYearHalf'].includes(column.property)) {
                            return this.$utils.sum(data, column.property)
                        }
                        return null
                    })
                ]
            },
            updateFooterEvent (params) {
                let xTable = this.$refs.xTable;
                xTable.updateFooter()
            },
        },
    }
</script>

<style scoped>
    .min-height {
        min-height: 386px;
    }

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
    .el-dialog{
        width: 70%;
    }
</style>