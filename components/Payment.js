import React, { useState, useEffect } from 'react';
import '../styles/payment.css';
import { useStateValue } from './StateProvider.js';
import CheckoutProduct from './CheckoutProduct.js';
import FlipMove from 'react-flip-move';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal }  from './Reducer.js';
import { useHistory } from 'react-router-dom';
import { db, toDate } from './firebase.js';

function Payment() {

    const history = useHistory();
    const [{ basket, user }, dispatch ] = useStateValue();
    const [card, setCard ] = useState('');

    const [processing, setProcessing] = useState('');
    const [succeeded, setSucceeded] = useState(false);

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        // will only run once the component loads because empy brackets at the end
        if (basket.length === 0){
            history.push('/checkout');
        }
    }, [basket, history]);
    
    const sleep = () => {
        // simulate an async call to an api
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(true);
            }, 2000)
        })
    }

    const handleSubmit = async e => { 
        e.preventDefault();
        setProcessing(true);
        
        await sleep().then( ()=> {
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            db.collection('users')
                .doc(user?.email)
                .collection('orders')
                .doc()
                .set({
                    basket: basket,
                    amount: getBasketTotal(basket),
                    create: toDate()
                })
            
            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/orders');
        });
    }

    const handleChange = e => {
        // listen for change in card element
        // display any errors as the customer types in card details
        setCard(e.value);
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                {/** shipping address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delievery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>1234 street lane</p>
                        <p>City of Choice, CA 91777</p>
                    </div>
                </div>
                {/** items in basket */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items</h3>
                    </div>
                    <div className="payment__items">
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
                    </div>
                </div>
                {/** credit card */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/** Stripe */}

                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                value={card}
                                onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value} </h3>
                                    )}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}/>
                                <button 
                                    disabled={processing || disabled || succeeded}
                                    type="submit">
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Payment;
