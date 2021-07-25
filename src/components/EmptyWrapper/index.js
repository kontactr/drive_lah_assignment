import { Empty } from 'antd'
import { emptyDataLogo } from 'config/images'
import './EmptyWrapper.css'

const imageStyle = {
    image: emptyDataLogo,
    height: 60,

}
const EmptyComponent = (props) => {
    const { description } = props;
    return (<Empty
        {...imageStyle}
        description={
            description || (<span>
                No Data
            </span>)
        }
    >
    </Empty >)
}

export default EmptyComponent;