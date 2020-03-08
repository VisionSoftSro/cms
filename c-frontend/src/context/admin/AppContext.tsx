import * as React from "react";
import {useContext, useEffect, useState} from "react";
import useFetch, {CachePolicies, Provider} from "use-http/dist";
import {Token, User} from "../../api/admin/ApiTypes";
import LoginPage from "../../page_admin/LoginPage";
import {useLoadingContext} from "../LoadingContext";
import * as LocaleStorage from "../../util/LocalStorage";

type DataState = {
    user:User
}
type AppState = {
    logout:VoidFunction
} & DataState
const Context = React.createContext({} as AppState);

export function useAppContext() {
    return useContext(Context);
}

function UserContext({children, setUser}:React.PropsWithChildren<{setUser:(user:User)=>void}>) {
    const {setLoading} = useLoadingContext();
    const {logout, user} = useAppContext();
    const {data, loading, error} = useFetch<User>({path:`/user`}, []);
    useEffect(() => {
        setLoading(true);
        if(error) {
            logout();
        } else if(data) {
            setUser(data);
        }
        setLoading(false);
    }, [data, error]);
    return (
        <>
            {
                user&&(
                    children
                )||null
            }
        </>
    );
}
const tokenStorageKey = "token";
export function AppContext({children}:React.PropsWithChildren<{}>) {
    const [token, setTokenLocally] = useState(()=>LocaleStorage.get<Token>(tokenStorageKey));
    const [user, setUser] = useState(null as User);
    useEffect(()=>{
        if(token === null) {
            setUser(null);
            LocaleStorage.remove(tokenStorageKey);
        } else {
            LocaleStorage.set(tokenStorageKey, token);
        }
    }, [token]);

    const logout = () => {
        setTokenLocally(null);
    };

    const setToken = (token:Token) => {
        setTokenLocally(token);
    };

    return (
        <Context.Provider value={{user, logout}}>
            {token&&(
                <Provider url='/api/admin' options={{
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token.access_token}`
                    },
                    cachePolicy:CachePolicies.NO_CACHE,
                    interceptors: {
                        response:response => {
                            if(response.status === 401) {
                                setTimeout(()=>setTokenLocally(null), 1);
                                return null;
                            }
                            return response;
                        }
                    }
                }}>
                    <UserContext setUser={setUser}>
                        {children}
                    </UserContext>
                </Provider>
            )||(
                <LoginPage setToken={setToken}/>
            )}
        </Context.Provider>
    );
}
