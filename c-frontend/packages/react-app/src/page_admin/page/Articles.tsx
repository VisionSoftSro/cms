import React from "react";
import {useLocation} from "react-router";
import useFetch from "use-http/dist";
import {useLoadingContext} from "../../context/LoadingContext";
import {Article} from "../../api/Article";
import {VSTable} from "@vision-soft/components";

export function Articles() {
    const {pathname} = useLocation();
    const {loading, setLoading} = useLoadingContext();
    const {data} = useFetch<Article[]>({path:"/article"}, []);
    console.log(data);
    return (
        <>
            {data&&<VSTable columns={[{field:"name", label:"name"}]} data={data}/>}
        </>
    );
}
