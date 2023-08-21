import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()
  const [isProgress, setProgress] = React.useState(false)
  const BoxWrapper = styled(Box)(() => ({
    '.appbar': {
      padding: '1.1rem 8rem',
      background: '#0C0F1A',
      color: '#f5274e',
    },
    '.launch-btn': {
      background: '#f5274e',
      textTransform: 'capitalize',
      fontSize: '17px',
      fontWeight: 500,
      borderRadius: '12px',
      padding: '6px 15px'
    },
    '.launch-btn:hover': {
      background: '#f5274e'
    }
  }));

  return (
    <BoxWrapper>
      <Box className='appbar'>
        <Grid container spacing={0} >
          <Grid item xs={12} xl={6} md={6}>
            <img src={"./VoteX.png"} alt='DAO-LOGO' width={'150px'} />
          </Grid>
          <Grid item xs={12} xl={6} md={6} >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </BoxWrapper >
  );
}

export default Navbar;