import React from "react";
import { useAuth } from "../lib/authService";

export default function CustomerLayout({ children }) {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return children;
  } else {
    return <>Wait...</>;
  }
}
