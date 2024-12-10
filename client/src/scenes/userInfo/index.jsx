import { Box, Button, Typography, FormHelperText, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import useUsers from '../../hooks/useUsers';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const styles = {
    container: {
        ml: '20px',
        maxHeight: '100%',
        overflowX: 'hidden',
        p: '50px'
    },
    usersWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingX: '50px',
        alignItems: 'center'
    },
    userTypography: {
        p: '10px'
    },
    userButtons: {
        p: '10px'
    },
    addUser: {
        display: 'flex',
        justifyContent: 'center',
        mt: '20px',
        width: '100%',
    },
    button: {
        textDecoration: 'none',
        m: '5px',
    },
    form: {
        justifyContent: 'space-between',
        ml: '20px',
        maxHeight: '100%',
        overflowX: 'hidden',
        p: '50px'
    }
}

const LoadingPage = () => {
    const items = [1, 2, 3]
    return (
        <>
            {items.map((value, index) => {
                return (
                    <Box key={index} sx={styles.container}>
                        <Typography>Loading...</Typography>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Box >
                )
            })
            }
        </>
    )
}
const UserInfo = () => {
    let access = "Admin"
    const { data, error } = useUsers();
    const handleDelete = (userId) => {
        axios
            .delete('http://localhost:5000/api/user/' + userId)
            .then(res => res.data)
    }

    (error) && <span>error.message</span>

    if (data) {
        return (
            <>
                <Header title='Users' subtitle='Create, View, Edit, and Delete Users' />
                <Box sx={styles.container}>
                    {data.users.map((user) => (
                        <Box key={user._id} sx={styles.usersWrapper}>
                            <Box sx={styles.userTypography}>
                                <Typography key={user._id}>Name: {user.name}</Typography>
                                <Typography>ID: {user._id}</Typography>
                                <Typography>Access: {user.access ? 'Admin' : 'User'}</Typography>
                                <Typography>Created on: {new Date(user.createdAt).toLocaleDateString("en-US")}</Typography>
                            </Box>
                            <Box sx={styles.userButtons}>
                                <Button sx={styles.button} color='secondary' variant='contained'>Edit</Button>
                                <Button sx={styles.button} onClick={() => handleDelete(user._id)} color='error' variant='contained'>Delete</Button>
                            </Box>
                        </Box>
                    ))}
                    <Link to="/createuser">
                        {data.users.length < 3 ?
                            <Box>
                                <Box sx={styles.addUser}>
                                    <Box>
                                        <Box component='form' sx={styles.form}>
                                            <Box>
                                                <FormControl sx={styles.inputs} variant="standard">
                                                    <TextField label='Name' variant='filled' id="name" color='secondary' />
                                                    <InputLabel id="access">Access</InputLabel>
                                                    <Select
                                                        // disabled
                                                        // labelId="access"
                                                        id="access"
                                                        value={access}
                                                        onChange={console.log('changed')}
                                                        color='primary'
                                                    >
                                                        <MenuItem value='admin'>Admin</MenuItem>
                                                        <MenuItem value='user'>User</MenuItem>
                                                    </Select>
                                                    <FormHelperText>Disabled: Admin use only.</FormHelperText>
                                                    <Button sx={styles.button} disabled={data.users.length > 2} color='secondary' variant='contained'>Add User</Button>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            : undefined
                        }
                    </Link>
                </Box >
            </>
        )
    } else {
        return (
            <Box style={styles.container}>
                <LoadingPage />
            </Box>
        )
    }
}

export default UserInfo;