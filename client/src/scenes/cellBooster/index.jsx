import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

const CellAntenna = ({ isCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const styles = {
        container: {
            m: '10px',
        },
        wrapper: {
            height: '79vh',
            width: isCollapsed ? '92vw' : '77vw',
        },
        headerWrapper: {
            display: 'flex',
            alignItems: 'center',
        },
        headerText: {
            flex: 1,
        },
        content: {
            container: {
                m: '30px',
            }
        },
        deployButton: {
            my: '20px'
        },
        progressContainer: {
            display: 'flex'
        },
        progressBar: {
            flex: 3,
            mt: '10px'
        },
        progressValue: {
            flex: 1,
            mx: '10px'

        }
    }

    return (
        <Box sx={styles.container}>
            <Box sx={styles.headerWrapper}>
                <Box sx={styles.headerText}>
                    <Header title="Cellular Antenna" subtitle="Controls and Status" />
                </Box>
            </Box>
            <Box sx={styles.content.container}>
                <Box sx={styles.deployButton}>
                    <Button variant='outlined' color='secondary'>
                        <Typography>Deploy Antenna</Typography>
                    </Button>
                </Box>
                <Box sx={styles.progressContainer}>
                    <Box sx={styles.progressBar}>
                        <LinearProgress color='secondary' variant="determinate" value={34} />
                    </Box>
                    <Box sx={styles.progressValue}>
                        <Typography variant='h5'>34%</Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default CellAntenna