import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import useMqtt from '../../hooks/useMqtt';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import AntennaControl from '../../components/AntennaControl';

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
        },
        deployButton: {
            my: '20px'
        }
    }
    const [buttonState, setButtonState] = useState(0);
    const [antennaState, setAntennaState] = useState('Idle');
    const client = useMqtt();
    const handleClick = () => {
        buttonState ? setAntennaState('Lowering Antenna...') : setAntennaState('Raising Antenna...');
        setButtonState(!buttonState);
    };
    return (
        <Box sx={styles.container}>
            <Box sx={styles.headerWrapper}>
                <Box sx={styles.headerText}>
                    <Header title="Cellular Antenna" subtitle="Controls and Status" />
                </Box>
            </Box>
            <Box sx={styles.content.container}>
                <Box sx={styles.deployButton}>
                    <Button onClick={() => handleClick()} variant='outlined' color='secondary'>
                        <Typography>{buttonState ? 'Lower Antenna' : 'Raise Antenna'}</Typography>
                    </Button>
                </Box>
                <Box sx={styles.progressContainer}>
                    <Box sx={styles.progressBar}>
                        <Typography variant='h3'>{antennaState !== "Idle" ? antennaState : undefined}</Typography>
                    </Box>
                    <Box sx={{ width: '75%', mt: '20px' }}>
                        {antennaState !== 'Idle' ?
                            <LinearProgress color='inherit' /> :
                            undefined}
                    </Box>
                </Box>
            </Box>
            <AntennaControl />
        </Box >
    )
}

export default CellAntenna