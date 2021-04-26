import React from "react";
import Drawer from "../components/dashboard/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import { useAuth } from "../lib/authService";

const ITEMS = [
  {
    name: "Strona główna",
    icon: <HomeIcon />,
    href: "/user/dashboard",
  },
  {
    name: "Twoje wizyty",
    icon: <FolderSharedIcon />,
    subitems: [
      {
        name: "Odwołaj",
        href: "/user/remove",
      },
      {
        name: "Pokaż wszystkie",
        href: "/user/all",
      },
    ],
  },
];

export default function CustomerLayout({ children }) {
  useAuth();
  return <Drawer items={ITEMS}>{children}</Drawer>;
}
