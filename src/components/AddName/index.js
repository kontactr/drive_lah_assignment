import { Form, Input, Button } from 'antd'
import './AddName.css'

const AddName = (props) => {

    const { onFinish = () => { } } = props

    return <div>
        <Form name="add_name"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="userName"
                wrapperCol={{ offset: 0, span: 8 }}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
            </Form.Item>
        </Form>
    </div>
}

export default AddName;