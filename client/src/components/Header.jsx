import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    container: {
      display: 'flex',
      m: '15px',
      p: '10px',
      justifyContent: 'space-between',
    },
    title: {
      color: colors.grey[100],
      fontWeight: 'bold',
      mb: '5px',
    },
    subtitle: {
      color: colors.greenAccent[400],
    },
  };
  return (
    <Box sx={styles.container}>
      <Box>
        <Typography sx={styles.title} variant="h3">
          {title}
        </Typography>
        <Typography sx={styles.subtitle} variant="h5">
          {subtitle}
        </Typography>
      </Box>
      <Box sx={styles.controls}></Box>
    </Box>
  );
};

export default Header;
