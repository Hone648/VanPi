import { Box, Button, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';


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
    }
}
const UserInfo = () => {
    const { data, error, isLoading } = useUsers();
    if (data) {
        return (
            <>
                <Box sx={styles.container}>
                    {data.users.map((user) => (
                        <Box sx={styles.userWrapper}>
                            <div>
                                <Typography key={user._id}>Name: {user.name}</Typography>
                                <Typography>ID: {user._id}</Typography>
                                <Typography>Access: {user.access ? 'Admin' : 'User'}</Typography>
                                <Typography>Created on: {user.createdAt}</Typography>
                            </div>
                            <div>
                                <Button color='error' variant='contained'>Delete</Button>
                            </div>
                        </Box>
                    ))}
                </Box>
            </>
        )
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default UserInfo;