import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Button ,Table, Modal, Form, Input, Message} from 'antd';
import { connect } from 'dva';

const { Column } = Table;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    render() {
      const {
        visible,addOrEdit, onCancel, onCreate, form,formData
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={addOrEdit==='add'?'新增课程':'编辑课程'}
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="名称">
              {getFieldDecorator('name', {
                initialValue: formData.name,
                rules: [{ required: true, message: '请输入名称!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="价格">
              {getFieldDecorator('price', {
                initialValue: formData.price,
                rules: [{ required: true, message: '请输入价格!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="数量">
              {getFieldDecorator('number', {
                initialValue: formData.number,
                rules: [{ required: true, message: '请输入数量!' }],
              })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
)

@connect(({ analysis}) => ({
  analysis
}))

export default class Analysis extends PureComponent{

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/fetchCourse',
    });
  }

  state = {
    visible: false,
    formData:{id:'',name:'',price:'',number:''},
    addOrEdit:'add',
  };

  showModal = () => {
    this.setState({formData:{name:'',price:'',number:''}});
    this.setState({ visible: true });
    this.setState({addOrEdit:'add'});
  }

  handleCancel = () => {
    this.setState({formData:{name:'',price:'',number:''}});
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const { dispatch} = this.props;
    
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //判断是否是编辑
      if(this.state.addOrEdit==='edit'){
        values.id=this.state.formData.id
      }
      dispatch({
        type: this.state.addOrEdit==='add'?'analysis/fetchAddCourse':'analysis/fetchEditCourse',
        payload:values,
        callback:res=>{
          if(res.code===1){
            Message.success(res.msg)
            dispatch({
              type: 'analysis/fetchCourse',
            });
          }else{
            Message.warning('操作失败,请检查!')
          }
          form.resetFields();
        }
      });
      this.setState({ visible: false });
    });
  }

  // 编辑
  handleEdit(record){
    this.setState({ visible: true });
    this.setState({addOrEdit:'edit'});
    this.setState({formData:record});
  }

  //删除
  handleDelete(record){
    const { dispatch} = this.props;

    dispatch({
      type: 'analysis/fetchDeleteCourse',
      payload:{id:record.id},
      callback:res=>{
        if(res.code===1){
          Message.success(res.msg)
          dispatch({
            type: 'analysis/fetchCourse',
          });
        }else{
          Message.warning('操作失败,请检查!')
        }
      }
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render(){
    const {analysis}=this.props;
    const {courseData}=analysis;

    return (
    <div>
      <Button type="primary" onClick={this.showModal}>新增</Button>
      
      <Table dataSource={courseData} rowKey={courseData=>courseData.id}>
        <Column
          title="名称"
          dataIndex="name"
        />
        <Column
          title="价格"
          dataIndex="price"
        />
        <Column
          title="数量"
          dataIndex="number"
        />
        <Column
          title="操作"
          render={(text, record, index)=>(
            <div>
              <Button type="primary" onClick={this.handleEdit.bind(this,record)}>编辑</Button>
              <Button type="primary" onClick={this.handleDelete.bind(this,record)}>删除</Button>
            </div>
          )}
        />
      </Table>

        
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          formData={this.state.formData}
          addOrEdit={this.state.addOrEdit}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />

    </div>
    );
  }
}

