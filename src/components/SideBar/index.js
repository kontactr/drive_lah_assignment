import PropTypes from 'prop-types';
import { Layout } from "antd";
import {
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './SideBar.css'

const { Sider } = Layout

const SideBar = (props) => {
    const { collapsed, onLogout } = props
    return (<Sider trigger={null} collapsible collapsed={collapsed} className="dashboard-sider">
        <div className="app-logo-container">
            <UserOutlined className="app-logo" />
        </div>
        <div className="sider-menu-item" onClick={onLogout}>
            <span className="sider-menu-item-logo-container" >
                <LogoutOutlined className="sider-menu-item-logo" />
            </span>

            {!collapsed && <span className="sider-menu-item-text" >
                Logout
            </span>}
        </div>

    </Sider>)
}

SideBar.propTypes = {
    collapsed: PropTypes.bool,
    onLogout: PropTypes.func
}

export default SideBar;