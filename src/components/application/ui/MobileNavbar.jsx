import React from 'react'
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

const MobileNavbar = ({handleIsOpenMobileSidebar, history}) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    
    const handleOpenSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
        handleIsOpenMobileSidebar(!isOpenSidebar);
    }

    history.listen(() => {
        setIsOpenSidebar(false);
        handleIsOpenMobileSidebar(false);
    })

    return (
        <React.Fragment>
            <h3>Trail</h3>
            <div className="menu-icon" onClick={handleOpenSidebar}>
                <span className={ isOpenSidebar ? "hamburger-1-close" : "hamburger-1" }></span>
                <span className={ isOpenSidebar ? "hamburger-2-close" : "hamburger-2" }></span>
                <span className={ isOpenSidebar ? "hamburger-3-close" : "hamburger-3" }></span>
            </div>
        </React.Fragment>
    )
}

export default withRouter(MobileNavbar)
