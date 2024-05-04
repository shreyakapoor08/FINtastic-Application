import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemText,
  Badge,
  MenuItem
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Notification from '../notifications/Notification';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import axios from "axios";

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openNotificationPopup, setOpenNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isLoggedIn = localStorage.getItem("token");
  const [profileImage, setProfileImage] = useState("/images/userProfile.png");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navItems = [
    { title: "Home", path: "/home" },
    { title: "Contact", path: "/contactus" },
    { title: "FAQs", path: "/faq" },
    { title: "Sign up", path: "/signup" },
    { title: "Login", path: "/login" }
  ];

  const loggedInItems = [
    { title: "Dashboard", path: '/dashboard' },
    { title: "My Expenses", path: '/listexpenses' },
    { title: "My Reminders", path: "/listreminders" },
    { title: "Budget Planner", path: '/budget-planner' },
    ...(isSubscribed ? [{ title: "OKR", path: '/okrhome' }] : [{ title: "Explore Pro", path: '/whatsnew' }]),
  ];
  
  const drawerWidth = 240;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("sessionId");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
      fetchProfileImage();
      isSubscribedUser();
    }
  }, [isLoggedIn]);

  const isSubscribedUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      if (token) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = response.data.user;
        setIsSubscribed(user.isSubscribed);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchProfileImage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/documents/getProfilePhoto`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success && data.document.length > 0) {
          const lastImageIndex = data.document.length - 1;
          const lastImage = data.document[lastImageIndex];
          setProfileImage(lastImage.s3Path);
        }
      } else {
        console.error("Failed to fetch profile image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notification/get-all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      } else {
        console.error(response);
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error(error);
      console.error('Error fetching notifications:', error.message);
    }
  };

  const handleNotificationClick = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notification/get-all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
          setOpenNotificationPopup(true);
          setHasNewNotifications(false);
        } else {
          console.error(response);
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error(error);
        console.error('Error fetching notifications:', error.message);
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        FINtastic
      </Typography>

      <Divider />

      {!isLoggedIn && (
        <List>
          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {isLoggedIn && (
        <List>
          {loggedInItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  const settings = [
    { title: "My documents", path: '/addDocument' },
    { title: 'Profile', path: '/profile' },
    { title: "My Calendar", path: '/calendar' },
    
    { title: 'FAQ', path: '/faq' },
    { title: 'Contact Us', path: '/contactus' },
    { title: 'Logout', path: '/login' },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: "#4c4b42" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            FINtastic
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLoggedIn ? (
              loggedInItems.map((item) => (
                <Button key={item.title}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                </Button>
              ))
            ) : (
              navItems.map((item) => (
                <Button key={item.title}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                </Button>
              ))
            )}
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                color="inherit"
                onClick={handleNotificationClick}>
                <Badge color="error" variant="dot" invisible={!hasNewNotifications}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Notification
                open={openNotificationPopup}
                onClose={() => setOpenNotificationPopup(false)}
                notifications={notifications}
              />
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={profileImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  if ((isLoggedIn && ['Logout', 'Profile', 'Messages', 'My Calendar', 'OKR', 'FAQ', 'My documents', 'Contact Us'].includes(setting.title)) ||
                    (!isLoggedIn && !['Logout', 'Profile', 'Messages', 'My Calendar', 'OKR', 'FAQ', 'My documents', 'Contact Us'].includes(setting.title))) {
                    return (
                      <MenuItem key={setting.title} onClick={setting.title === 'Logout' ? handleLogout : handleCloseUserMenu} component={Link} to={setting.path}>
                        <Typography textAlign="center">{setting.title}</Typography>
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );

}