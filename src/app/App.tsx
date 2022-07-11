import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from './routes';

import './App.css'

const App = () => {
    const getRoutes = (allRoutes: any[]) =>
        allRoutes.map((route) => {

        if (route.route) {
            return <Route path={route.route} element={route.component} key={route.key} />;
        }

        return null;
    });
    return (
        <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    )
}

export default App
