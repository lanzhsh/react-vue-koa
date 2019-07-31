import { Form, Icon, Input, Button, Checkbox , Message} from "antd";
import { connect } from "dva";
import router from "umi/router";
import styles from "./login.css";

const FormItem = Form.Item;

@connect(({ login }) => ({
  login
}))
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj={account:values.用户名,password:values.密码}
        dispatch({
          type: "login/fetchLogin",
          payload:{
            account:obj.account,
            password:obj.password,
          },
          callback:res=>{
            if(res.code===1){
              Message.success(res.msg)
              sessionStorage.setItem("token", res.data.userId);
              router.push('/dashboard/analysis');
            }else{
              Message.warning(res.msg)
            }
          }
        },);
      } else {
        sessionStorage.setItem("token", "");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.loginBox}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <FormItem>
            {getFieldDecorator("用户名", {
              rules: [{ required: true, message: "请输入你的用户名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("密码", {
              rules: [{ required: true, message: "请输入你的密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
            注册并登陆
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
