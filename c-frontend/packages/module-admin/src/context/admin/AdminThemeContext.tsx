import * as React from "react";
import {PropsWithChildren, useContext, useEffect, useState} from "react";
import {PaletteType, ThemeProvider} from "@material-ui/core";
import * as LocalStorage from '@vision-soft/components/src/util/LocalStorage';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import theme from "../../assets/AdminTheme";

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
            flexGrow:1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
            overflow:"auto"
        },
        toolbar: theme.mixins.toolbar,
        menuToolbar:{padding: "10px 35px"},
        nested: {
            paddingLeft: theme.spacing(4),
        },
        activeLink: {
            color: theme.palette.primary.light
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
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
