import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { db } from '../firebaseConfig';

const Home = () => {
    const [Items, setItems] = useState([]);

    const GetProducts = () => {
        db.collection('products').onSnapshot((snapshot) => {
            let tempProduct = [];
            tempProduct = snapshot.docs.map((doc) => ({
                id: doc.id,
                products: doc.data()
            }));
            setItems(tempProduct);
            // console.log(Items)
        })
    }

    useEffect(() => {
        GetProducts()
    }, [])

    return (
        <Container>
            <Banner>

            </Banner>
            <Content>
                <HomeRow>
                    {
                        Items.slice(0, 2).map((data) => (
                            <Product 
                                title={data.products.name}
                                price={data.products.price}
                                image={data.products.img}
                                rate={data.products.rating}
                                key={data.id}
                                Id={data.id}
                            />
                        ))
                    }
                </HomeRow>
                <HomeRow>
                    {
                        Items.slice(2, 5).map((data) => (
                            <Product 
                                title={data.products.name}
                                price={data.products.price}
                                image={data.products.img}
                                rate={data.products.rating}
                                key={data.id}
                                Id={data.id}
                            />
                        ))
                    }
                </HomeRow>
                <HomeRow>
                    {
                        Items.slice(5).map((data) => (
                            <Product 
                                title={data.products.name}
                                price={data.products.price}
                                image={data.products.img}
                                rate={data.products.rating}
                                key={data.id}
                                Id={data.id}
                            />
                        ))
                    }
                </HomeRow>
            </Content>

        </Container>
    );
};

export default Home;

const Container = styled.section`
    max-width: 1500px;
    margin: 0px auto;
`
const Banner = styled.div`
    background-image: url("https://i.imgur.com/SYHeuYM.jpg");
    min-height: 600px;
    background-size: cover;
    background-position: center;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 1;
`
const Content = styled.div`
    margin-top: -350px;
    padding-left: 10px;
    padding-right: 10px;
    // display: flex;
    // flex-wrap: wrap;
    // align-items: stretch;
`
const HomeRow = styled.div`
    display: flex
`