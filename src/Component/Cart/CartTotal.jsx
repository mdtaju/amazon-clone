import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';

const CartTotal = ({ cartItems }) => {

    const SubTotalPrice = () => {
        let MoneyBag = []
        cartItems.forEach(item => {
            let Total = item.product.quantity * item.product.price
            MoneyBag.push(Total)
        })
        const MainBank = MoneyBag.reduce((a, b) => a + b, 0)
        return MainBank;
    }

    const TotalItems = () => {
        let Items = 0;
        cartItems.forEach(item => {
            Items += item.product.quantity
        })
        return Items
    }

    return (
        <Container>
            <SubTotal><h3>Subtotal ({TotalItems()} items) :</h3> 
                <h3>
                    <NumberFormat value={SubTotalPrice().toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </h3>
            </SubTotal>
            <Button className='ProceedButtonStyle'>
                Proceed to checkout
            </Button>
        </Container>
    );
};

export default CartTotal;

const Container = styled.div`
    background-color: white;
    padding: 20px;
    flex: 0.3
`

const SubTotal = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
`