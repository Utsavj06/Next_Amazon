import { AppBar, Link, Toolbar, Typography, Badge,} from '@mui/material'
import { Container } from '@mui/system'
import Head from 'next/head'
import React, {useContext} from 'react'
import { Store } from '../utils/Store';
import useStyles from '../utils/style'

export const Layout = ({children, title}) => {
    const { state, dispatch } = useContext(Store);
    // const { darkMode } = state;
    const { cart } = state;
    const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazone` : 'Next Amazona'}</title>
      </Head>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <Link href='/'>
            <Typography className={classes.brand}>Next_Amazon</Typography>
          </Link>
          <div className={classes.grow}></div>
          <div style={{display:'flex'}}>
            <Link href='/cart'>
              {/* <Typography>Cart</Typography> */}
              <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
            </Link>
            <Link href='/login'>
              <Typography>Login</Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All right Reserved. c Next_Amazon</Typography>
      </footer>
    </div>
  )
}
