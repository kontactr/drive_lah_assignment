import { notification } from 'antd';

export const generateNotification = ({ type, title, content }) => {
    if (type) {
        notification[type]({
            message: title,
            description: content,
        })
        return true;
    }
    return false;
}
