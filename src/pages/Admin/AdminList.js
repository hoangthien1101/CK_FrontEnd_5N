import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Autocomplete, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import AddAdmin from './AddAdmin';
import Skeleton from '@mui/material/Skeleton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AdminList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        await axios.get('http://localhost:6060/user/useradmin').then((res) => {
            setRows(res.data);
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            fetchAdmins();
        }
    };

    return (
        <>
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddAdmin closeEvent={handleClose} />
                    </Box>
                </Modal>
            </div>
            {rows.length > 0 && (
                <Paper sx={{ width: '98%', overflow: 'hidden', padding: '12px' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
                        Admin List
                    </Typography>
                    <Divider />
                    <Box height={10} />
                    <Stack direction="row" spacing={2} style={{ padding: '10px' }} className="my-2 mb-2 ">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={rows}
                            sx={{ width: 300 }}
                            onChange={(e, v) => filterData(v)}
                            getOptionLabel={(rows) => rows.fullName || ''}
                            renderInput={(params) => <TextField {...params} size="small" label="Search Admin" />}
                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button>
                    </Stack>
                    <Box height={10} />
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Id
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Full Name
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Email
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Phone
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Role
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover key={row.userId} role="checkbox" tabIndex={-1}>
                                            <TableCell align="left">{row.userId}</TableCell>
                                            <TableCell align="left">{row.fullName}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.Phone}</TableCell>
                                            <TableCell align="left">{row.role}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
            {rows.length === 0 && (
                <Paper sx={{ width: '98%', overflow: 'hidden', padding: '12px' }}>
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={30} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                </Paper>
            )}
        </>
    );
}
