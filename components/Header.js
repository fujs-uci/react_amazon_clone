import React from 'react';
import '../styles/header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider.js';
import { auth } from './firebase.js';


function Header() {
    const [{ basket, user }, dispatch ] = useStateValue();

    const handleAuth = () => {
        if (user) {
            auth.signOut();
        }
    };

    return (
        <div className="header">
            {/** Brand */}
            <Link to="/">
                <img
                    className="header__logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                    alt="Amazon Clone"/>
            </Link>
            {/** SearchBar */}
            <div className="header__search">
                <input
                    className="header__searchInput"
                    type="text"/>
                {/** Search icon */}
                <SearchIcon
                    className="header__searchIcon"/>
            </div>
            
            {/** header nav */}
            <div className="header__nav">

                <Link to={!user ? "/login" : "/"}>
                    {/** Login */}
                    <div onClick={handleAuth}
                        className="header__option">
                        <span className="header__lineOne">
                            Hello {user ? user?.email : 'Guest'}
                        </span>
                        <span className="header__lineTwo">
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                
                <Link to="/orders">
                    {/** Orders */}
                    <div className="header__option">
                        <span className="header__lineOne">
                            Returns
                        </span>
                        <span className="header__lineTwo">
                            & Orders
                        </span>
                    </div>
                </Link>

                {/** Prime */}
                <div className="header__option">
                    <span className="header__lineOne">
                        Your
                    </span>
                    <span className="header__lineTwo">
                        Prime
                    </span>
                </div>

                <Link to="/checkout">
                    {/** Cart */}
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header__lineTwo header__basketCount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;

