import React from 'react'
import WithTitle from '../../hoc/WithTitle';
import '../styles/NotFoundPage.scss'

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <div>
                <h1>404</h1>
                <h3>Page Not Found</h3>
            </div>
        </div>
    )
}

export default WithTitle({component: NotFoundPage, title: '404'})
