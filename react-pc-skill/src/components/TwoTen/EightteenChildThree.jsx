import React, {  useEffect, useContext } from 'react';
import {Button} from 'antd'

import {onChangeCount} from '../../pages/OneTen/store/action';
import { ExampleContext } from '../../pages/OneTen/one';

const Example = () => {

    const exampleContext = useContext(ExampleContext);

    useEffect(() => {
      console.log('变化执行啦')
  }, [exampleContext.exampleState.count]);

    return (
        <div>
            <p>值为{exampleContext.exampleState.count}</p>
            <Button onClick={() => exampleContext.dispatch(onChangeCount(exampleContext.exampleState.count))}>点击加 1</Button>
        </div>
    )
}

export default Example;