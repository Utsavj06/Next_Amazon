import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import NextLink from 'next/link'
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import useStyles from "../utils/style";
import { useState } from "react";
import { useRouter } from "next/router";

export const Layout = ({ children, title }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  // const { darkMode } = state;
  const { cart, userInfo } = state;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    console.log(e)
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazone` : "Next Amazona"}</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Link href="/">
            <Typography className={classes.brand}>Next_Amazon</Typography>
          </Link>
          <div className={classes.grow}></div>
          <div style={{ display: "flex" }}>
              <Button>
                <Link href="/cart">
                  {cart.cartItems.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.cartItems.length}>
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </Button>

            {userInfo ? (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                  className={classes.navbarButton}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                  <MenuItem onClick={loginMenuCloseHandler}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              // <NextLink href="/login" passHref>
              <Button>
                <Link href="/login">Login</Link>
              </Button>
              // </NextLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All right Reserved. c Next_Amazon</Typography>
      </footer>
    </div>
  );
};
