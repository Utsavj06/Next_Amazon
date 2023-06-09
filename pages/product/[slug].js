import React, {useContext} from "react";
import { useRouter } from "next/router";
import data from "../../utils/data";
import { Layout } from "../../components/Layout";
import { Button, Card, Grid, Link, List, ListItem, Typography } from "@mui/material";
import useStyles from "../../utils/style";
import Image from "next/image";
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from "../../utils/Store";
import axios from "axios";

const ProductScreen = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {product} = props;
  const classes = useStyles();
  // const router = useRouter();
  // const { slug } = router.query;
  // const product = data.products.find((a) => a.slug === slug);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock <= 0) {
      window.alert('Sorry. Product is out of stock');
      return;
     }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className={classes.section}>
          <Link href='/'>
            <Typography>back to products</Typography>
          </Link>
      </div>
      <Grid spacing={1}>
        <Grid item md={6} xs={12} >
          <Image
            src={product.image}
            alt={product.name}
            width={320}
            height={320}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={product.rating} readOnly></Rating> */}
              {/* <Link href="#reviews"> */}
                <Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography>
              {/* </Link> */}
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;
  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
      // products
    },
  };
}
