import './DisplayUser.css'

const DisplayUser = (props) => {
    let { name } = props
    name = (name || "Someone")
    return <div className="user-display-container">Hello, {name}</div>
}

export default DisplayUser;