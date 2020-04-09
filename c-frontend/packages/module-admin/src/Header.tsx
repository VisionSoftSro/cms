import React, {ReactNode, useState} from "react";
import Link from "@material-ui/core/Link";
import {Box} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useAppContext} from "./context/admin/AppContext";


interface DropdownProps {
    icon:ReactNode,
    popupComponent:React.ComponentType<any>,
    render:(handleClose:VoidFunction)=>ReactNode[]|ReactNode
}
function Dropdown({icon, render, popupComponent}:DropdownProps) {
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
            <Link
                onClick={handleMenu}
                color="inherit"
                href={"#"}
                variant="body2"
            >
                {icon}
            </Link>
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



const margin = 2;
export function Header() {
    const {t} = useTranslation();
    const {logout} = useAppContext();

    return (
        <>
            <Box ml={margin}>
                <Link href="#" onClick={(e:any)=> {
                    e.preventDefault();
                    logout();
                }} variant="body2" color={"inherit"}>
                    <ExitToAppIcon/>
                </Link>
            </Box>
        </>
    );
}
