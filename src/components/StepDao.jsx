import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

const BoxWrapper = styled(Box)({
    '.stepChain-card': {
        border: '2px solid #f5274e',
        borderRadius: '12px',
        // width: '300px',
        padding: '24px'
    },
    '.blockChain-title': {
        fontSize: '14px',
        color: '#687482',
        paddingTop: '15px'
    },
    '.blockChain-desc': {
        fontSize: '19px',
        color: '#323F4B',
        fontWeight: 700
    }
})

const StepDao = ({ step, chainTitle, stepImage }) => {
    return (
        <BoxWrapper>
            <Card className='stepChain-card'>
                <CardMedia
                    sx={{ height: 160, borderRadius: '12px' }}
                    image={stepImage ? stepImage : 'data:image/png;base64,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'}
                    title="green iguana"
                />
                <Typography className='blockChain-title'>
                    {step}
                </Typography>
                <Typography className='blockChain-desc'>
                    {chainTitle}
                </Typography>
            </Card>
        </BoxWrapper>

    );
}

export default StepDao;