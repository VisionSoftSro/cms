import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from './Navigator';
import {useFlatRoutes} from "./routes";
import {Redirect, Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {useStyleContext} from "./context/admin/AdminThemeContext";


function AdminApp() {
    const {classes} = useStyleContext();
    const {url} = useRouteMatch();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navigator />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    {useFlatRoutes().map(route=>(<Route key={route.href} path={`${url}${route.href}`} component={route.component}/>))}
                    <Redirect from={`${url}`} to={`${url}/article`} />
                </Switch>
            </main>
        </div>
    );
}

export default AdminApp;
