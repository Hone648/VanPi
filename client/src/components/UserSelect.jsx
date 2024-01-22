import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

const UserSelect = ({ users, setUser }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    button: {
      color: colors.blueAccent[400],
    },
  };

  const UserDialog = ({ onClose, selectedValue, open }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleDialogClose = () => {
      onClose(selectedValue);
    };
    const handleUserClick = (user) => {
      onClose(user);
      setUser(user);
    };

    const styles = {
      avatar: {
        bgcolor: colors.blueAccent[500],
        color: colors.blueAccent[300],
      },
    };

    return (
      <Dialog onClose={handleDialogClose} open={open}>
        <DialogTitle>
          <Typography variant="h2">Select User</Typography>
        </DialogTitle>
        <List>
          {users.map((user, i) => {
            return (
              <ListItem disableGutters key={i}>
                <ListItemButton onClick={() => handleUserClick(user)}>
                  <ListItemAvatar>
                    <Avatar src={user.image} sx={styles.avatar}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <br />
      <Button
        sx={styles.button}
        size="small"
        variant="text"
        onClick={handleClickOpen}
      >
        <Typography>Switch User</Typography>
      </Button>
      <UserDialog
        onClose={handleClose}
        selectedValue={selectedValue}
        open={open}
      />
    </div>
  );
};

export default UserSelect;
