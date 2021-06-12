import React from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebaseConfig';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    }
  }));

const Product = ({title, price, image, rate, Id}) => {

    const classes = useStyles();
    
    const addToCart = () => {
        const CartItem = db.collection('CartItems').doc(Id);
        CartItem.get()
        .then((doc) => {
            if(doc.exists) {
                CartItem.update({
                    quantity: doc.data().quantity + 1
                })
            } else {
                db.collection('CartItems').doc(Id).set({
                    name: title,
                    image: image,
                    price: price,
                    rating: rate,
                    quantity: 1
                })

            }
        })
    }

    return (
        <Products>
            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>${price}</ProductPrice>
            <ProductRating className={classes.root}>
                <Rating name="half-rating-read" value={rate} precision={0.5} readOnly />
                {/* {
                    Array(rate)
                    .fill()
                    .map(rating => <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />)
                } */}
                
            </ProductRating>
            <ProductImage src={image} />
            <ButtonAria>
                <Button onClick={() => {addToCart()} } className='buttonStyle'>
                    Add to cart
                </Button>
                {/* <AddToCartButton onClick={() => {addToCart()} }>Add to cart</AddToCartButton> */}
            </ButtonAria>
        </Products>
    );
};

export default Product;

const Products = styled.div`
    background-color: white;
    // max-height: 500px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 20px;
    flex: 1;
    justify-content: space-between;
    // align-items: center;


    // background-color: white;
    // padding: 20px;
    // margin: 1%;
    // flex: 0 48%;
    // z-index: 100;
    // max-height: 450px;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
`
const ProductTitle = styled.p``
const ProductPrice = styled.p`
    margin-top: 7px;
    font-weight: 700
`
const ProductRating = styled.div`
    margin-top: 3px
`
const ProductImage = styled.img`
    max-height: 200px;
    width: 100%;
    object-fit: contain;
    margin: 30px auto;
    
`
const ButtonAria = styled.div`
    display: grid;
    place-items: center;
`
// const AddToCartButton = styled.button`
    // width: 100px;
    // height: 30px;
    // background-color: #f0c14b;
    // border: 2px solid #a88734;
    // border-radius: 2px;
    // cursor: pointer;
// `