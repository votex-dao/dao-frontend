import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BsBoxFill } from 'react-icons/bs';

const BoxWrapper = styled(Box)({
    '.main-parent-status': {
        display: 'flex', justifyContent: 'space-between', padding: '25px 0px'
    },
    '.publish': {
        fontWeight: 700, color: '#52606D', fontSize: '16px'
    },
    '.publish-date': {
        fontSize: '14px', color: '#979FA9'
    }
})

const Status = () => {
    return (
        <React.Fragment>
            <BoxWrapper>
                <Box className='main-parent-status'>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <CheckCircleIcon sx={{ color: '#52606D', fontSize: '18px', marginTop: '3px' }} />
                        <Box>
                            <Typography className='publish'>
                                Published
                            </Typography>
                            <Typography className='publish-date'>
                                2023/05/01 10:43 PM UTC+5:30
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', color: '#979FA9' }}>
                            17,167,388<BsBoxFill fontSize={'16px'} style={{ paddingLeft: '10px', color: '#7B8794' }} />
                        </Typography>
                    </Box>
                </Box>
            </BoxWrapper>
        </React.Fragment>
    )
}

export default Status