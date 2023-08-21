import React, { useState } from 'react'
import { Box, styled, Card, Typography, Button, Grid } from '@mui/material'
import CreateDaoNavbar from '../components/CreateDaoNavbar';
import StepperForm from '../components/StepperForm';
import { ToastContainer } from "react-toastify";

const BuildDaoPage = () => {
    return (
        <React.Fragment>
            <CreateDaoNavbar />
            <Box sx={{ paddingTop: '5.1rem', fontSize: '50px' }}>
                <StepperForm />
            </Box>
            <ToastContainer />
        </React.Fragment>
    )
}

export default BuildDaoPage