import React, {useContext, useEffect, useReducer, useState} from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer, {DrawerProps} from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Omit} from '@material-ui/types';
import {useTranslation} from "react-i18next";
import {useHistory, useLocation, useRouteMatch} from "react-router";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar, {AppBarProps} from "@material-ui/core/AppBar";


import {Collapse, Grid, Hidden, Typography} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Route, useCurrentRoute, useProtectedRoutes} from "./routes";
import {Header} from "./Header";
import {useStyleContext} from "./context/admin/AdminThemeContext";


export interface FlexibleDrawerProps extends Omit<DrawerProps, 'classes'> {}
export interface FlexibleAppBarProps extends Omit<AppBarProps, 'classes'> {
    handleDrawerToggle?:VoidFunction
}

type ListLinkProps = Route&{nested?:boolean};
enum ActionType {CloseAll}
type State = {isOpen: boolean};
type Action = {type:ActionType};
const SidebarContext = React.createContext<{state:State, dispatch:(action:Action) => void}>(null);
function reducer(state:State, action:Action) : State {
    if (action.type === ActionType.CloseAll) {
        return {...state, ...{isOpen:!state.isOpen}};
    }
    return state;
}

const useClose = (defaultValue:boolean):[boolean, (value:boolean)=>void] => {
    const {state} = useContext(SidebarContext);
    const [opened, setOpened] = useState(defaultValue);
    useEffect(()=>{
        if(state.isOpen !== null) {
            setOpened(false);
        }
    }, [state.isOpen]);
    return [opened, setOpened];
};
function CategoryList({parent, component}:{parent:Route, component:React.ComponentType<ListLinkProps>}) {
    const ListLink = component;
    const routes = parent.children;
    const {t} = useTranslation();
    const {classes} = useStyleContext();
    const {pathname} = useLocation();
    const [open, setOpen] = useClose(false);
    return (
        <>
            <ListItem button
                      onClick={()=>setOpen(!open)}
                      className={clsx(pathname.startsWith(parent.href)&&classes.activeLink||undefined)}>
                <ListItemIcon>{parent.icon}</ListItemIcon>
                <ListItemText primary={t(parent.id)} /> {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto">
                {routes.map((child) => (
                    <ListLink {...child} href={parent.href+child.href} key={child.id} nested />
                ))}
            </Collapse>
        </>
    );
}

function FlexibleDrawer(props:FlexibleDrawerProps) {
    const routes = useProtectedRoutes();
    const {classes} = useStyleContext();
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const {url} = useRouteMatch();
    const {push} = useHistory();
    const ListLink = ({id: childId, icon, href, nested=false}:ListLinkProps) => {
        const fullHref = `${url}${href}`;
        return (
            <ListItem
                className={clsx(nested&&classes.nested||undefined, `${fullHref}`===pathname&&classes.activeLink||undefined)}
                key={childId}
                button
                component="a"
                onClick={(e:any)=>{e.preventDefault();push(`${fullHref}`);}}
                href={fullHref}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={t(childId)}/>
            </ListItem>
        );
    };

    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            {...props}
        >
            <div className={clsx(classes.menuToolbar, classes.toolbar)}>
                Smer server
            </div>
            {routes.map((parent) => (
                <React.Fragment key={parent.id}>
                    {
                        !parent.children&&(
                            <ListLink {...parent} href={parent.href} key={parent.id} />
                        )
                    }
                    {parent.children&&<CategoryList parent={parent} component={ListLink} />}
                    <Divider/>
                </React.Fragment>
            ))}
        </Drawer>
    );
}

function FlexibleAppBar({handleDrawerToggle, ...props}:FlexibleAppBarProps) {
    const {classes} = useStyleContext();
    const {t} = useTranslation();
    return (
        <div className={classes.flexGrow}>
            <AppBar position="fixed" {...props}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Hidden smUp>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography>
                            {t(useCurrentRoute().id)}
                        </Typography>
                        <div className={classes.flexGrow}/>
                        <Header />
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default function Navigator() {
    const {classes} = useStyleContext();
    const [state, dispatch] = useReducer(reducer, {isOpen: false});
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    return (
        <SidebarContext.Provider value={{ state, dispatch }}>
            <Hidden smUp implementation="js">
                <FlexibleAppBar className={clsx(classes.appBar)} handleDrawerToggle={handleDrawerToggle} />
                <FlexibleDrawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                />
            </Hidden>
            <Hidden xsDown implementation="css">
                <FlexibleAppBar className={clsx(classes.appBar, classes.appBarDesktop)} />
                <FlexibleDrawer />
            </Hidden>
        </SidebarContext.Provider>
    );
}
