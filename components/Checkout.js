import React from 'react';
import Subtotal from './Subtotal';
import '../styles/checkout.css';
import { useStateValue } from './StateProvider.js';
import CheckoutProduct from './CheckoutProduct.js';
import FlipMove from 'react-flip-move';

function Checkout() {
    
    const [{ basket } ] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images.pexels.com/photos/1080722/pexels-photo-1080722.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt="checkout ad"/>

                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
                    {basket.length === 0 ? (
                        <div>Empty Basket</div>
                    ) : (
                        <FlipMove>
                            {basket.map((item, i) => (
                                <div key={i}>
                                    <CheckoutProduct
                                        hideBtn={false}
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                    />
                                </div>
                            ))}
                        </FlipMove>
                    )}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout;
