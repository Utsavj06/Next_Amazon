import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
  },
  grow: {
    flexGrow: 1,
  },
  section: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  form: {
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial",
  },
  transparentBackgroud: {
    backgroundColor: "transparent",
  },
  error: {
    color: '#f04040',
  },
});

export default useStyles;
