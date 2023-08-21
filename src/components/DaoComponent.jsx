import { Box, Button, Card, Typography, styled } from '@mui/material'
import React from 'react'
import dao from './../assets/images/createdao.png'
import { Link } from 'react-router-dom'

const BoxWrapper = styled(Box)({
    '.dao-title': {
        fontSize: '28px',
        fontWeight: 700,
        background: 'linear-gradient(to right, #ffefba, #ffffff)',
        'WebkitBackgroundClip': 'text',
        'WebkitTextFillColor': 'transparent'
    },
    '.description-dao': {
        fontSize: '16px', 
        lineHeight: '25px',
        fontWeight: 600,
        color:'white'
    },
    '.view-btn': {
        background: '#f5274e',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 500, color: '#fff',
        borderRadius: '12px',
        padding: '6px 15px', margin: '16px 0px'
    },
})

const DaoComponent = ({ title, description, btnTitle, isFlag,path }) => {
    return (
        <React.Fragment>
            <BoxWrapper>
                <Card  sx={{ p: 3,  background: '#444f5e', borderRadius: '12px', userSelect: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
                        <Typography className='dao-title'>
                            {title}
                        </Typography>
                    </Box>
                    <Typography className='description-dao'>
                        {description}
                    </Typography>
                    {isFlag ?
                        <Typography sx={{ padding: '22px 10px', fontSize: '20px', fontWeight: 500, color: '#9AA5B1' }}>
                            Comming soon
                        </Typography> :
                        <Link to={path}>
                            <Button variant="contained" className='view-btn' disableElevation>{btnTitle}  </Button>
                        </Link>
                    }

                </Card>
            </BoxWrapper>
        </React.Fragment>
    )
}

export default DaoComponent