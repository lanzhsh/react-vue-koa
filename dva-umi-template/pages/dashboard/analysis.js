import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Button } from 'antd';
import { connect } from 'dva';

@connect(({ analysis}) => ({
  analysis
}))

export default class Analysis extends PureComponent{

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/fetchWeather',
    });
  }

  render(){
    const {analysis}=this.props;
    const {queryWeather}=analysis;

    return (
    <div>
      <h1>分析页</h1>
      <Button type="primary" onClick={() => {
        router.push('/login');
      }}>Back</Button>
      <span>weather值为</span><span>{queryWeather}</span>
    </div>
    );
  }
}

