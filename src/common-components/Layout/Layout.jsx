// src/Layout.js
import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(true);

    const handleSidebarToggle = () => setOpenSidebar(!openSidebar);

    return (
        <Grid container spacing={0}>
            {/* Sidebar */}
            <Grid item xs={2} sx={{ position: 'relative', transition: 'width 1s' }}>
                <Sidebar openSidebar={openSidebar} handleSidebarToggle={handleSidebarToggle} />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header openSidebar={openSidebar} handleSidebarToggle={handleSidebarToggle} />

                <Box className={children.type.name == 'LoginPage' ? "dashboard-body-login-container" : "dashboard-body-container"} sx={{marginLeft: openSidebar ? '240px' : '0', transition: openSidebar ? 'margin-left 0.3s': ''}}>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Layout;
