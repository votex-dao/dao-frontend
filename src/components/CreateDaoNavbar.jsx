import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Grid, styled } from '@mui/material';
import user from './../assets/images/wallet.png';
import Avatar from '@mui/material/Avatar';
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { Wallet } from '@transia/xrpl';

const BoxWrapper = styled(Box)(() => ({
    '.appbar': {
        padding: '1.1rem 2.5rem',
        background: '#0C0F1A',
        color: '#f5274e',
        // background: 'linear-gradient(rgb(254,39,78) 0%, rgba(49, 100, 250, 0) 100%);'
    },
    '.back-dao-title': {
        background: '#fff',
        color: '#66727e',
        fontSize: '17px',
        textTransform: 'none',
        fontWeight: 600
    },
  
    '.dao-btn': {
        background: '#fff',
        textTransform: 'capitalize',
        fontSize: '17px',
        fontWeight: 500,
        borderRadius: '12px',
        padding: '6px 15px',
        color: '#66727e'
    }
}));

const CreateDaoNavbar = () => {
    const navigate = useNavigate();
    const [walletAddress, setWalletAddres] = React.useState()

    React.useEffect(()=>{
        const seed = localStorage.getItem('seed')
        if(seed){
            setWalletAddres(Wallet.fromSeed(seed).address)
        }else{
            window.location.replace = "/"
        }
    },[])
    const handleClick = () => {
        navigate(-1)
    }
    return (
        <BoxWrapper>
            <AppBar className='appbar' elevation={0} position="fixed">
                <Grid container spacing={0} >
                    <Grid style={{alignItems:'center', display: 'flex'}} item xs={12} xl={6} md={6}>
                        <Box >
                           <Button  onClick={handleClick} style={{  background: '#F5F7FA' }} sx={{ padding: '10px', borderRadius: 3, marginRight: '10px' }} ><AiOutlineLeft color='black' /></Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} xl={6} md={6} >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button style={{ background: 'white'}} className='dao-btn' disableElevation > <Avatar alt="Remy Sharp" src={user} sx={{ width: '24px', height: '24px', marginRight: '10px' }} />{walletAddress}</Button>
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>
        </BoxWrapper >
    );
}

export default CreateDaoNavbar;