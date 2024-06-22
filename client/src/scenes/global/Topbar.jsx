import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Badge from '@mui/material/Badge';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';

const TopBar = ({ selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      p: '10px',
    },
    appName: {
      ml: '10px',
      color: colors.grey[400],
    },
    wrapper: {
      display: 'flex',
      backgroundColor: colors.primary[400],
    },
    settingsIcon: {
      borderRadius: '50%',
      backgroundColor: selected === 'settings' && colors.blueAccent[700],
      mx: 1
    },
    notificationsIcon: {
      borderRadius: '50%',
      backgroundColor: selected === 'notifications' && colors.blueAccent[700],
      mx: 1
    },
    usersIcon: {
      borderRadius: '50%',
      backgroundColor: selected === 'users' && colors.blueAccent[700]
    }
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.appName}>
        <Typography variant="h3">BoonDocker</Typography>
      </Box>
      <Box sx={styles.wrapper}></Box>
      {/* {ICONS} */}
      <Box display="flex" justifyContent='space-between'>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Link to='/notifications'>
          <Box sx={styles.notificationsIcon}>
            <IconButton onClick={() => setSelected('notifications')}>
              <Badge badgeContent={2} color="secondary">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Link>
        <Link to="/settings">
          <Box sx={styles.settingsIcon}>
            <IconButton onClick={() => setSelected('settings')}>
              <SettingsOutlinedIcon />
            </IconButton>
          </Box>
        </Link>
        <Link to={'/userinfo'}>
          <Box sx={styles.usersIcon}>
            <IconButton onClick={() => setSelected('users')} >
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Link>
        {/* <Badge sx={styles.badgeIcon} badgeContent={3} color='secondary'>
          <MailIcon color="action" />
        </Badge> */}
      </Box>
    </Box >
  );
};

export default TopBar;
