import React from "react";
import Drawer from "../components/dashboard/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import SettingsIcon from "@material-ui/icons/Settings";
import { useAuth } from "../lib/authService";
import FullSizeLoading from "../components/common/FullSizeLoading";
import { AccountTypes } from "../lib/types";

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
        name: "Edytuj",
        href: SECTION_PREFIX + "/edit",
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
  const isAuth = useAuth(AccountTypes.CLIENT);

  if (isAuth !== true) {
    return <FullSizeLoading />;
  } else {
    return <Drawer items={ITEMS}>{children}</Drawer>;
  }
}
