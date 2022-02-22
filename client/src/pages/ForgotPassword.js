import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER_EMAIL } from '../utils/queries';
import EmailInput from '../components/ForgotPassword';
import SecurityQuestion from '../components/SecurityQuestion';
import UpdatePassword from '../components/UpdatePassword';

const ForgotPassword = ({ currentPage, setCurrentPage }) => {

    useEffect(() => {
        setCurrentPage('ForgotPassword')
    })

    const [currentComponent, setCurrentComponent] = useState('EmailInput');
    const [getUser, { data, loading, error }] = useLazyQuery(QUERY_USER_EMAIL);

    const renderPage = () => {
        if (currentComponent === 'EmailInput') {
            return <EmailInput setCurrentComponent={setCurrentComponent} getUser={getUser} data={data} />
        }
        if (currentComponent === 'SecurityQuestion') {
            return <SecurityQuestion setCurrentComponent={setCurrentComponent} data={data} />
        }
        if (currentComponent === 'UpdatePassword') {
            return <UpdatePassword setCurrentComponent={setCurrentComponent} data={data} />
        }
    }

    return (
        <div>
            {renderPage()}
        </div>
    );
}

export default ForgotPassword;