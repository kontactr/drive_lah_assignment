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
        <div className="sider-menu-item">
            <span className="sider-menu-item-logo-container" >
                <LogoutOutlined className="sider-menu-item-logo" />
            </span>

            {!collapsed && <span className="sider-menu-item-text" onClick={onLogout}>
                Logout
            </span>}
        </div>

    </Sider>)
}

export default SideBar;