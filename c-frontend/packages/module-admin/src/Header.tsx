import React, {Component, forwardRef, ReactNode, useState} from "react";
import Link from "@material-ui/core/Link";
import {Box, IconButton, Menu, MenuItem} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import {useTranslation} from "react-i18next";
import MoreIcon from '@material-ui/icons/MoreVert';
import {useStyleContext, useThemeContext} from "./context/admin/AdminThemeContext";
import {useAppContext} from "./context/admin/AppContext";

interface DropdownProps {
    icon:ReactNode,
    text?:string,
    showText?:boolean,
    popupComponent:React.ComponentType<any>,
    render:(handleClose:VoidFunction)=>ReactNode[]|ReactNode
}

function IconButtonWithText({icon, text, onClick, showText=false}: {icon:ReactNode,text?:string, onClick:(event: React.MouseEvent<HTMLElement>)=>void, showText?:boolean}) {
    return (
        <div style={{
            display: 'inline-flex',
            verticalAlign: 'text-bottom',
            boxSizing: 'inherit',
            textAlign: 'center',
            alignItems: 'center'
        }}>
            <Link href={"#"} onClick={onClick} variant="body2" color={"inherit"}>
                <IconButton
                    onClick={onClick}
                    color="inherit"
                >
                    {icon}
                </IconButton>
                {showText&&text}
            </Link>
        </div>
    );
}
function Dropdown({icon, render, popupComponent, text, showText}:DropdownProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const Component = popupComponent;
    return (
        <div>
            <IconButtonWithText icon={icon} text={text} onClick={handleMenu} showText={showText}/>
            <Component
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                {render(handleClose)}
            </Component>
        </div>
    );
}

type ButtonProps = {
    showText:boolean
}





function ModeSwitcherButton({showText}:ButtonProps) {
    const {toggleTheme, mode} = useThemeContext();
    const {t} = useTranslation();
    return (
        <IconButtonWithText icon={mode==="light"?<DarkModeIcon/>:<LightModeIcon />} onClick={event => {
            event.preventDefault();
            toggleTheme();
        }} showText={showText} text={t(mode)}/>
    );
}

function LogoutButton() {
    const {logout} = useAppContext();
    const {t} = useTranslation();
    return (
        <IconButtonWithText icon={<ExitToAppIcon />} onClick={event => {
            event.preventDefault();
            logout();
        }} text={t("Logout")} showText={false}/>
    );
}


const Buttons = forwardRef<{}, {mobile?:boolean, wrap:(node:ReactNode)=>ReactNode}>(({wrap, mobile=false}, ref) => {
    return (
        <>
            {wrap(<ModeSwitcherButton showText={mobile}/>)}
            {!mobile&&wrap(<LogoutButton />)}
        </>
    );
});


export function Header() {
    const {classes} = useStyleContext();

    return (
        <>
            <div className={classes.sectionDesktop}>
                <Buttons wrap={node => (<Box className={classes.headerLink}>{node}</Box>)}/>
            </div>
            <div className={classes.sectionMobile}>
                <LogoutButton />
                <Dropdown icon={<MoreIcon />} render={()=>(
                    <Buttons mobile wrap={node =><MenuItem onClick={event => {}}>{node}</MenuItem>} />
                )} popupComponent={Menu} />
            </div>
        </>
    );
}
