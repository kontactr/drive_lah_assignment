import React from 'react';

export const noRouteComponent = {
    exact: true,
    component: React.lazy(() => import('pages/NoRoute')),
}

const routes = {
    sessionManagement: {
        path: "/session-management",
        exact: true,
        publicRoute: true,
        databasePublic: true,
        component: React.lazy(() => import('pages/SessionManagement')),
        generateRoute: () => {
            return "/session-management"
        }
    },
    login: {
        path: "/",
        exact: true,
        publicRoute: true,
        databasePublic: false,
        component: React.lazy(() => import('pages/Login')),
        generateRoute: () => {
            return "/"
        }
    },
    dashboard: {
        path: "/dashboard",
        exact: true,
        publicRoute: false,
        databasePublic: false,
        component: React.lazy(() => import('pages/Dashboard')),
        generateRoute: () => {
            return "/dashboard"
        }
    },
}

export default routes