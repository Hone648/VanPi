import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import useMqtt from '../../hooks/useMqtt';

const CellAntenna = ({ isCollapsed }) => {
    const styles = {
        container: { m: '10px' },
        wrapper: { height: '79vh', width: isCollapsed ? '92vw' : '77vw' },
        headerWrapper: { display: 'flex', alignItems: 'center' },
        headerText: { flex: 1 },
        content: { container: { m: '30px' } },
        deployButton: { my: '20px' }
    };

    const mqttClient = useMqtt();
    const [buttonState, setButtonState] = useState(0);
    const [antennaState, setAntennaState] = useState();

    useEffect(() => {
        if (mqttClient) {
            // Subscribe to necessary topics
            mqttClient.subscribe('antenna/control', (err) => {
                if (err) console.error('Subscription Error:', err);
                else console.log('Subscribed to antenna/control');
            });
            mqttClient.subscribe('antenna/status', (err) => {
                if (err) console.error('Subscription Error:', err);
                else console.log('Subscribed to antenna/status');
            });

            // Request current antenna state when component mounts
            mqttClient.publish('antenna/status/request', 'get');

            // Listen for messages
            mqttClient.on('message', (topic, message) => {
                const msg = message.toString();

                if (topic === 'antenna/control') {
                    setAntennaState(msg === 'Completed' ? 'Completed' : 'Moving Antenna...');
                }

                if (topic === 'antenna/status') {
                    if (msg === 'Raised') {
                        setAntennaState('Antenna Raised');
                        setButtonState(1);
                    } else if (msg === 'Lowered') {
                        setAntennaState('Antenna Lowered');
                        setButtonState(0);
                    }
                }
            });

            // Cleanup on unmount
            return () => {
                mqttClient.unsubscribe('antenna/control');
                mqttClient.unsubscribe('antenna/status');
                mqttClient.removeAllListeners('message');
            };
        }
    }, [mqttClient]);

    const handleClick = () => {
        if (mqttClient) {
            const action = buttonState ? 'Lower' : 'Raise';
            mqttClient.publish('antenna/control', action);
        }
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
                    <Button
                        disabled={
                            antennaState !== 'Antenna Raised' &&
                            antennaState !== 'Antenna Lowered'
                        }
                        onClick={handleClick}
                        variant='outlined'
                        color='secondary'
                    >
                        <Typography>{buttonState ? 'Lower Antenna' : 'Raise Antenna'}</Typography>
                    </Button>
                </Box>
                <Box sx={styles.progressContainer}>
                    <Box sx={styles.progressBar}>
                        {antennaState !== 'Idle' && (
                            <Typography variant='h2'>{antennaState}</Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CellAntenna;
