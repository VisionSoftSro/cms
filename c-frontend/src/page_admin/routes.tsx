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

export const routes = [
    {
        id: 'Develop',
        children: [
            { id: 'Authentication', icon: <PeopleIcon />, href:"/article", component:Articles},
            { id: 'Database', icon: <DnsRoundedIcon />, href:"/article2", component:Articles},
            { id: 'Storage', icon: <PermMediaOutlinedIcon />, href:"/article3", component:Articles},
            { id: 'Hosting', icon: <PublicIcon />, href:"/article4", component:Articles},
            { id: 'Functions', icon: <SettingsEthernetIcon />, href:"/article5", component:Articles},
            { id: 'ML Kit', icon: <SettingsInputComponentIcon />, href:"/article6", component:Articles},
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
