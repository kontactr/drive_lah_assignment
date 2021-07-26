import { useCallback } from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router'
import './NoRoute.css'

const NoRoute = (props) => {
    const { routes } = props
    const history = useHistory()
    const gotoLogin = useCallback(() => {
        history.push(routes.login.generateRoute())
    }, [routes, history])

    return <div className={"no-route-container"}>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={< Button type="primary" onClick={gotoLogin} > Back Home</Button >}
        />
    </div>

}

export default NoRoute