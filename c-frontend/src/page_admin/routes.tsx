import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import SettingsIcon from "@material-ui/icons/Settings";
import TimerIcon from "@material-ui/icons/Timer";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import React from "react";
import {Articles} from "./page/Articles";
import {useLocation, useRouteMatch} from "react-router";
import CategoryIcon from '@material-ui/icons/Category';
import DescriptionIcon from '@material-ui/icons/Description';
export const routes = [
    {
        id: 'Codebook',
        children: [
            { id: 'Articles', icon: <DescriptionIcon />, href:"/article", component:Articles},
            { id: 'Categories', icon: <CategoryIcon />, href:"/category", component:Articles}
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', icon: <SettingsIcon />, href:"/article7", component:Articles},
            { id: 'Performance', icon: <TimerIcon />, href:"/article8", component:Articles},
            { id: 'Test Lab', icon: <PhonelinkSetupIcon />, href:"/article9", component:Articles},
        ],
    },
];

export const useFlatRoutes = () => {
    return routes.map(r=>r.children).flat();
};

export function useCurrentRoute() {
    const routes = useFlatRoutes();
    const {pathname} = useLocation();
    const {url} = useRouteMatch();
    console.log("useCurrentRoute", pathname);
    const currentNav = routes.filter(cfg=> `${url}${cfg.href}` === pathname);
    return currentNav.length === 0 ? routes[0] : currentNav[0];
}
