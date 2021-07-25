import { inject, observer } from "mobx-react"
import Template from 'components/Template'
import AddName from 'components/AddName'
import DisaplyUser from 'components/DisplayUser'
import "./Dashboard.css"

const Dashboard = (props) => {
    const { sessionStore } = props;
    const { currentUser, setCurrentUser, updateUser } = sessionStore
    const userPhone = currentUser ? currentUser.phone : ""
    const userName = currentUser ? currentUser.name : ""

    const onNameAdd = async (values) => {
        const { userName } = values;
        const updateData = { name: userName }
        userPhone && (await updateUser(userPhone, updateData))
        setCurrentUser(updateData)
    }
    return <Template >
        {
            userName ? (
                <DisaplyUser name={userName} />
            ) : (
                <AddName onFinish={onNameAdd}></AddName>
            )
        }
    </Template>
}

export default inject('sessionStore')(observer(Dashboard))