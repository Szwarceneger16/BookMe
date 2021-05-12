import React, { useEffect } from "react";
import Drawer from "../components/dashboard/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import SettingsIcon from "@material-ui/icons/Settings";
import { useAuth } from "../lib/authService";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
        href: SECTION_PREFIX + "/cancel",
      },
      {
        name: "Pokaż wszystkie",
        href: SECTION_PREFIX + "/all",
      },
    ],
  },
  {
    name: "Zapisz się na wizytę",
    icon: <EventAvailableIcon />,
    href: "/register",
  },
  {
    name: "Ustawienia",
    icon: <SettingsIcon />,
    href: SECTION_PREFIX + "/settings",
  },
];

export default function CustomerLayout({ children }) {
  //const [isAuth, setIsAuth] = React.useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const isAuth = useAuth();

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
