import { useState } from 'react'
import { Form, Modal, Input, Button, Divider, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { DatabaseOutlined } from '@ant-design/icons'
import { generateOTP } from 'utils/Helpers'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './Login.css'
import { inject, observer } from 'mobx-react'


const config = {
    DEFAULT_COUNTRY: 'us'
}

const STAGES = {
    INIT: 0,
    OTP: 1,
}

const Login = (props) => {

    const { sessionStore } = props
    const { fileHandler } = sessionStore
    const sessionName = fileHandler ? fileHandler.name : "aaa"

    const [generatedOtp, setGeneratedOtp] = useState(undefined)
    const [stage, setStage] = useState(STAGES.INIT)
    const [phone, setPhone] = useState(undefined)

    const history = useHistory()

    const onChangeDatabaseClick = () => {
        const { routes } = props
        const route = routes.sessionManagement.generateRoute()
        history.push(route)
    }

    const gotoDashboard = () => {
        const { routes } = props
        const route = routes.dashboard.generateRoute()
        history.push(route)
    }

    const onGoBack = () => {
        setStage(STAGES.INIT)
    }

    const onGetOtpClick = () => {
        const newOtp = generateOTP();
        Modal.success({
            title: 'OTP number',
            content: (
                <div>
                    <div>Please copy this OTP for further proceed.</div>
                    <div>Your OTP is {newOtp}</div>
                </div>

            ),
            closable: true,
        });
        setGeneratedOtp(newOtp);
    }

    const onInitStagecomplete = (values) => {
        const { phone } = values
        setStage(STAGES.OTP)
        setPhone(phone)
        onGetOtpClick();
    }

    const onOtpStageComplete = async (values) => {
        const { checkIfUserExist, setCurrentUser, addNewUser } = sessionStore
        let user = checkIfUserExist(phone);
        if (!Boolean(user)) {
            user = await addNewUser({ phone, name: "" })
        }
        setCurrentUser(user);
        gotoDashboard();

    }

    const formFinish = (values) => {
        if (stage === STAGES.INIT) {
            onInitStagecomplete(values);
        } else if (stage === STAGES.OTP) {
            onOtpStageComplete(values);
            //onGetOtpClick()
        } else {
            // no op
        }
    }

    return (
        <div style={{
            marginTop: "250px",
            marginLeft: "700px",
            width: "500px"
        }}>
            <div>
                <div>{sessionName}</div>
                <Tooltip color="blue" title="Change Database">
                    <DatabaseOutlined style={{ cursor: "pointer" }} onClick={onChangeDatabaseClick} />
                </Tooltip>
            </div>

            <Divider type="horizontal"  ></Divider>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ phone }}
                onFinish={formFinish}
            >
                {(STAGES.INIT === stage) && (<Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phonenumber!', whitespace: true, }]}
                >
                    <PhoneInput
                        country={config.DEFAULT_COUNTRY}
                    />
                </Form.Item>)}

                {(STAGES.OTP === stage) && (
                    <>
                        <Form.Item
                            label="Otp"
                            name="otp"
                            validateFirst
                            rules={[{ required: true, message: 'Please input your otp!', whitespace: true, }, {
                                validateTrigger: "onSubmit",
                                validator: (_, value) => {
                                    if (generatedOtp && value === generatedOtp) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject("Please enter valid otp!")
                                }
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Button type="primary" onClick={onGetOtpClick}>
                            Regenerate OTP
                        </Button>
                        <Button type="primary" onClick={onGoBack}>
                            Go Back
                        </Button>
                    </>)
                }

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {stage === STAGES.OTP ? "Submit" : "Next"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject('sessionStore')(observer(Login));