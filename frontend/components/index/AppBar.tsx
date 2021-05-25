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

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  useLogin();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
      <MenuItem className={classes.mobileMenu}>
        <Link href="/register">
          <Button variant="contained" color="primary">
            Zarejestruj się
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href={!isLoggedIn ? "/login" : "/user/dashboard"}>
          <Button variant="contained" color="primary">
            {!isLoggedIn ? "Zaloguj się" : "Panel klienta"}
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        {isLoggedIn && (
          <Link href="/admin/dashboard">
            <Button variant="contained" color="primary">
              Panel Admina
            </Button>
          </Link>
        )}
      </MenuItem>
      <MenuItem>
        {isLoggedIn && (
          <Link href="/specialist/dashboard">
            <Button variant="contained" color="primary">
              Panel Specjalisty
            </Button>
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <BookMeLogo />
          {/* =========== SEARCH SECTION */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link href="/register">
              <Button variant="contained" color="secondary">
                Zapisz się
              </Button>
            </Link>
            <Link href={!isLoggedIn ? "/login" : "/user/dashboard"}>
              <Button variant="contained" color="primary">
                {!isLoggedIn ? "Zaloguj się" : "Panel klienta"}
              </Button>
            </Link>
            {isLoggedIn && (
              <Link href="/admin/dashboard">
                <Button variant="contained" color="primary">
                  Panel Admina
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/specialist/dashboard">
                <Button variant="contained" color="primary">
                  Panel Specjalisty
                </Button>
              </Link>
            )}
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
