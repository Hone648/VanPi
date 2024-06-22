import { Box } from '@mui/material';

const styles = {
    container: {
        mx: '30px',
        p: '20px'
    }
}

const CreateUserForm = () => {
    return (
        <>
            <Box sx={styles.container}>
                <div>
                    This is a form
                </div>
            </Box>
        </>
    )
}

export default CreateUserForm;