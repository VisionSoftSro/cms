import React, {useContext, useEffect, useReducer, useState} from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer, {DrawerProps} from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Omit} from '@material-ui/types';
import {useTranslation} from "react-i18next";
import {useHistory, useLocation} from "react-router";
import {Route, useCurrentRoute, useProtectedRoutes} from "./routes";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar, {AppBarProps} from "@material-ui/core/AppBar";

import {Hidden, Typography} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {Header} from "./Header";
import {useStyleContext} from "./context/admin/AdminThemeContext";
import {AssetCache} from "@vision-soft/module-api/src";
import {useRouteMatch} from 'react-router-dom';

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
            {
                open&&
                routes.map((child) => (
                    <ListLink {...child} href={parent.href+child.href} key={child.id} nested />
                ))
            }
        </>
    );
}

function FlexibleDrawer(props:FlexibleDrawerProps) {
    const routes = useProtectedRoutes();
    const {classes} = useStyleContext();
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const {push} = useHistory();
    const {url} = useRouteMatch();
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
                <img src={AssetCache.Image.Logo} alt={"logo"} style={{ width: 50 }}/>
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
        <AppBar position="fixed" {...props}>
            <Toolbar variant={"regular"}>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
                <Typography>
                    {t(useCurrentRoute().id)}
                </Typography>
                <div className={classes.flexGrow}/>
                <Header />
            </Toolbar>
        </AppBar>
    );
}

export default function Navigator() {
    const {classes} = useStyleContext();
    //reducer slouzi pro zavirani polozek menu nikAoliv pro cely drawer
    const [state, dispatch] = useReducer(reducer, {isOpen: false});

    const [openMobile, setOpenMobile] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    const handleDrawerToggleMobile = () => {
        setOpenMobile(!openMobile);
    };
    return (
        <>
            <SidebarContext.Provider value={{ state, dispatch }}>
                <Hidden smUp implementation="js">
                    <FlexibleAppBar className={clsx(classes.appBar)} handleDrawerToggle={handleDrawerToggleMobile} />
                    <FlexibleDrawer
                        variant="temporary"
                        open={openMobile}
                        onClose={handleDrawerToggleMobile}
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <FlexibleAppBar className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })} handleDrawerToggle={handleDrawerToggle} />
                    <FlexibleDrawer
                        variant={"persistent"}
                        open={open}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <div className={clsx(classes.contentIndent, {
                    [classes.contentIndentShift]: open,
                })}/>
            </SidebarContext.Provider>
        </>
    );
}
