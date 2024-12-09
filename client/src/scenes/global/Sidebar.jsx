import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import OpacityIcon from '@mui/icons-material/Opacity';
import UserSelect from '../../components/UserSelect';
import { users } from '../../data/users';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isCollapsed, setIsCollapsed, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState(users[0]);

  const styles = {
    container: {
      '& .pro-sidebar-inner': {
        background: `${colors.primary[400]} !important`,
      },
      '& .pro-icon-wrapper': {
        backgroundColor: 'transparent !important',
      },
      '& .pro-inner-item': {
        padding: '5px 35px 5px 20px !important',
      },
      '& .pro-inner-item:hover': {
        color: '#868dfb !important',
      },
      '& .pro-menu-item.active': {
        color: '#6870fa !important',
      },
    },
    menu: {
      menuItem: {
        margin: '10px 0 20px 0',
        color: colors.grey[100],
      },
      wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ml: '15px',
      },
    },
    user: {
      container: {
        mb: '25px',
      },
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      typographyWrapper: {
        textAlign: 'center',
      },
      typography: {
        color: colors.grey[100],
        fontWeight: 'bold',
        m: '10px 0 0 0',
      },
      accessLevel: {
        color: colors.greenAccent[500],
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={styles.menu.menuItem}
          >
            {!isCollapsed && (
              <Box sx={styles.menu.wrapper}>
                <Typography variant="h3" color={colors.grey[100]}>
                  Menu
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box sx={styles.user.container}>
              <Box sx={styles.user.wrapper}>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user.image}
                  style={{ borderRadius: '50%' }}
                />
              </Box>
              <Box sx={styles.user.typographyWrapper}>
                <Typography variant="h2" sx={styles.user.typography}>
                  {user.name}
                </Typography>
                <Typography sx={styles.user.accessLevel} variant="h5">
                  Access Level: {user.access}
                </Typography>
                <UserSelect users={users} setUser={setUser} />
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Battery Status"
              to="/batteries"
              icon={<ElectricBoltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tanks"
              to="/tanks"
              icon={<OpacityIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Cellular Antenna"
              to="/cellbooster"
              icon={<SignalCellularAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
