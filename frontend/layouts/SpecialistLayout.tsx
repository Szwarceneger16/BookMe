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
const SECTION_PREFIX = "/specialist";

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
    name: "Ustawienia",
    icon: <SettingsIcon />,
    href: SECTION_PREFIX + "/settings",
  },
];

export default function SpecialistLayout({ children }) {
  const isAuth = useAuth(AccountTypes.EMPLOYEE);

  if (isAuth !== true) {
    return <FullSizeLoading />;
  } else {
    return <Drawer items={ITEMS}>{children}</Drawer>;
  }
}
