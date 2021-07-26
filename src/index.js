import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RouteLoader from 'components/RouteLoader'
import PermissionWrapper from 'components/PermissionWrapper'
import store from 'stores'
import routes, { noRouteComponent } from 'config/routes'
import 'antd/dist/antd.css';
import './index.css';

configure({
  useProxies: "ifavailable",
  enforceActions: "always",
  reactionRequiresObservable: true,
})

const generateNoRoute = () => {
  const { component, exact } = noRouteComponent
  const Component = component
  return <Route exact={exact} render={(props) => {
    return <Component routes={routes} />
  }}></Route>
}


const generateReactRouter = () => {
  const allRoutes = Object.keys(routes)
  return <Router>
    <Switch>
      {allRoutes.map((route) => {
        const { path, exact } = routes[route]
        const Component = routes[route].component
        return <Route exact={exact} path={path} key={path} render={(props) => {
          return (<PermissionWrapper {...routes[route]} routes={routes} >
            <Component {...props} routes={routes}></Component>
          </PermissionWrapper>)
        }}>
        </Route>
      })}
      {generateNoRoute(routes)}
    </Switch>
  </Router>
}



ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<RouteLoader />}>
      <Provider {...store}>
        {generateReactRouter()}
      </Provider>
    </Suspense>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
