import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { tokens } from '../../../theme';
import TextField from '@mui/material/TextField';

const TanksControls = () => {
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
    header: {},
    subsection: {
      mt: '30px',
      textAlign: 'left',
      item: {
        display: 'flex',
        alignItems: 'end',
        itemText: {
          flex: 1,
          ml: '50px',
          color:
            theme.palette.mode === 'light'
              ? colors.blueAccent[900]
              : colors.greenAccent[400],
        },
        itemInput: {
          flex: 1,
          alignItems: 'bottom',
        },
      },
    },
  };

  const Item = ({ title, label, placeholder }) => {
    return (
      <Box sx={styles.subsection.item}>
        <Box sx={styles.subsection.item.itemText}>
          <Typography>{title}</Typography>
        </Box>
        <Box sx={styles.subsection.item.itemInput}>
          <TextField
            id="standard-basic"
            label={label}
            variant="standard"
            placeholder={placeholder}
            color={theme.palette.mode === 'light' ? 'info' : 'secondary'}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h3">
          Settings
        </Typography>
      </Box>
      <Box>
        <Box sx={styles.subsection}>
          <Typography sx={{ textDecoration: 'underline' }} variant="h3">
            Grey Water:
          </Typography>
          <Item title="Alarm SetPoint:" label="Value" placeholder="80%" />
          <Item
            title="Automatic Dump SetPoint:"
            label="Value"
            placeholder="90%"
          />
        </Box>
        <Box sx={styles.subsection}>
          <Typography sx={{ textDecoration: 'underline' }} variant="h3">
            Black Water:
          </Typography>
          <Item title="Alarm SetPoint:" label="Value" placeholder="80%" />
          <Item
            title="Automatic Dump SetPoint:"
            label="Value"
            placeholder="90%"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default TanksControls;
