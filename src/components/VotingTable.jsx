import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('0x4ca...4656', 'yes', '100%', '1M LER'),
];

const VotingTable = () => {

    return (
        <TableContainer sx={{ border: '2px solid red', borderRadius: '12px' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Wallet</TableCell>
                        <TableCell align="right">Option</TableCell>
                        <TableCell align="right">Voting Power</TableCell>
                        <TableCell align="right">Token Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}

export default VotingTable;