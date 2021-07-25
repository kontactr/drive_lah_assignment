import PropTypes from 'prop-types';
import { Form, Input, Button, Divider, Card } from 'antd'
import { DEAFULT_NAME_PATTERN, PLACEHOLDERS, VALIDATION_MESSAGES } from 'config/constants'
import './AddName.css'

const AddName = (props) => {

    const { onFinish = () => { } } = props

    return <div className="add-name-form-container">
        <div className="add-name-user-greeting">
            Hello, User
        </div>
        <Divider className="add-name-fg-divider"></Divider>

        <div className="add-name-form">
            <Card>
                <div>Add Name Form</div>
                <Divider></Divider>
                <Form name="add_name"
                    onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className="add-name-form-item"
                        label="Name"
                        name="userName"
                        hasFeedback
                        validateFirst
                        rules={[{ required: true, message: VALIDATION_MESSAGES.USER_REQUIRE, whitespace: true }, {
                            pattern: DEAFULT_NAME_PATTERN, message: VALIDATION_MESSAGES.USER_PATTERN_VALID
                        }]}
                    >
                        <Input placeholder={PLACEHOLDERS.USER_NAME} />
                    </Form.Item>

                    <div className="add-name-form-buttons-container">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="add-name-form-submit-button">
                                Save Name
                            </Button>

                        </Form.Item>
                    </div>
                </Form>
            </Card>
        </div>
    </div >
}

AddName.propTypes = {
    onFinish: PropTypes.func
}

export default AddName;