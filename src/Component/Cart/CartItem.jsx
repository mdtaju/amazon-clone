import React from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';

const CartItem = ({ Item }) => {
    let options = []

    for (let i = 1; i < Math.max(Item.product.quantity + 1, 51); i++) {
        options.push(<option value={i}> Qty: {i}</option>)
    }

    const SelectQuantity = (Quantity) => {
        db.collection('CartItems').doc(Item.id).update({
            quantity: parseInt(Quantity)
        })
    }

    const DeleteItem = (e) => {
        e.preventDefault()
        db.collection('CartItems').doc(Item.id).delete()
    }

    return (
        <Container>
            <ImageContainer>
                <img src={Item.product.image} alt="" />
            </ImageContainer>
            <MainInfoContainer>
                <TopInfoContainer>
                    <h3>{Item.product.name}</h3>
                </TopInfoContainer>
                <BottomInfoContainer>
                    <QuantityContainer>
                        <select value={Item.product.quantity} onChange={(e) => SelectQuantity(e.target.value)}>
                            {options}
                        </select>
                    </QuantityContainer>
                    <DeleteContainer onClick={DeleteItem}>
                        Delete
                    </DeleteContainer>
                </BottomInfoContainer>
            </MainInfoContainer>
            <PriceContainer>
                <h3>${Item.product.price}</h3>
            </PriceContainer>
        </Container>
    );
};

export default CartItem;

const Container = styled.div`
    display: flex;
    padding: 12px 0px;
    border-bottom: 1px solid #DDD;
`

const ImageContainer = styled.div`
    height: 180px;
    width: 180px;
    margin-right: 18px;
    flex-shrink: 0;
    flex-grow: 0;
    img {
        object-fit: contain;
        height: 100%;
        width: 100%;
    }
`

const MainInfoContainer = styled.div`
    flex-grow: 1;
`

const TopInfoContainer = styled.div`
    h3 {
        color: #007185;
        font-size: 18px;
    }
`
const BottomInfoContainer = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
`

const QuantityContainer = styled.div`
    select {
        background-color: #F0F2F2;
        padding: 8px;
        border-radius: 7px;
        box-shadow:  0 2px 5px rgba(15,17,17,.15);
        :focus {
            outline: none;
        }
    }
`
const DeleteContainer = styled.div`
    color: #007185;
    margin-left: 16px;
    cursor: pointer;
`

const PriceContainer = styled.div`
    h3 {
        font-size: 18px;
        font-weight: 700;
        margin-left: 16px;
    }
`