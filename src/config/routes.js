import React from 'react';

const routes = {
    sessionManagement: {
        path: "/session-management",
        publicRoute: true,
        databasePublic: true,
        component: React.lazy(() => import('pages/SessionManagement')),
        generateRoute: () => {
            return "/session-management"
        }
    },
    login: {
        path: "/login",
        publicRoute: true,
        databasePublic: false,
        component: React.lazy(() => import('pages/Login')),
        generateRoute: () => {
            return "/login"
        }
    },
    dashboard: {
        path: "/dashboard",
        publicRoute: false,
        databasePublic: false,
        component: React.lazy(() => import('pages/Login')),
        generateRoute: () => {
            return "/dashboard"
        }
    }
}

export default routes