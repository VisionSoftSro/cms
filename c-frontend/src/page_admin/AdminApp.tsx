import * as React from "react";
import {Provider} from "use-http/dist";
import {useStyles} from "./AdminStyles";
import {AppBar, Toolbar} from "@material-ui/core";
import {useRouteMatch} from "react-router";
import {useAppContext} from "../context/admin/AppContext";


function Header() {
    // const {push} = useHistory();
    const classes = useStyles();
    return (
        <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                {/*<img src={require("./assets/images/logo.png")} alt={"logo"}/>*/}
                <div className={classes.toolbarButtons}>

                </div>
            </Toolbar>
        </AppBar>
    );
}


export function AdminApp() {
    const {url} = useRouteMatch();
    const {user} = useAppContext();
    return (
        <>
            <Header/>
            {/*<Switch>*/}
            {/*<Route path={`${url}/r`} component={r}/>*/}
            {/*<Route path={`${url}/l`} component={l}/>*/}
            {/*<Route path={`${url}/*`} component={e}/>*/}
            {/*</Switch>*/}
        </>
    );
}
