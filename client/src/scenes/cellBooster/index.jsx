import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import useMqtt from '../../hooks/useMqtt';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import AntennaControl from '../../components/AntennaControl';

const CellAntenna = ({ isCollapsed }) => {
    const mqttClient = useMqtt(); // Get the client from context

    useEffect(() => {
        if (mqttClient) {
            // Subscribe to the topic when the component mounts
            mqttClient.subscribe('antenna/control', (err) => {
                if (err) console.error('Subscription Error:', err);
                else console.log('Subscribed to antenna/control');
            });

            // Listen for messages
            mqttClient.on('message', (topic, message) => {
                console.log(`Received message on ${topic}: ${message.toString()}`);
            });

            // Cleanup on unmount
            return () => {
                mqttClient.unsubscribe('antenna/control');
                mqttClient.removeAllListeners('message');
            };
        }
    }, [mqttClient]);

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
        if (mqttClient) {
            mqttClient.publish('antenna/control', buttonState ? "Lower" : "Raise");
            console.log(`Sent command: ${buttonState ? "Lower" : "Raise"}`);
        }
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
        </Box >
    )
}

export default CellAntenna