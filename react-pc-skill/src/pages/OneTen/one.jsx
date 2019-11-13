import React, { useReducer } from "react";
import EightteenChildOne from "../../components/TwoTen/EightteenChildOne";
import EightteenChildTwo from "../../components/TwoTen/EightteenChildTwo";
import EightteenChildThree from "../../components/TwoTen/EightteenChildThree";
import EightteenChildFour from "../../components/TwoTen/EightteenChildFour";
import EightteenChildFive from "../../components/TwoTen/EightteenChildFive";

// 导入 EightteenChildFive
import { Provider } from "../../utils/context";

import example, { defaultState } from "./store/reducer";

export const ExampleContext = React.createContext(null);

function ReducerCom() {
  const [exampleState, exampleDispatch] = useReducer(example, defaultState);

  return (
    <ExampleContext.Provider
      value={{ exampleState, dispatch: exampleDispatch }}
    >
      <EightteenChildThree></EightteenChildThree>
    </ExampleContext.Provider>
  );
}

export default class eighteen extends React.Component {
  componentDidMount(){
    console.log('eightteenChildFive的Ref值为')
      // 获取的 ref 里面包括整个组件实例,同样可以拿到子组件的实例
    console.log(this.refs["eightteenChildFiveRef"])
  }

  eightteenChildOneToFather = mode => {
    console.log("props 子传父值为", mode);
  };

  eightteenChildFourRef = (ref)=>{
      console.log('eightteenChildFour的Ref值为')
      // 获取的 ref 里面包括整个组件实例
      console.log(ref)
      // 调用组件方法
      ref.click()
  }

  render() {
    const name = "小人头";
    return (
      <div>
        <EightteenChildOne
          name={"props 传入的 name 值"}
          eightteenChildOneToFather={mode =>
            this.eightteenChildOneToFather(mode)
          }
        ></EightteenChildOne>
        <Provider value={name}>
          <div
            style={{
              border: "1px solid red",
              width: "30%",
              margin: "50px auto",
              textAlign: "center"
            }}
          >
            <p>父组件定义的值:{name}</p>
            <EightteenChildTwo></EightteenChildTwo>
          </div>
        </Provider>
        <ReducerCom></ReducerCom>
        <EightteenChildFour onRef={this.eightteenChildFourRef}></EightteenChildFour>
        <EightteenChildFive ref="eightteenChildFiveRef"></EightteenChildFive>
      </div>
    );
  }
}
