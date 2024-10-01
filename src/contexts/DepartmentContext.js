import React, { createContext, useState } from 'react';

export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
    const [department, setDepartment] = useState('Select Department');

    return (
        <DepartmentContext.Provider value={{ department, setDepartment }}>
            {children}
        </DepartmentContext.Provider>
    );
};