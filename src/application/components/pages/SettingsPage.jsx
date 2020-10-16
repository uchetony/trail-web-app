import React from 'react'
import WithTitle from '../../../hoc/WithTitle'
import settingsIcon from '../../../static/images/settings.png'
import '../styles/SettingsPage.scss'

const SettingsPage = (props) => {
    return (
        <div className="settings-page-wrapper">
            <div className="settings-page-none">
                <div className="settings-image-container">
                    <img src={settingsIcon} alt="settings"/>
                </div>
                <small>This is the settings page</small>
            </div>
        </div>
    )
}

export default WithTitle({component: SettingsPage, title: 'Settings'})
