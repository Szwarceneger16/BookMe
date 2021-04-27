import React from "react";
import Drawer from "../components/dashboard/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsIcon from "@material-ui/icons/Settings";
import { useAuth } from "../lib/authService";
import { ExitToApp } from "@material-ui/icons";
import { logout } from "../src/actions/auth";
import { CircularProgress } from "@material-ui/core";
import { authService } from "../lib/authService";

//Same like folder in pages
const SECTION_PREFIX = "/user";

const ITEMS = [
  {
    name: "Strona główna",
    icon: <HomeIcon />,
    href: SECTION_PREFIX + "/dashboard",
  },
  {
    name: "Twoje wizyty",
    icon: <EventNoteIcon />,
    subitems: [
      {
        name: "Odwołaj",
        href: SECTION_PREFIX + "/remove",
      },
      {
        name: "Pokaż wszystkie",
        href: SECTION_PREFIX + "/all",
      },
    ],
  },
  {
    name: "Ustawienia",
    icon: <SettingsIcon />,
    href: SECTION_PREFIX + "/settings",
  },
];

export default function CustomerLayout({ children }) {
  const [isAuth, setIsAuth] = React.useState(false);
  useAuth().then((res) => {
    if (res !== isAuth) {
      setIsAuth(res);
    }
  });
  if (isAuth !== true) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return <Drawer items={ITEMS}>{children}</Drawer>;
  }
}
