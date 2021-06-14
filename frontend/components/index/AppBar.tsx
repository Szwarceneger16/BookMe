import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Icon,
  Button,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  CalendarToday,
} from "@material-ui/icons";
import Link from "next/link";

import useStyles from "./styles/AppBar";
import BookMeLogo from "../common/BookMeLogo";
import { useLogin } from "../../lib/authService";
import { useSelector } from "react-redux";
import { AccountTypes } from "../../lib/types";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  useLogin();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      color="default"
      className={classes.mobileMenu}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link href={!isLoggedIn ? "/login" : "/user/dashboard"}>
          <Button variant="outlined" color="primary">
            {!isLoggedIn ? "Zaloguj się" : "Panel klienta"}
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        {isLoggedIn && (
          <Link href="/admin/dashboard">
            <Button variant="outlined" color="primary">
              Panel Admina
            </Button>
          </Link>
        )}
      </MenuItem>
      <MenuItem>
        {isLoggedIn && (
          <Link href="/specialist/dashboard">
            <Button variant="outlined" color="primary">
              Panel Specjalisty
            </Button>
          </Link>
        )}
      </MenuItem>
      <MenuItem className={classes.mobileMenu}>
        <Link href="/register">
          <Button variant="contained" color="primary">
            Zapisz się
          </Button>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <BookMeLogo />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!isLoggedIn && (
              <Link href="/login">
                <Button variant="outlined" color="primary">
                  Zaloguj się
                </Button>
              </Link>
            )}
            {isLoggedIn && user?.account_type === AccountTypes.CLIENT && (
              <Link href="/user/dashboard">
                <Button variant="outlined" color="primary">
                  Panel Klienta
                </Button>
              </Link>
            )}
            {isLoggedIn && user?.account_type === AccountTypes.ADMIN && (
              <Link href="/admin/dashboard">
                <Button variant="outlined" color="primary">
                  Panel Admina
                </Button>
              </Link>
            )}
            {isLoggedIn && user?.account_type === AccountTypes.EMPLOYEE && (
              <Link href="/specialist/dashboard">
                <Button variant="outlined" color="primary">
                  Panel Specjalisty
                </Button>
              </Link>
            )}
            <Link href="/register">
              <Button variant="contained" color="primary">
                Zapisz się
              </Button>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
