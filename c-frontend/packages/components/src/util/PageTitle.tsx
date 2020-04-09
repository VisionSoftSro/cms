import Helmet from "react-helmet";
import React from 'react';

export function PageTitle({title, template}:{title:string, template?:string}) {
    return (
        <Helmet defaultTitle="React App" titleTemplate={template}>
            <title>{title}</title>
        </Helmet>
    );
}
