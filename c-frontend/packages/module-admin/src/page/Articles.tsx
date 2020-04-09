import React from "react";
import {useLocation} from "react-router";
import useFetch from "use-http/dist";
import {VSTable} from "@vision-soft/components/src";
import {useLoadingContext} from "@vision-soft/components/src/context/LoadingContext";
import {Article} from "@vision-soft/api/src";

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
