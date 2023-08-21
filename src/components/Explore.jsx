import React from 'react'
import { Avatar, Box, Card, Typography, styled, Stack } from '@mui/material';
import user from './../assets/images/1.jpg';
import { BsBoxFill } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';

const BoxWrapper = styled(Box)({
    margin: '20px 0px',
    '.explore-card': {
        padding: '24px', 
        borderRadius: '12px',
        background: '#444f5e',
        height: '190px',
        cursor: 'pointer',
        userSelect: 'none'
    },
    '.title': {
        fontSize: '25px', 
        fontWeight: 700,
        background: 'linear-gradient(to right, #ffefba, #ffffff)',
        'WebkitBackgroundClip': 'text',
        'WebkitTextFillColor': 'transparent'
    },
    '.subtitle': {
        fontWeight: 700,
        background: 'linear-gradient(to right, #ee0979, #ff6a00)',
        'WebkitBackgroundClip': 'text',
        'WebkitTextFillColor': 'transparent'
    },
    '.parent-explore': {
        display: 'flex',
        alignItems: 'center',
        gap: '18px'
    },
    '.description-explore': {
        fontSize: '18px',
        padding: '12px 0px',
        fontWeight: 500,
        color:'white'
    },
    '.explore-stack': {
        padding: '10px 0px'
    },
    '.stack-title': {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        color:'whitesmoke'
    }
})

const Explore = ({ title, subTitle, description, icon, count }) => {
    return (
        <BoxWrapper>
            <Card className='explore-card' elevation={0}>
                <Box className='parent-explore'>
                    <Box>
                        <Avatar alt="Travis Howard" sx={{ width: 55, height: 55 }} src={icon} />
                    </Box>
                    <Box>
                        <Typography className='title'>
                            {title}
                        </Typography>
                        <Typography className='subtitle'> 
                            {subTitle}
                        </Typography>
                    </Box>
                </Box>
                <Box className='description-explore'>
                    {description}
                </Box>
                <Box>
                    <Stack className='explore-stack' direction="row" spacing={2}>
                        <Typography className='stack-title'> <HiUsers fontSize={'18px'} style={{ paddingRight: '10px', color: '#f5274e' }} /> {count}</Typography>
                    </Stack>
                </Box>
            </Card>
        </BoxWrapper >
    )
}

export default Explore;