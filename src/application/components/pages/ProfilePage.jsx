import React from 'react'
import '../styles/ProfilePage.scss'
import userDp from '../../../static/images/blank-profile-picture.png'
import { Link } from 'react-router-dom'
import WithTitle from '../../../hoc/WithTitle'

const ProfilePage = ({userDetails}) => {

    return (
        <div className="profile-page-wrapper">
            <div className="profile-page-header">
                <div className="profile-page-header-image">
                    <img src={userDp} alt="user dp"/>  
                </div>
                <Link to="/app/edit-profile" className="edit-profile-button">Edit profile</Link>
            </div>
            
            <div className="profile-page-holder">
                <div className="profile-detail">
                    <p>Full Name:</p>
                    <small>{userDetails.fullName}</small>
                </div>
                <div className="profile-detail">
                    <p>Email:</p>
                    <small>{userDetails.email}</small>
                </div>
                <div className="profile-detail">
                    <p>Role:</p>
                    <small>{userDetails.role}</small>
                </div>
                <div className="profile-detail">
                    <p>Address:</p>
                    <small>{userDetails.address}</small>
                </div>
                <div className="profile-detail">
                    <p>Tel:</p>
                    <small>{userDetails.phoneNumber}</small>
                </div>
            </div>
        </div>
    )
}

export default WithTitle({component: ProfilePage, title: 'Profile'})
