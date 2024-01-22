import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import Switch from '@mui/material/Switch';

const BatteryControls = ({ alternator, setAlternator }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    container: {
      mx: '30px',
      p: '20px',
      height: '60vh',
      backgroundColor: colors.primary[900],
      borderRadius: '3%',
    },
    header: {
      mb: '10px',
    },
    content: {
      m: '50px',
    },
    item1: {
      display: 'flex',
      textWrapper: {
        display: 'flex',
        alignItems: 'center',
        flex: 3,
      },
      inputWrapper: {
        flex: 1,
      },
    },
    switch: {
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: colors.blueAccent[600],
        '&:hover': {
          backgroundColor:
            (colors.blueAccent[600], theme.palette.action.hoverOpacity),
        },
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: colors.blueAccent[600],
        color: 'red',
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h3">
          Settings
        </Typography>
      </Box>
      <Box sx={styles.content}>
        <Box sx={styles.item1}>
          <Box sx={styles.item1.textWrapper}>
            <Typography variant="h4">Display Alternator Status:</Typography>
          </Box>
          <Box sx={styles.item1.inputWrapper}>
            <Switch
              sx={styles.switch}
              defaultChecked={alternator}
              onClick={() => setAlternator(!alternator)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BatteryControls;
