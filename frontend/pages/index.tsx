import React from "react";
import IndexLayout from "../layouts/IndexLayout";
import { 
  Typography
} from '@material-ui/core'

export default function index() {
  return (
      <>
        <Typography variant="h2" component="h1">Strona główna</Typography>
    </>
    );
}

index.Layout = IndexLayout;