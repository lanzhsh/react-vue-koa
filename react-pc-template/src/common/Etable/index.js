import React from 'react'
import { Table } from 'antd'
class Etable extends React.Component {

    onSelectChange = (selectedRowKeys,selectedRows)=> {
        this.props.updateSelectedItem(selectedRowKeys,selectedRows,this.props.that)
    }
    onRowClick = (index,record)=>{
        /**
         * @param {* 勾选的类型} type radio是单选
         */
        const type = this.props.type
        if(type=== 'radio'){
            this.onSelectChange([index],[record])
        }else{
            let selectedRowKeys = [...this.props.rowSelection.selectedRowKeys]
            let selectedRows = [...this.props.rowSelection.selectedRows]
            if(selectedRowKeys.includes(index)){
                var selectIndex = selectedRowKeys.findIndex(item=>{
                    return index===item
                })
                selectedRowKeys.splice(selectIndex,1)
                selectedRows.splice(selectIndex,1)
            }else{
                selectedRowKeys.push(index)
                selectedRows.push(record)
            }
            this.onSelectChange(selectedRowKeys,selectedRows)
        }

        
    }
    render(){

        //是否分页
        let pagination = this.props.pagination
        if(!pagination || pagination === false){
            pagination = false
        }

        //是否需要勾选
        let rowSelection = this.props.rowSelection
        rowSelection.type = this.props.type==='radio'?'radio':'checkbox'
        let onRow
        if(!rowSelection){
            rowSelection = null
        }else{
            rowSelection.onChange = this.onSelectChange;
            onRow = (record,index) =>{
                return {
                    onClick:()=>{
                        this.onRowClick(index,record)
                    }
                }
            }
        }


        return (
            <Table 
                dataSource={this.props.dataSource}//表格内容
                columns={this.props.columns}//表头数据
                pagination={pagination}//分页
                rowSelection={rowSelection}//是否勾选以及是单选还是多选
                onRow={onRow}//表格单行点击
            />
        )
    }

}

export default Etable 