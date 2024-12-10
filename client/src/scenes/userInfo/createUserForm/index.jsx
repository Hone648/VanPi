import { Box, FormHelperText, TextField, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Header from '../../../components/Header';

const styles = {
    form: {
        display: 'flex',
        justifyContent: 'space-around',
        ml: '20px',
        maxHeight: '100%',
        overflowX: 'hidden',
        p: '50px'
    },
    inputs: {
        width: '40%'
    }
}

const CreateUserForm = () => {
    return (
        <Box>
            <Header title='Create New User' subtitle='You may add up to three(3) users' />
            <Box component='form' sx={styles.form}>
                <FormControl sx={styles.inputs} variant="standard">
                    <TextField label='Name' variant='filled' id="name" color='secondary' />
                </FormControl>
                <FormControl sx={styles.inputs} variant="standard">
                    <InputLabel id="access">Access</InputLabel>
                    <Select
                        // disabled
                        labelId="access"
                        id="access"
                        value={33}
                        label="User"
                        onChange={console.log('changed')}
                        color='primary'
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='user'>User</MenuItem>
                    </Select>
                    <FormHelperText>Disabled: Admin use only.</FormHelperText>
                </FormControl>
                <Button color='secondary' variant='contained'>Create User</Button>
            </Box>
        </Box>
    )
}

export default CreateUserForm;