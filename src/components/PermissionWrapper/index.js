import React from 'react';
import './PermissionWrapper.css'
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom'

class PermissionWrapper extends React.Component {
    render() {
        const { routes } = this.props;
        const { sessionStore } = this.props;
        const { fileHandler } = sessionStore;
        const { children, publicRoute, databasePublic } = this.props;

        if (fileHandler) {
            if (publicRoute) {
                return children;
            } else {
                return <Redirect to={routes.login.generateRoute()}></Redirect>
            }

        } else {
            if (databasePublic) {
                return children;
            } else {
                return <Redirect to={routes.sessionManagement.generateRoute()} ></Redirect>
            }
        }

    }
}

export default inject('sessionStore')(observer(PermissionWrapper))