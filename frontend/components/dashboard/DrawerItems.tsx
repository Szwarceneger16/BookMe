import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import useStyles from "./styles/DrawerItemStyles";
import { ExitToApp } from "@material-ui/icons";
import { authService } from "../../lib/authService";
import { useDispatch } from "react-redux";
import { setMessage } from "../../src/actions/message";

const LinkedSimpleItem = ({ data }) => {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = router.pathname == data.href ? true : false;
  return (
    <Link href={data.href ? data.href : ""}>
      <ListItem
        button
        onClick={data.action}
        className={clsx(classes.listItem, { [classes.selected]: isSelected })}
      >
        <ListItemIcon className={classes.itemButton}>{data.icon}</ListItemIcon>
        <ListItemText className={classes.listItemText} primary={data.name} />
      </ListItem>
    </Link>
  );
};

const LinkedCollapseItem = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();
  const isSelected = data.subitems.some((item) => router.pathname == item.href);

  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (isSelected && !open) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        className={clsx(classes.listItem, { [classes.selected]: isSelected })}
      >
        <ListItemIcon className={classes.itemButton}>{data.icon}</ListItemIcon>
        <ListItemText className={classes.listItemText} primary={data.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {data.subitems.map((itemData) => (
          <List
            component="div"
            disablePadding
            key={itemData.name}
            className={clsx(classes.subitem, {
              [classes.subitemActive]: router.pathname === itemData.href,
            })}
          >
            <Link href={itemData.href}>
              <ListItem
                button
                className={clsx(classes.listItem, classes.nested)}
              >
                <ListItemText
                  className={classes.listItemText}
                  primary={itemData.name}
                />
              </ListItem>
            </Link>
          </List>
        ))}
      </Collapse>
    </>
  );
};

const LinkedItem = ({ data, ...props }) => {
  if (!data.subitems && !data.href && !data.action) {
    throw new Error(
      "Item without childrens must have href param or action param"
    );
  }

  if (!data.subitems) {
    return <LinkedSimpleItem data={data} />;
  } else {
    return <LinkedCollapseItem data={data} />;
  }
};

export default function DrawerItems({ items }) {
  const classes = useStyles();
  const { logout } = authService();
  const dispatch = useDispatch();
  return (
    <div>
      <Typography variant="h3" component="h2" className={classes.logo}>
        BookMe
      </Typography>
      <List>
        {items.map((dataItem) => (
          <LinkedItem data={dataItem} key={dataItem.name} />
        ))}
        <ListItem
          button
          onClick={() => {
            logout();
            dispatch(setMessage("Pomyślnie się wylogowano", "success"));
          }}
          className={classes.listItem}
        >
          <ListItemIcon className={classes.itemButton}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            primary="Wyloguj się"
          />
        </ListItem>
      </List>
    </div>
  );
}
