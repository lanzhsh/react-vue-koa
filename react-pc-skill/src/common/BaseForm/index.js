import React from 'react'
import { getOptionsList } from '../../utils'
import { Input, Select, Form, Button, DatePicker } from 'antd'
const FormItem = Form.Item

class FilterForm extends React.Component{
    creatFormList = () =>{
        //用于双向数据绑定
        const { getFieldDecorator } = this.props.form
        const data = this.props.data;
        const list = [];
        data.forEach((item,index) => {
            const { type, field, label, initialValue, width, placeholder } = item;
            switch(type){
                case 'input':
                    const inputItem = <FormItem key={field} label={label}>
                            {getFieldDecorator(field,{
                                initialValue
                            })(
                                <Input style={{width}} type="text" placeholder={placeholder} />
                            )}
                        </FormItem>
                    list.push(inputItem);
                break;
                case 'select':
                    const selectItem =  <FormItem key={field}  label={label}>
                        {getFieldDecorator(field,{
                            initialValue
                        })(
                            <Select style={{ width }}>
                                {getOptionsList(item.list)}
                            </Select>
                        )}
                    </FormItem>   
                    list.push(selectItem); 
                break;
                case 'chooseTime':
                    const beginTimeItem = <FormItem key={type} label={label}>
                        {getFieldDecorator('beginTime')(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                        )}
                    </FormItem>
                    list.push(beginTimeItem); 
                    const endTimeItem = <FormItem key="EndTime" label="~" colon={false} >
                        {
                            getFieldDecorator('EndTime')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    list.push(endTimeItem); 
                break;
                default:    
            }
        })
        return list;
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    handleFilterSubmit = ()=>{
        const data = this.props.form.getFieldsValue();
        this.props.handleSearch(data);
    }
    render(){
        return (
            <Form   layout='inline'>
                {this.creatFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FilterForm);