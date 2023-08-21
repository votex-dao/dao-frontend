import React from 'react'
import { Box, Card, Grid, Typography, styled } from '@mui/material';
import setupImage from './../assets/images/setup.png'


const Boxwrapper = styled(Box)({
    // padding: '2rem 8rem'
    '.voting-content': {
        color: '#f5274e',
        fontSize: '32px',
        lineHeight: '39px'
    },
    '.voting-card': {
        border: '2px solid #f5274e',
        borderRadius: '12px',
        background: '#fff4f4',
        padding: '45px',
        height: '490px'

    },
    '.parent-content': {
        display: 'flex',
        alignItems: 'center'
    }
})

const Voting = ({ title, image }) => {
    return (
        <React.Fragment>
            <Boxwrapper>
                <Card className='voting-card' elevation={0}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={12} xl={12} className='parent-content'>
                            <Typography className='voting-content'>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={12} xl={12} sx={{ paddingTop: '20px' }}>
                            <img src={image} alt='setup-img' width={'100%'} />
                        </Grid>
                    </Grid>
                </Card>

            </Boxwrapper>

        </React.Fragment>
    )
}

export default Voting;