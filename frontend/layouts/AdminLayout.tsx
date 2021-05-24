import React, { useEffect } from "react";
import Drawer from "../components/dashboard/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsIcon from "@material-ui/icons/Settings";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import { useAuth } from "../lib/authService";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
    name: "Godizny pracy",
    icon: <EventNoteIcon />,
    href: SECTION_PREFIX + "/workHours/manage",
    // subitems: [
    //   {
    //     name: "Odwołaj",
    //     href: SECTION_PREFIX + "/remove",
    //   },
    //   {
    //     name: "Pokaż wszystkie",
    //     href: SECTION_PREFIX + "/visits/all",
    //   },
    //   {
    //     name: "Dodaj",
    //     href: SECTION_PREFIX + "/all",
    //   },
    // ],
  },
  // {
  //   name: "Edytuj",
  //   icon: <EventNoteIcon />,
  //   subitems: [
  //     {
  //       name: "Pracownika",
  //       href: SECTION_PREFIX + "/remove",
  //     },
  //     {
  //       name: "Rodzaj usługi",
  //       href: SECTION_PREFIX + "/all",
  //     }
  //   ],
  // },
  {
    name: "Ustawienia placówki",
    icon: <SettingsIcon />,
    href: SECTION_PREFIX + "/settings",
  },
];

export default function CustomerLayout({ children }) {
  const isAuth = useAuth();

  if (!isAuth) {
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
