import React from "react";
import {useLocation, useRouteMatch} from "react-router";
import DescriptionIcon from '@material-ui/icons/Description';
import {Articles} from "./page/Articles";
import {useAppContext} from "./context/admin/AppContext";
import {Dashboard} from "./page/Dashboard";

export type Route = {
    id:string,
    href:string,
    component?:any,
    icon:any,
    children?:Route[]
}

export const routes:Route[] = [
    {
        id: 'Dashboard',
        href: "/dashboard",
        component: Dashboard,
        icon: <DescriptionIcon/>
    },
    {
        id: 'Articles',
        href: "/articles",
        component: Articles,
        icon: <DescriptionIcon/>
    },
];

export const useProtectedRoutes = () => {
    const {user} = useAppContext();
    return routes;//.filter(hasRole)
};

export const useFlatRoutes = ():Route[] => {
    const navList = useProtectedRoutes();
    const children = navList.filter(n => n.children).map(n => n.children.map(s => ({
        ...s,
        href: `${n.href}${s.href}`
    })));
    const topLevel = navList.filter(n => !n.children);
    return [...topLevel, ...children.flat()];
};

export function useCurrentRoute() {
    const routes = useFlatRoutes();
    const {pathname} = useLocation();
    const {url} = useRouteMatch();
    const currentNav = useFlatRoutes().filter(cfg => `${url}${cfg.href}` === pathname);
    return currentNav.length === 0 ? routes[0] : currentNav[0];
}
