import { Box } from '@mui/material'
import React from 'react'


const styles = {
    container: {
        ml: 10,
        mt: 10
    }
}
const Notifications = ({ notifications }) => {
    return (
        <Box sx={styles.container}>
            <div>
                {notifications.map(item => <p> 2/7/2024 10:00am : {item}</p>)}
            </div>
        </Box>
    )
}

export default Notifications