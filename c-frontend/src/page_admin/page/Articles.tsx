import React from "react";
import {useLocation} from "react-router";

export function Articles() {
    const {pathname} = useLocation();
    return (
        <div>
           {pathname}
        </div>
    );
}
