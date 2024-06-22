import { Box, Button, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { Link } from 'react-router-dom';


const styles = {
    container: {
        padding: '20px',
        maxHeight: '91vh',
        overflow: 'scroll',
        overflowX: 'hidden',
    },
    userWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingX: '50px',
        alignItems: 'center',
        m: '4rem'
    },
    button: {
        marginX: '.5rem',
        width: '100px'
    }
}

const LoadingPage = () => {
    return (
        <Box sx={styles.container}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </Box>
    )
}
const UserInfo = () => {
    const { data, error } = useUsers();

    const handleDelete = (userId) => {
        axios
            .delete('http://192.168.1.19:5000/api/user/' + userId)
            .then(res => res.data)
    }

    (error) && <span>error.message</span>

    if (data) {
        return (
            <>
                <Box sx={styles.container}>
                    {data.users.map((user) => (
                        <Box key={user._id} sx={styles.userWrapper}>
                            <div>
                                <Typography key={user._id}>Name: {user.name}</Typography>
                                <Typography>ID: {user._id}</Typography>
                                <Typography>Access: {user.access ? 'Admin' : 'User'}</Typography>
                                <Typography>Created on: {user.createdAt}</Typography>
                            </div>
                            <div>
                                <Button sx={styles.button} color='secondary' variant='contained'>Edit</Button>
                                <Button onClick={() => handleDelete(user._id)} sx={styles.button} color='error' variant='contained'>Delete</Button>
                            </div>
                        </Box>
                    ))}
                    <Link to="/createuser">
                        <Button sx={styles.button} color='secondary' variant='contained'>Add User</Button>
                    </Link>
                </Box >
            </>
        )
    }
    return (
        <div style={styles.container}>
            <Typography>Loading...</Typography>
            <LoadingPage />
            <LoadingPage />
            <LoadingPage />
        </div>
    )
}

export default UserInfo;