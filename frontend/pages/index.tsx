import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    color: {
      color: red[500]
    }
  })
)

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" component="h1" className={classes.color}>Strona główna</Typography>
    </>
  )
}
