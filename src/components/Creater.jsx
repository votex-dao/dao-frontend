import React from 'react'
import { styled, Box, Card } from '@mui/material';
import DataTable from './DataTable';

const BoxWrapper = styled(Box)({
    '.parent-img': {
        display: 'flex',
        justifyContent: 'center'
    },
    '.creater-card': {
        background: "#444f5e",

        padding: '48px',
        borderRadius: '12px'
    },
    '.title-create': {
        fontSize: '25px',
        fontWeight: 700,
        textAlign: 'center'
    },
    '.desc-creater': {
        fontSize: '16px',
        lineHeight: '22px',
        fontWeight: 500, color: '#747F8D',
        textAlign: 'center'
    },
    '.creater-btn': {
        background: '#f5274e',
        textTransform: 'capitalize',
        fontSize: '16px',
        fontWeight: 500,
        borderRadius: '12px',
        padding: '6px 15px'
    },
    '.creater-btn:hover': {
        background: '#f5274e',
    },
});


const Creater = ({ title, data, members, Childc, filterCallback, daoid }) => {
    return (
        <React.Fragment>
            <BoxWrapper>
                <Card className='creater-card'>
                    <DataTable daoid={daoid} filterCallback={filterCallback} members={members} title={title} data={data} ChildC={Childc} />
                </Card>
            </BoxWrapper>
        </React.Fragment>
    )
}

export default Creater