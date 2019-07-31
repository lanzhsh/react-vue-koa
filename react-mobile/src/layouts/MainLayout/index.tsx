import * as React from 'react';
import Header from '@/components/Header';
import Tab from '@/components/Tab';
import './style.scss';
class MainLayout extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div className="qqmusic-home">
                <Header className="qqmusic-home-header" />                                                             
                    {children}
                <Tab/>
            </div>
        );
    }
}
export default MainLayout;