import React from 'react';
import {
    createMuiTheme,
    createStyles, makeStyles,
    ThemeProvider,
    withStyles,
    WithStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import {routes, useFlatRoutes} from "./routes";
import {Redirect, Switch, Route} from "react-router-dom";
import {useRouteMatch} from "react-router";
import {useStyles} from "../assets/AdminStyles";


function AdminApp() {
    const classes = useStyles();
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
