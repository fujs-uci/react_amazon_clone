import React from 'react';
import '../styles/subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider.js';
import { getBasketTotal } from './Reducer.js';
import { useHistory } from 'react-router-dom';

function Subtotal() {

    const history = useHistory();
    const [{ basket, user }, dispatch ] = useStateValue();

    const emptyBasket = basket.length === 0;

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({ basket?.length } items):
                            <strong>{ value }</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/>
                                This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                fixedDecimalScale={true}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}/>
            {!user ? (
                <button disabled={true}>Sign in to purchase</button>
            ) : (
                <button 
                    disabled={emptyBasket ?  true : false }
                    onClick={e => history.push('/payment')}>
                    {emptyBasket ?  (<div>Empty Basket</div>) : (<div>Proceed to Checkout</div>) }
                </button>
            )}

        </div>
    )
}

export default Subtotal;
