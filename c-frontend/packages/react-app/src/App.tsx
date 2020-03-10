import React, {useEffect, useState} from 'react';
import {Provider} from 'use-http';

import {useTranslation} from "react-i18next";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory, useParams} from "react-router-dom";
import {WebRoot} from "./page_web/WebRoot";
import {AdminRoot} from "./page_admin/AdminRoot";

function App() {
    const {i18n} = useTranslation();
    return (
        <Router>
            <Switch>
                <Route path="/admin" component={AdminRoot} />
                <Route path="/" component={WebRoot} />
            </Switch>
        </Router>
    );
}

export default App;
