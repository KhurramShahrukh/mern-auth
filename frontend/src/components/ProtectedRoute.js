// library imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// local imports
import { isEmptyObject } from '../utils/helpers';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
    const { user } = useSelector((state) => state.UserSlice);

    if (isEmptyObject(user)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
