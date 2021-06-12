import React from 'react';
import styled from 'styled-components';
import CartItems from './CartItems';
import CartTotal from './CartTotal';

const Cart = ({ getItems }) => {
    return (
        <Container>
            <CartItems cartItems={getItems}/>
            <CartTotal cartItems={getItems}/>
        </Container>
    );
};

export default Cart;

const Container = styled.div`
    display: flex;
    padding: 14px 18px 0px 18px;
    align-items: flex-start;
`