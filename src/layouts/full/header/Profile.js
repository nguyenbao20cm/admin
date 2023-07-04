import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useEffect } from 'react';
import { variable } from '../../../Variable';
import { NavLink } from 'react-router-dom';
import { IconListCheck, IconMail, IconUser, IconHistory } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const getToken = (() => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  })
  var [Account, setAccount] = React.useState([]);
  useEffect(() => {
    const token = getToken();
    fetch(variable.API_URL + "Account/GetDetailAccount", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setAccount(data)
      })
  }, []);
  const history = useNavigate();
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleSignOut = () => {
    localStorage.clear()
    window.location.reload(false);
  };
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={'https://localhost:7067/wwwroot/Image/Avatar/' + Account.avatar}
          alt={'https://localhost:7067/wwwroot/Image/Avatar/' + Account.avatar}
          sx={{
            width: 50,
            height: 50,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText onClick={() => {
            history("/TaiKhoan")
          }}>Tài khoản</ListItemText>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem> */}
        <MenuItem>
          <ListItemIcon>
            <IconHistory width={20} />
          </ListItemIcon>
          <ListItemText onClick={() => {
            history("/LichSuThaoTac")
          }}>Lịch sử thao tác</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth onClick={handleSignOut}>
            Đăng xuất
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
