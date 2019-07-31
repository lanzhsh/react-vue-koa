import { Form, Icon, Input, Button, Checkbox } from "antd";
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
        console.log("Received values of form: ", values);
        dispatch({
          type: "login/fetchLogin"
        });

        //获取上面存贮的值
        let _this=this;
        setTimeout(()=>{
          const { login } = _this.props;
          if (login) {
            sessionStorage.setItem("token", login);
            router.push('/dashboard/analysis');
          } else {
          }
        },80)
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
              登陆
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
