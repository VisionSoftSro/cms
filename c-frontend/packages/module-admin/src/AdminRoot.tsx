import * as React from "react";
import {CssBaseline} from "@material-ui/core";
import AdminApp from "./AdminApp";
import {AppContext} from "./context/admin/AppContext";
import {LoadingContext} from "@vision-soft/components/src";
import i18n from '@vision-soft/module-api/src/i18n';
import {MuiThemeContext} from "./context/admin/AdminThemeContext";

i18n();

export function AdminRoot() {
    return (
        <MuiThemeContext>
            <CssBaseline/>
            <LoadingContext>
                <AppContext>
                    <AdminApp />
                </AppContext>
            </LoadingContext>
        </MuiThemeContext>
    );
}
