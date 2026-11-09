import React from 'react';

const DashboardLayout = ({ children }: LayoutProps<"/">) => {
    return (
        <div>
           {children}
        </div>
    );
};

export default DashboardLayout;