import PropTypes from 'prop-types';
import './DisplayUser.css'

const DisplayUser = (props) => {
    let { name } = props
    name = (name || "Someone")
    return <div className="user-display-container">Hello, {name}</div>
}

DisplayUser.propTypes = {
    name: PropTypes.string
}

export default DisplayUser;