import { Component } from 'react';
import { Layout, Icon, message } from 'antd';
import router from "umi/router";
import SiderMenu from "../components/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.png';
import GlobalHeader from "../components/GlobalHeader";
import Login from "../pages/login/login";

const { Content, Header, Footer } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentWillReceiveProps (){
    //根据token和hash值对登陆状态进行拦截
    const token=sessionStorage.token;
    const {hash}=location;
    if(!token&&hash!='#/login'){
      router.push('/login')
    }
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    if (location.pathname === '/login') {
      return <Login></Login>
    }
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData()}
          location={location}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
              }}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            { children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
