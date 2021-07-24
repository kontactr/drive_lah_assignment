import React from 'react';
import { scrollToTop } from 'utils/DomHelpers'
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom'
import './PermissionWrapper.css'

class PermissionWrapper extends React.Component {
    render() {
        const { routes } = this.props;
        const { sessionStore } = this.props;
        const { fileHandler, dirHandler, currentUser } = sessionStore;
        const { children, publicRoute, databasePublic } = this.props;

        if (fileHandler && dirHandler) {

            if (currentUser) {
                if (!publicRoute) {
                    return children;
                } else {
                    return <Redirect to={routes.dashboard.generateRoute()}></Redirect>
                }
            } else {
                if (publicRoute) {
                    return children;
                } else {
                    return <Redirect to={routes.login.generateRoute()}></Redirect>
                }

            }

        } else {
            if (databasePublic) {
                return children;
            } else {
                return <Redirect to={routes.sessionManagement.generateRoute()} ></Redirect>
            }
        }
    }

    componentDidMount() {
        scrollToTop()
    }
}

export default inject('sessionStore')(observer(PermissionWrapper))