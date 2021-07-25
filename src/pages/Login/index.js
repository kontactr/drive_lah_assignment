import { useState } from 'react'
import { Form, Modal, Input, Button, Tooltip, Card } from 'antd'
import { useHistory } from 'react-router-dom'
import { DatabaseOutlined, ArrowLeftOutlined } from '@ant-design/icons'
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
        <div className="site-card-border-less-wrapper">
            <div className="card-container">
                <Card title={
                    <div className="card-title-container">
                        <div className="card-title-name">{sessionName}</div>
                        <Tooltip color="blue" title="Change Session">
                            <DatabaseOutlined className="card-title-database-icon-container" onClick={onChangeDatabaseClick} />
                        </Tooltip>
                    </div>
                }>


                    <Form
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
                                inputClass="login-phone-input"
                                enableSearch

                            />
                        </Form.Item>)}

                        {(STAGES.OTP === stage) && (
                            <div className="row-otp-container">
                                <Form.Item
                                    label="OTP"
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
                                    <Input.Password className="login-input-element" />
                                </Form.Item>

                                <Button type="default" className="regenerate-otp-button" onClick={onGetOtpClick}>
                                    Regenerate OTP
                        </Button>


                            </div>)
                        }

                        <div className="form-stage-buttons-container">
                            {(STAGES.OTP === stage) && <ArrowLeftOutlined className="form-stage-button-back-icon-container" onClick={onGoBack} />}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="next-step-button">
                                    {stage === STAGES.OTP ? "Submit" : "Next"}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Card >
            </div>
        </div >
    )
}

export default inject('sessionStore')(observer(Login));