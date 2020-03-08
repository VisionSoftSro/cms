import * as React from "react";
import useFetch, {CachePolicies, Provider} from "use-http/dist";
import {useStyles} from "./AdminStyles";
import {AppBar, Button, Link, Toolbar} from "@material-ui/core";
import {useRouteMatch} from "react-router";
import {useAppContext} from "../context/admin/AppContext";
import {User} from "../api/admin/ApiTypes";
import {useState} from "react";


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

export function SleepTest() {
    const {data} = useFetch({path:"/sleep?ms=5000", cachePolicy:CachePolicies.NO_CACHE});
    console.log("Sleep", data);
    return <div>fetching</div>;
}

export function AdminApp() {
    const {url} = useRouteMatch();
    const {user} = useAppContext();
    const [test, setTest] = useState(false);
    return (
        <>
            <Header/>
            <a href={""} onClick={(e)=>{
                e.preventDefault();
                setTest(!test);
            }}>Klika</a>
            {test&&<SleepTest/>}
            {/*<Switch>*/}
            {/*<Route path={`${url}/r`} component={r}/>*/}
            {/*<Route path={`${url}/l`} component={l}/>*/}
            {/*<Route path={`${url}/*`} component={e}/>*/}
            {/*</Switch>*/}
        </>
    );
}
