import React from 'react'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import { useState } from 'react';
import { useEffect } from 'react';

const TitleComponent = ({ title }) => {
    const [dynamicTitle, setdynamicTitle] = useState('Web app');

    useEffect(() => {
        setdynamicTitle(title)
    }, [title])
    
    return (
        <HelmetProvider>
            <Helmet >
                <title> {`Trail | ${dynamicTitle}`} </title>
            </Helmet>
        </HelmetProvider>
    )
}

const WithTitle = ({ component: Component, title }) => (props) => {
    return (
        <React.Fragment>
            <TitleComponent title={title} />
            <Component {...props} />
        </React.Fragment>
    )
}

export default WithTitle
