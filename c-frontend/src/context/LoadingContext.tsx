import * as React from "react";
import {useContext} from "react";
import {useState} from "react";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const Context = React.createContext({} as {loading:boolean, setLoading:(show:boolean)=>void});

export function useLoadingContext() {
    return useContext(Context);
}

// @ts-ignore
const useStyles = makeStyles(theme => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            position:"absolute"
        }
    }));

export function LoadingContext({children}:React.PropsWithChildren<{}>) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    return (
        <Context.Provider value={{loading, setLoading}}>
            {children}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Context.Provider>
    );
}
