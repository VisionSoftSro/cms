import * as React from "react";
import {PropsWithChildren, useContext, useEffect, useState} from "react";
import {PaletteType, ThemeProvider} from "@material-ui/core";
import * as LocalStorage from '@vision-soft/components/src/util/LocalStorage';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import theme from "../../AdminTheme";

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBarDesktop: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            zIndex: theme.zIndex.drawer + 1,
        },
        flexGrow: {
            flexGrow: 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        menuToolbar: {padding: "15px 20px"},
        nested: {
            paddingLeft: theme.spacing(4),
        },
        activeLink: {
            color: theme.palette.primary.light
        },
        headerLink: {
            color: theme.palette.primary.contrastText,
            '& a:hover': {
                color: "#90CAF9"
            }
        },
        invertTabs: {
            backgroundColor: "transparent !important"
        },
        tableHeader: {
            backgroundColor: theme.palette.type === 'dark' ? "#333333" : theme.palette.grey[100],
            color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900]
        },
        themeText: {
            color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900]
        },
        invertItem: {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        sectionDesktop: {
            marginTop: 8,
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)!important`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
            overflow: "auto"
        },
        contentIndent: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentIndentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);

const ThemeContext = React.createContext({} as {toggleTheme:VoidFunction, mode:PaletteType});
const StyleContext = React.createContext({} as {classes:Record<any, any>});

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const useStyleContext = () => {
    return useContext(StyleContext);
};

const MuiStyleContext = ({children}:PropsWithChildren<{}>) => {
    const classes = useStyles();
    return (
        <StyleContext.Provider value={{classes}}>
            {children}
        </StyleContext.Provider>
    );

};

export function MuiThemeContext({children}:PropsWithChildren<{}>) {
    const [mode, setMode] = useState<PaletteType>(    LocalStorage.get("mode") || "light");

    useEffect(()=>{
        LocalStorage.set("mode", mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode(mode === "light" ? "dark": "light")
    };
    return (
        <ThemeContext.Provider value={{toggleTheme, mode}}>
            <ThemeProvider theme={theme(mode)}>
                <MuiStyleContext>
                    {children}
                </MuiStyleContext>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
