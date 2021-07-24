import { Button, Divider } from "antd";
import AddName from 'components/AddName'
import { useHistory } from 'react-router-dom'
import { inject, observer } from "mobx-react"
import "./Dashboard.css"

const Dashboard = (props) => {
    const history = useHistory()
    const { sessionStore, routes } = props;
    const { currentUser, setCurrentUser, updateUser, resetUser } = sessionStore


    const userPhone = currentUser ? currentUser.phone : ""
    const userName = currentUser ? currentUser.name : ""


    const onNameAdd = async (values) => {
        const { userName } = values;
        const updateData = { name: userName }
        userPhone && (await updateUser(userPhone, updateData))
        setCurrentUser(updateData)
    }

    const onLogout = () => {
        resetUser()
        history.push(routes.login.generateRoute())
    }

    return <div>
        <Divider>Dashboard</Divider>
        <div>{`Hello, ${userName || 'User'}`}</div>
        {!userName && <AddName onFinish={onNameAdd} />}
        <Button onClick={onLogout}>Logout</Button>

    </div>
}

export default inject('sessionStore')(observer(Dashboard))