import React from "react";
import {useLocation} from "react-router";
import useFetch from "use-http/dist";
import {useLoadingContext} from "../../context/LoadingContext";
import {Button} from "@material-ui/core";
import {Article} from "../../api/Article";

export function Articles() {
    const {pathname} = useLocation();
    const {loading, setLoading} = useLoadingContext();
    const {data} = useFetch<Article[]>({path:"/article"}, []);
    console.log(data);
    return (
        <div>
            <Button onClick={()=>setLoading(true)}>Loading</Button>
            {pathname}
            {data&&data.map(a=>a.name).join(",")}
        </div>
    );
}
