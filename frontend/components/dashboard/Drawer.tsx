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
  Container,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Notifications } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import useStyles from "./styles/DrawerStyles";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { AccountTypes } from "../../lib/types";

export default function AppDrawer({ children, items, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const [counter, setCounter] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //
  // Notifications
  //
  const [anchorNotificationsEl, setAnchorNotificationsEl] =
    React.useState(null);
  const areNotificationsOpen = Boolean(anchorNotificationsEl);

  const handleNotificationsOpen = (event) => {
    setAnchorNotificationsEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorNotificationsEl(null);
  };

  React.useEffect(() => {
    if (user.account_type == AccountTypes.CLIENT) {
      axios
        .get(process.env.BACKEND_HOST + "/notifications/list")
        .then((res) => {
          setCounter(res.data.data.counter);
          setNotifications(res.data.data.reservations);
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
      {counter > 0 ? (
        notifications.map((item, index) => (
          <MenuItem
            onClick={handleNotificationsClose}
            key={index}
            className={classes.messageItem}
          >
            <Avatar className={classes.notificationIcon}>
              <AssignmentIcon />
            </Avatar>
            <div className={classes.messageTexts}>
              <Typography className={classes.messageName}>
                Nadchodząca wizyta
              </Typography>
              <Typography className={classes.messageShort}>
                <b>{item.time_left}</b> odbędzie się {item.title}.
              </Typography>
            </div>
          </MenuItem>
        ))
      ) : (
        <Typography style={{ width: "100%", textAlign: "center", padding: 8 }}>
          Aktualnie nie masz żadnych wydarzeń 🤷‍♂️
        </Typography>
      )}
      <Link href="/user/edit">
        <div className={classes.messagesExpandMore}>
          <Button
            endIcon={
              <ExpandMoreIcon color="inherit" aria-label="show more messages" />
            }
          >
            Pokaż wszystko
          </Button>
        </div>
      </Link>
    </Menu>
  );
  //End notifictions

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box flexGrow={1}></Box>
          {/*TODO: Add functionality when notification api will be working*/}
          <IconButton
            aria-label="show 17 new notifications"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={counter} color="primary">
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
        <Container maxWidth="lg">{children}</Container>
      </main>
    </div>
  );
}
