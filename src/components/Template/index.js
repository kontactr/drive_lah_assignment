
import { Layout, Modal } from "antd";
import Header from 'components/Header'
import SideBar from 'components/SideBar'
import { useHistory } from 'react-router-dom'
import { inject, observer } from "mobx-react"
import React, { useState } from "react";
import routes from 'config/routes';
import './Template.css'

const { Content } = Layout

const Template = (props) => {

    const history = useHistory()
    const { sessionStore, children } = props;
    const { resetUser } = sessionStore
    const [collapsed, setCollapsed] = useState(false)


    const onLogout = () => {
        Modal.confirm({
            title: "Logout",
            content: "Are you sure want to logout?",
            onOk: () => {
                resetUser()
                history.push(routes.login.generateRoute())
            }
        })
    }

    const toggleMenu = () => {
        setCollapsed(!collapsed)
    }

    return <div className="dashboard-container">
        <Layout>
            <SideBar collapsed={collapsed} onLogout={onLogout} />
            <Layout className="site-layout">
                <Header collapsed={collapsed} onClick={toggleMenu} />
                <Content
                    className="site-layout-background site-layout-content"
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    </div >
}

export default inject('sessionStore')(observer(Template))