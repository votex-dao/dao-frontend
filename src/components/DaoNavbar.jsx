import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Grid, styled, Avatar, Button } from '@mui/material'
import user from './../assets/images/wallet.png';
import { Wallet } from '@transia/xrpl';

const DaoNavbar = () => {
    const [walletAddress, setWalletAddres] = React.useState()
    React.useEffect(()=>{
        const seed = localStorage.getItem('seed')
        if(seed){
            setWalletAddres(Wallet.fromSeed(seed).address)
        }else{
            window.location.replace = "/"
        }
    }, [])

    const BoxWrapper = styled(Box)(() => ({
        '.appbar': {
            padding: '1.1rem 8rem',
            color: '#f5274e',
            background: '#0C0F1A'
        },
        '.dao-btn': {
            background: '#fff',
            textTransform: 'capitalize',
            fontSize: '17px',
            fontWeight: 500,
            borderRadius: '12px',
            padding: '6px 15px',
            color: '#66727e'
        },
        '.dao-btn:hover': {
            background: '#fff'
        }
    }));

    return (
        <BoxWrapper>
            <AppBar className='appbar' elevation={0} position="fixed">
                <Grid container spacing={0} >
                    <Grid item xs={12} xl={6} md={6}>
                      
                    </Grid>
                    <Grid item xs={12} xl={6} md={6} >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" className='dao-btn' disableElevation > <Avatar alt="Remy Sharp" src={user} sx={{ width: '24px', height: '24px', marginRight: '10px' }} />{walletAddress}</Button>
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>
        </BoxWrapper >
    );
}

export default DaoNavbar;