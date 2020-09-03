import React from 'react'
import WithTitle from '../../../hoc/WithTitle'

const SettingsPage = (props) => {
    return (
        <div>
            This is the settings page
        </div>
    )
}

export default WithTitle({component: SettingsPage, title: 'Settings'})
