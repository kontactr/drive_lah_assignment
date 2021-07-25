import { Modal, Button, Form, Input, Checkbox, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import './AddFileModal.css'
import { DEFAULT_FILE_EXTENSION, DEFAULT_FILE_PATTERN, VALIDATION_MESSAGES } from 'config/constants'

const config = {
    title: "Create Session File",
    id: "create_session_file_form"
}

const AddFileModal = (props) => {
    const { visible = false, onCancel = () => { }, onFormSubmit = () => { }, onFileNameValidation = () => { } } = props

    return < Modal visible={visible}
        maskClosable={false}
        title={config.title}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={[
            <Button key="cancel" type="default" htmlType="submit" onClick={onCancel}>Cancel</Button>,
            <Button key="submit" type="primary" htmlType="submit" form={config.id}>Submit</Button>
        ]}>
        <Form
            name={config.id}
            initialValues={{ rememberAsCurrentSession: false }}
            onFinish={(values) => { onFormSubmit(values); onCancel(); }}
        >
            <div className="form-file-name-container">
                <Form.Item
                    className="form-item-file-name"
                    label={<div className="form-item-file-name-label">File Name</div>}
                    name="fileName"
                    hasFeedback
                    validateFirst
                    rules={[
                        { required: true, message: VALIDATION_MESSAGES.FILE_NAME_REQUIRE, whitespace: true },
                        {
                            pattern: DEFAULT_FILE_PATTERN, message: VALIDATION_MESSAGES.FILE_PATTERN_VALID
                        }, {
                            validateTrigger: "onSubmit",
                            validator: (_, fileName) => {
                                const error = onFileNameValidation(fileName);
                                if (error) {
                                    return Promise.reject(error.toString());
                                }
                                return Promise.resolve();

                            },
                        }]}
                >
                    <Input />
                </Form.Item>
                <Tooltip title={`Our extension is ${DEFAULT_FILE_EXTENSION}  and it will be automatically added`} color={"blue"} key={"blue"}>
                    <InfoCircleOutlined className="form-file-name-info-circle" />
                </Tooltip>
            </div>

            <div className="form-remember-current-session-container">
                <Form.Item name="rememberAsCurrentSession" valuePropName="checked">
                    <Checkbox >consider as a current session</Checkbox>
                </Form.Item>
            </div>
        </Form>

    </Modal >

}

export default AddFileModal;