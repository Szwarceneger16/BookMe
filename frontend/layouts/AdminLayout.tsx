import React from "react";
import Drawer from "../components/dashboard/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsIcon from "@material-ui/icons/Settings";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import { useAuth } from "../lib/authService";
import FullSizeLoading from "../components/common/FullSizeLoading";
import { AccountTypes } from "../lib/types";

//Same like folder in pages
const SECTION_PREFIX = "/admin";

const ITEMS = [
  {
    name: "Strona główna",
    icon: <HomeIcon />,
    href: SECTION_PREFIX + "/dashboard",
  },
  {
    name: "Wizyty",
    icon: <EventNoteIcon />,
    href: SECTION_PREFIX + "/visits/all",
  },
  {
    name: "Miejsca",
    icon: <PlaceIcon />,
    href: SECTION_PREFIX + "/places",
  },
  {
    name: "Pracownicy",
    icon: <PeopleIcon />,
    href: SECTION_PREFIX + "/employees",
  },
  {
    name: "Godziny pracy",
    icon: <EventNoteIcon />,
    href: SECTION_PREFIX + "/workHours/manage",
  },
  {
    name: "Ustawienia konta",
    icon: <SettingsIcon />,
    href: SECTION_PREFIX + "/settings",
  },
];

export default function AdminLayout({ children }) {
  const isAuth = useAuth(AccountTypes.ADMIN);

  if (!isAuth) {
    return <FullSizeLoading />;
  } else {
    return <Drawer items={ITEMS}>{children}</Drawer>;
  }
}
