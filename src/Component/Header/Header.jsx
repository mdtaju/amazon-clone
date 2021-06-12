import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import { Auth } from '../firebaseConfig';

const Header = ({ CartItems, user, SetUser }) => {

    const TotalItems = () => {
        let ItemsCounter = 0;
        CartItems.forEach(item => {
            ItemsCounter += item.product.quantity
        })
        return ItemsCounter;
    }

    const UserLogout = () => {
        Auth.signOut().then(() => {
            localStorage.removeItem('user');
            SetUser(null);
        }).catch(err => {
            alert(err.message)
        })
    }

    return (
        <MainHeader>
            <Link to='/'>
                <HeaderLogo>
                    <img src={"https://mikekitko.com/wp-content/uploads/2019/10/amazon-logo-white-768x232.png"} alt="Logo" />
                </HeaderLogo>
            </Link>
            <HeaderLocation>
                <LocationOnIcon />
                <HeaderLocationTextContainer>
                    <HeaderTextLineOne className='header_locationLineOne'>Hello</HeaderTextLineOne>
                    <HeaderTextLineTwo className='header_locationLineOne'>Select Your Location</HeaderTextLineTwo>
                </HeaderLocationTextContainer>
            </HeaderLocation>
            <HeaderSearch>
                <HeaderSearchInput type='text'/>
                <SearchIconContainer>
                    <SearchIcon />
                </SearchIconContainer>
            </HeaderSearch>
            <HeaderNavItems>
                <Link to='/login'>
                    <HeaderNavItemOne>
                        <HeaderTextLineOne>Hello, 
                            { 
                                user ? <span> {user.Name}</span>
                                     : <span> Mr. X</span>
                            }
                        </HeaderTextLineOne>
                        <HeaderTextLineTwo>
                            {
                                user ? <span>Account & list</span>
                                     : <span>Please Login</span>
                            }
                        </HeaderTextLineTwo>
                    </HeaderNavItemOne>
                </Link>
                <HeaderNavItemTwo>
                    <HeaderTextLineOne>Returns</HeaderTextLineOne>
                    <HeaderTextLineTwo>& Orders</HeaderTextLineTwo>
                </HeaderNavItemTwo>
                {
                    user && 
                    <HeaderNavItemOne onClick={() => UserLogout()}>
                        Logout
                    </HeaderNavItemOne>
                }
                <Link to='/cart'>
                    <HeaderNavItemTree>
                        <ShoppingBasketIcon />
                        <CartCount>{TotalItems()}</CartCount>
                    </HeaderNavItemTree>
                </Link>
            </HeaderNavItems>
        </MainHeader>
    );
};

export default Header;

const MainHeader = styled.div`
    height: 68px;
    background-color: #0f1111;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0% 2%;
    position: sticky;
    top: 0;
    z-index: 101;
    a {
        text-decoration: none;
        color: white
    }
`

const HeaderLogo = styled.div`
    padding: 3px 9px;
    margin: 0px 1px;
    cursor: pointer;
    border: 1px solid transparent;
    :hover {
        border: 1px solid white;
        border-radius: 1px;
    }
    img {
        width: 100px;
    }
`
const HeaderLocation = styled.div`
    padding: 3px 9px;
    margin: 0px 1px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    :hover {
        border: 1px solid white;
        border-radius: 1px;
    }
`
const HeaderLocationTextContainer = styled.div``
const HeaderTextLineOne = styled.div`
    color: white;
`
const HeaderTextLineTwo = styled.div`
    font-weight: 700;
`

const HeaderSearch = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin: 0px 9px;
    background: white;
    border-radius: 4px;
    :focus-within {
        box-shadow: 0 0 0 3px #F90;
    }
`

const HeaderSearchInput = styled.input`
    flex-grow: 1;
    height: 40px;
    border-radius: 4px;
    border: none;
    padding: 0px 15px;
    :focus {
        outline: none;
    }
`
const SearchIconContainer = styled.div`
    background-color: #febd69;
    width: 45px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: black;
    border-radius: 0px 4px 4px 0px;
    :hover {
        background-color: #f3a847;
    }
`

const HeaderNavItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: around
`
const HeaderNavItemOne = styled.div`
    padding: 3px 9px;
    margin: 0px 1px;
    cursor: pointer;
    border: 1px solid transparent;
    :hover {
        border: 1px solid white;
        border-radius: 1px;
    }
`
const HeaderNavItemTwo = styled.div`
    padding: 3px 9px;
    margin: 0px 1px;
    cursor: pointer;
    border: 1px solid transparent;
    :hover {
        border: 1px solid white;
        border-radius: 1px;
    }
`
const HeaderNavItemTree = styled.div`
    padding: 3px 9px;
    margin: 0px 1px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    cursor: pointer;
    :hover {
        border: 1px solid white;
        border-radius: 1px;
    }
`
const CartCount = styled.span`
    color: #f3a847;
    margin-left: 3px;
    font-weight: 700 
`
