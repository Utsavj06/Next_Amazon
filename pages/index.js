import { Inter } from "next/font/google";
import { Layout } from "../components/Layout";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';

const inter = Inter({ subsets: ["latin"] });

function Home(props) {

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const { products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <div>
      <Layout>
        <div>
          <h1>Products</h1>
          <Grid container spacing={3}>
            {/* {data.products.map((product) => { */}
            {products.map((product) => {
              return (
               <Grid item md={4} key={product.name}>
                <Card>
                  <Link href={`/product/${product.slug}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                    <CardActions>
                      <Typography>${product.price}</Typography>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => addToCartHandler(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                </Card>
              </Grid>
              )
            })}
          </Grid>
          {/* <ul>
            <li>Products 1</li>
            <li>Products 2</li>
            <li>Products 3</li>
          </ul> */}
        </div>
      </Layout>
    </div>
  );
}

export default dynamic (() => Promise.resolve(Home), {ssr:false})

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
      // products
    },
  };
}