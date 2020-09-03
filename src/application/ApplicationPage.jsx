import React from 'react'
import './Application.scss'
import { Route, Redirect, Switch } from 'react-router-dom';
import DashboardPage from './components/pages/DashboardPage';
import ProfilePage from './components/pages/ProfilePage';
import SettingsPage from './components/pages/SettingsPage';
import { isMobile } from 'react-device-detect'
import LeftNavbar from './components/ui/LeftNavbar';
import BillingPage from './components/pages/BillingPage';
import TopNavbar from './components/ui/TopNavbar';
import { useState } from 'react';
import Footer from './components/ui/Footer';
import jwtDecode from 'jwt-decode'


const ApplicationPage = ({match, location, authToken, handleUpdateToken}) => {
    const {path, url} = match;

    const userDetails = authToken === null ? {} : jwtDecode(authToken);

    const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(null);
    const handleIsOpenMobileSidebar = (value) => {
        setIsOpenMobileSidebar(value);
    }

    // do not allow unauthorised users acess this page
    if (authToken === null) {
        return <Redirect to={{ pathname: '/signin', state: {from: location} }}/>
    }

    return (
        <div className="application-wrapper">
            <div className= {isMobile ? "mobile" : "desktop"}>
                <div className= { isMobile ? '' : "left"}>
                    <LeftNavbar 
                        url={url} 
                        location={location}
                        userDetails={userDetails} 
                        isOpenMobileSidebar={isOpenMobileSidebar} />
                </div>

                <div className={isMobile ? '' : 'right'}>
                    <TopNavbar 
                        url={url} 
                        handleIsOpenMobileSidebar={handleIsOpenMobileSidebar} 
                        location={location} />

                    <div className="content">
                        <Switch>
                            <Route exact path={path} render={() => <Redirect to={`${path}/dashboard`}/> } />
                            <Route path={`${path}/dashboard`} render={() => <DashboardPage handleUpdateToken={handleUpdateToken} userDetails={userDetails} />}/>
                            <Route path={`${path}/profile`} render={()=> <ProfilePage userDetails={userDetails}/>}/>
                            <Route path={`${path}/settings`} render={()=> <SettingsPage/>}/>
                            <Route path={`${path}/billing`} render={()=> <BillingPage handleUpdateToken={handleUpdateToken} userDetails={userDetails} />}/>
                            <Route path="*" render={()=><Redirect to="/404"/>} />
                        </Switch>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ApplicationPage
