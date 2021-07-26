import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './RouteLoader.css'

const antIcon = <div className="ant-icon-indicator">
    <LoadingOutlined className="loading-icon" spin />
    <div className="ant-icon-loading-text">Loading.......</div>
</div>;


const RouteLoader = () => {
    return <div className="route-laoder-container">
        <Spin indicator={antIcon} />
    </div>
}

export default RouteLoader;