import React from 'react';
import Product from './Product.js';
import '../styles/home.css';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                    className="home__image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/img20/events/Q4/Holiday/BlackFriday/TrafficDrivers/Q4_2020_BlackFriday_LU_TrafficDrivers_Desktop_Hero_v2_3000x1200._CB416729835_.jpg"
                    alt="Amazon Banner"/>

                <div className="home__row">
                    <Product
                        id="100001"
                        title="product 1"
                        price={10.95}
                        image="https://images.unsplash.com/photo-1606015218607-b9c8750a9a8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        rating={4}/>
                    <Product
                        id="200002"
                        title="A whole new world"
                        price={29.95}
                        image="https://images.unsplash.com/photo-1602524815375-a54449bb00fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        rating={3}/>         
                   <Product
                        id="300003"
                        title="Computer graphix"
                        price={1000.95}
                        image="https://images.unsplash.com/photo-1606217271751-8bfd5697c97a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        rating={2}/>

                    
                </div>
                <div className="home__row">

                </div>
                <div className="home__row">
                </div>
            </div>
            
        </div>
    )
}

export default Home;
