import { Box, Typography } from '@mui/material';
import Header from '../../components/Header';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import OpacityIcon from '@mui/icons-material/Opacity';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useState } from 'react';
import BatteryControls from './components/BatteryControls';
import TanksControls from './components/TanksControls';

const Settings = ({ data, alternator, setAlternator }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [active, setActive] = useState('Batteries');
  const styles = {
    container: {
      m: '10px',
    },
    listWrapper: {
      display: 'flex',
      m: '50px',
    },
    list: {
      width: '25vw',
      flex: 1,
    },
    controls: {
      textAlign: 'center',
      flex: 1,
    },
  };

  const Displayed = ({ selected }) => {
    if (selected === 'Batteries') {
      return (
        <BatteryControls
          alternator={alternator}
          setAlternator={setAlternator}
        />
      );
    } else if (selected === 'Tanks') {
      return <TanksControls />;
    } else if (active === 'Something Else') {
      return <Typography>{selected}</Typography>;
    }
  };

  const Item = ({ icon, primary, secondary }) => {
    const styles = {
      itemWrapper: {
        my: '30px',
        backgroundColor: active === primary && colors.blueAccent[800],
        cursor: 'pointer',
        borderRadius: '3%',
      },
      avatar: {
        backgroundColor:
          active === primary
            ? colors.greenAccent[500]
            : colors.greenAccent[700],
      },
    };
    return (
      <Box sx={styles.itemWrapper} onClick={() => setActive(primary)}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={styles.avatar}>{icon}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Box>
    );
  };

  return (
    <Box sx={styles.container}>
      <Header title="Settings" subtitle="Set Automation Parameters" />
      <Box sx={styles.listWrapper}>
        <List>
          <Item
            icon={<ElectricBoltIcon />}
            primary="Batteries"
            secondary="last updated: Jan 9, 2023"
          />
          <Item
            icon={<OpacityIcon />}
            primary="Tanks"
            secondary="last updated: Jan 7, 2023"
          />
          <Item
            icon={<BeachAccessIcon />}
            primary="Something Else"
            secondary="last updated: July 20, 2023"
          />
        </List>
        <Box sx={styles.controls}>
          <Box>
            <Displayed selected={active} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Settings;
