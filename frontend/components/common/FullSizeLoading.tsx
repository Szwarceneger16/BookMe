import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function FullSizeLoading() {
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
}
