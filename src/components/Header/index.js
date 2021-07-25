import { Layout } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import "./Header.css"

const { Header } = Layout

const HeaderComponent = (props) => {
    const { collapsed, onClick } = props

    const triggerMenuProps = {
        className: 'trigger',
        onClick
    }

    return (<Header className="site-layout-background">
        {collapsed ? <MenuUnfoldOutlined {...triggerMenuProps} /> : <MenuFoldOutlined {...triggerMenuProps} />}
    </Header>)
}

export default HeaderComponent;