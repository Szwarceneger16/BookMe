import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import DrawerItems from "./DrawerItems";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import useStyles from "./styles/DrawerStyles";

export default function AppDrawer({ children, items, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //
  // Notifications
  //
  const [anchorNotificationsEl, setAnchorNotificationsEl] = React.useState(
    null
  );
  const areNotificationsOpen = Boolean(anchorNotificationsEl);

  const handleNotificationsOpen = (event) => {
    setAnchorNotificationsEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorNotificationsEl(null);
  };

  const notificationsId = "notifications";
  const renderNotifications = (
    <Menu
      anchorEl={anchorNotificationsEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={notificationsId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={areNotificationsOpen}
      onClose={handleNotificationsClose}
      className={classes.messagesContainer}
    >
      <Typography variant="h5" className={classes.messagesTitle}>
        Powiadomienia
      </Typography>
      <Divider />
      {[0, 1, 2].map((item) => (
        <MenuItem
          onClick={handleNotificationsClose}
          key={item}
          className={classes.messageItem}
        >
          <Avatar className={classes.notificationIcon}>
            <AssignmentIcon />
          </Avatar>
          <div className={classes.messageTexts}>
            <Typography className={classes.messageName}>
              Nadchodzące wydarzenie
            </Typography>
            <Typography className={classes.messageShort}>
              Za <b>2 dni</b> odbędzie się Twoja wizyta
            </Typography>
          </div>
        </MenuItem>
      ))}
      <div className={classes.messagesExpandMore}>
        <Button
          endIcon={
            <ExpandMoreIcon color="inherit" aria-label="show more messages" />
          }
        >
          Pokaż wszystko
        </Button>
      </div>
    </Menu>
  );
  //End notifictions

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box flexGrow={1}></Box>
          {/*TODO: Add functionality when notification api will be working*/}
          <IconButton
            aria-label="show 17 new notifications"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={4} color="primary">
              <Notifications className={classes.appBarIcon} />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerItems items={items} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerItems items={items} />
          </Drawer>
        </Hidden>
      </nav>
      {renderNotifications}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
