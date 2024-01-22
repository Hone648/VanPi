import { Box, Typography } from '@mui/material';
import Header from '../../components/Header';

const CellAntenna = ({ isCollapsed }) => {

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
                <Typography>Content</Typography>
            </Box>
        </Box>
    )
}

export default CellAntenna