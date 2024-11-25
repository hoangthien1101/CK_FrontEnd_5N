import { Box, Button, Grid, IconButton, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAdmin({ closeEvent }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const add = () => {
        const admin = {
            fullName: name,  // Tên người dùng
            password: password,  // Mật khẩu
            email: email,
            roleId: 1,  // Vai trò mặc định là Admin (hoặc có thể cho phép lựa chọn)
        };

        addAdmin(admin);
        closeEvent();
        Swal.fire('Success!', 'Admin has been added successfully.', 'success');
        navigate('/admin/ad'); // Chuyển hướng tới danh sách admin
    };

    const addAdmin = (data) => {
        axios
            .post('http://localhost:6060/user/createadmin', data) // Endpoint cho API user
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Add Admin
            </Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                X
            </IconButton>
            <Box height={20} />

            <Grid container spacing={2} align="center">
                {/* Nhập tên admin */}
                <Grid item xs={12}>
                    <TextField
                        id="admin-name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={handleNameChange}
                        value={name}
                    />
                </Grid>
                {/* Nhập email */}
                <Grid item xs={12}>
                    <TextField
                        id="admin-email"
                        label="Email"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={handleEmailChange}
                        value={email}
                    />
                </Grid>
                {/* Nhập mật khẩu */}
                <Grid item xs={12}>
                    <TextField
                        id="admin-password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </Grid>
                {/* Nút Submit */}
                <Grid item xs={12}>
                    <Button variant="contained" onClick={add}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default AddAdmin;
