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
    // {
    //     id: 'Assign',
    //     href: "/zadat",
    //     icon: <DescriptionIcon/>,
    //     children: [
    //         {href: "/vlastnivozy", component: Articles, icon: <DescriptionIcon />, id: "DialVlastniVozy"},
    //         {href: "/prepravy", component: Articles, icon: <DescriptionIcon />, id: "DialPrepravy"}
    //     ],
    // },
    // {
    //     id: 'Dials',
    //     href: "/ciselniky",
    //     icon: <DescriptionIcon/>,
    //     children: [
    //         {href: "/uzivatele", component: UzivatelCiselnik, icon: <DescriptionIcon />, id: "DialUsers"},
    //         {href: "/licence", component: LicenceCiselnik, icon: <DescriptionIcon />, id: "DialLicence"},
    //         {href: "/provozovny", component: ProvozovnaCiselnik, icon: <DescriptionIcon />, id: "DialPlaces"},
    //         {href: "/firmy", component: FirmaCiselnik, icon: <DescriptionIcon />, id: "DialCompanies"},
    //         {href: "/dispeceri", component: DispeceriCiselnik, icon: <DescriptionIcon />, id: "DialDispeceri"},
    //         {href: "/texty", component: TextyCiselnik, icon: <DescriptionIcon />, id: "LocalizedTexts"},
    //         {href: "/staty", component: StatCiselnik, icon: <DescriptionIcon />, id: "DialCountries"},
    //         {href: "/meny", component: CurrencyCiselnik, icon: <DescriptionIcon />, id: "DialCurrencies"},
    //         {href: "/nezadouciSlova", component: NezadouciSlovaCiselnik, icon: <DescriptionIcon />, id: "DialNezadouciSlova"},
    //         {href: "/hlidanaSlovaFirma", component: HlidanaSlovaCiselnik, icon: <DescriptionIcon />, id: "DialHlidanaSlova"},
    //         {href: "/parametry", component: SystemParameterCiselnik, icon: <DescriptionIcon />, id: "DialParams"},
    //         {href: "/joby", component: JobCiselnik, icon: <DescriptionIcon />, id: "DialJobs"}
    //     ]
    // },
];

export const useProtectedRoutes = () => {
    const {user} = useAppContext();
    // const hasRole = (r: Route) => {
    //     const roles = r.roles || [];
    //     if (roles.length === 0) return true;
    //     for (let i in roles) {
    //         if (user.roles.includes(roles[i])) return true
    //     }
    //     return false;
    // };
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
