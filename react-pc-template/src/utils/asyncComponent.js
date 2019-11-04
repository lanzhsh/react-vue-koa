import React, { Component } from "react";
import { Spin } from "antd";

const asyncComponent = importComponent => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                component: null
            };
        }
        componentDidMount() {
            importComponent().then(cmp => {
                this.setState({ component: cmp.default });
            });
        }
        render() {
            const styleObj = {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "40px"
            };
            const C = this.state.component;
            return C ? (
                <C {...this.props} />
            ) : (
                <div style={styleObj}>
                    <Spin tip="Loading..." />
                </div>
            );
        }
    };
};

export default asyncComponent;
