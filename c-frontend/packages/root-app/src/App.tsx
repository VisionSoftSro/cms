import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {WebRoot} from "@vision-soft/module-web/src/WebRoot";
import {AdminRoot} from "@vision-soft/module-admin/src/AdminRoot";


function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/admin" component={AdminRoot} />
                    <Route path="/" component={WebRoot} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
