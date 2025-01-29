import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import useMqtt from '../../hooks/useMqtt';

const CellAntenna = ({ isCollapsed }) => {
    const styles = useMemo(() => ({
        container: { m: '10px' },
        wrapper: { height: '79vh', width: isCollapsed ? '92vw' : '77vw' },
        headerWrapper: { display: 'flex', alignItems: 'center' },
        headerText: { flex: 1 },
        content: { container: { m: '30px' } },
        deployButton: { my: '20px' },
        progressContainer: { mt: '20px' },
        progressBar: { textAlign: 'center' }
    }), [isCollapsed]);

    const mqttClient = useMqtt();
    const [state, setState] = useState({
        buttonState: 0,
        antennaState: 'Idle'
    });

    useEffect(() => {
        if (!mqttClient) return;

        const subscribeToTopics = () => {
            mqttClient.subscribe('antenna/control', (err) => {
                if (err) console.error('Subscription Error:', err);
                else console.log('Subscribed to antenna/control');
            });
            mqttClient.subscribe('antenna/status', (err) => {
                if (err) console.error('Subscription Error:', err);
                else console.log('Subscribed to antenna/status');
            });
        };

        const handleMessage = (topic, message) => {
            const msg = message.toString();

            if (topic === 'antenna/control') {
                setState(prev => ({
                    ...prev,
                    antennaState: msg === 'Completed' ? 'Completed' : 'Moving Antenna...'
                }));
            }

            if (topic === 'antenna/status') {
                setState(prev => ({
                    buttonState: msg === 'Raised' ? 1 : 0,
                    antennaState: msg === 'Raised' ? 'Antenna Raised' : 'Antenna Lowered'
                }));
            }
        };

        subscribeToTopics();
        mqttClient.publish('antenna/status/request', 'get');
        mqttClient.on('message', handleMessage);

        return () => {
            mqttClient.unsubscribe('antenna/control');
            mqttClient.unsubscribe('antenna/status');
            mqttClient.removeAllListeners('message');
        };
    }, [mqttClient]);

    const handleClick = () => {
        if (mqttClient) {
            const action = state.buttonState ? 'Lower' : 'Raise';
            mqttClient.publish('antenna/control', action);
        }
        setState(prev => ({ ...prev, buttonState: !prev.buttonState }));
    };

    const isButtonDisabled = state.antennaState !== 'Antenna Raised' && state.antennaState !== 'Antenna Lowered';

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
                        disabled={isButtonDisabled}
                        onClick={handleClick}
                        variant='outlined'
                        color='secondary'
                    >
                        <Typography>{state.buttonState ? 'Lower Antenna' : 'Raise Antenna'}</Typography>
                    </Button>
                </Box>
                <Box sx={styles.progressContainer}>
                    <Box sx={styles.progressBar}>
                        {state.antennaState !== 'Idle' && (
                            <Typography variant='h2'>{state.antennaState}</Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CellAntenna;