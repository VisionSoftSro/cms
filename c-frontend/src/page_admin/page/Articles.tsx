import React from "react";
import {useLocation} from "react-router";
import useFetch from "use-http/dist";
import {useLoadingContext} from "../../context/LoadingContext";
import {Button, Paper} from "@material-ui/core";
import {Article} from "../../api/Article";
import {VSTable} from "../../components/VSTable";

export function Articles() {
    const {pathname} = useLocation();
    const {loading, setLoading} = useLoadingContext();
    const {data} = useFetch<Article[]>({path:"/article"}, []);
    console.log(data);
    return (
        <Paper>
            {data&&<VSTable columns={[{field:"name", label:"name"}]} data={data}/>}
        </Paper>
    );
}
