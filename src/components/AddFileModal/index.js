import { Modal, Button, Form, Input, Checkbox, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import './AddFileModal.css'
import { DEFAULT_FILE_PATTERN } from 'config/constants'

const config = {
    title: "Create Session File",
    id: "create_session_file_form"
}

const AddFileModal = (props) => {
    const { visible = false, onCancel = () => { }, onFormSubmit = () => { }, onFileNameValidation = () => { } } = props

    return < Modal visible={visible}
        title={config.title}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={[
            <Button key="cancel" type="default" htmlType="submit" onClick={onCancel}>Cancel</Button>,
            <Button key="submit" type="primary" htmlType="submit" form={config.id}>Submit</Button>
        ]}>
        <Form
            name={config.id}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ rememberAsCurrentSession: false }}
            onFinish={(values) => { onFormSubmit(values); onCancel(); }}
        >
            <Form.Item
                label="File Name"
                name="fileName"
                hasFeedback
                validateFirst
                rules={[
                    { required: true, message: 'Please input file name!', whitespace: true },
                    {
                        pattern: DEFAULT_FILE_PATTERN, message: '[0-9a-zA-Z_-. ]!'
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
            <Tooltip title="Our extension is .txt and it is automatically added" color={"blue"} key={"blue"}>
                <InfoCircleOutlined />
            </Tooltip>

            <Form.Item name="rememberAsCurrentSession" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
                <Checkbox>consider as a current session</Checkbox>
            </Form.Item>
        </Form>

    </Modal >

}

export default AddFileModal;