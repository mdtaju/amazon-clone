import './App.css';
import Header from './Component/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cart from './Component/Cart/Cart';
import Home from './Component/Home/Home';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { db } from './Component/firebaseConfig';
import Login from './Component/Login/Login';

function App() {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cartItems, setCartItems] = useState([])

  const getCartItems = () => {
    db.collection('CartItems').onSnapshot((snapshot) => {
      let tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data()
      }))
      setCartItems(tempItems)
    })
  }

  useEffect(() => {
    getCartItems()
  }, [])
  return (
    <Router>
      <Container>
        <Header user={User} CartItems={cartItems} SetUser={setUser}/>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/cart'>
            <Cart getItems={cartItems}/>
          </Route>
          <Route path='/login'>
            <Login user={User} SetUser={setUser} GetUser={setUser}/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;


const Container = styled.div``