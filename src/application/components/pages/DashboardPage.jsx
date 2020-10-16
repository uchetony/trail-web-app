import React from 'react'
import '../styles/DashboardPage.scss';
import WithTitle from '../../../hoc/WithTitle';
import CustomerDashboard from '../ui/CustomerDashboard';
import StakeholderDashboard from '../ui/StakeholderDashboard';

const DashboardPage = ({userDetails, handleUpdateToken}) => {
    const {role} = userDetails

    return (
        <div className="dashboard-page-wrapper">
            {role === 'customer' && <CustomerDashboard userDetails={userDetails} handleUpdateToken={handleUpdateToken} />}
            {role === 'stakeholder' && <StakeholderDashboard />}
        </div>
    )
}

export default WithTitle({component: DashboardPage, title: 'Dashboard' })