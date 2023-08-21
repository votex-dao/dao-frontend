import React from 'react'
import { Box, Card, Grid, Typography, styled } from '@mui/material';
import setupImage from './../assets/images/setup.png'



const Boxwrapper = styled(Box)({
    padding: '0px 8rem',
    '.setup-content': {
        color: '#f5274e',
        padding: '45px',
        fontSize: '32px',
        lineHeight: '39px'
    },
    '.setup-card': {
        border: '2px solid #f5274e',
        borderRadius: '12px',
        background: '#fff4f4'
    },
    '.parent-setup': {
        display: 'flex',
        alignItems: 'center'
    }
})


const Setup = () => {
    return (
        <React.Fragment>
            <Boxwrapper>
                <Card className='setup-card' elevation={0}>
                    <Grid container spacing={2} sx={{ border: '1px dotted green', }}>
                        <Grid item xs={12} md={6} xl={6} className='parent-setup'>
                            <Typography className='setup-content'>
                                No code setup. Mint and distribute tokens, authorize wallets for voting, and set governance parameters without writing a line of code.
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={6} xl={6}>
                            <img src={setupImage} alt='setup-img' width={'100%'} />
                        </Grid>
                    </Grid>
                </Card>

            </Boxwrapper>

        </React.Fragment>
    )
}

export default Setup;