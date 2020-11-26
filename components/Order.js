import React from 'react';
import '../styles/order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct.js';
import CurrencyFormat from 'react-currency-format';


function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.create).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    hideBtn={true}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value} </h3>
                )}
                decimalScale={2}
                fixedDecimalScale={true}
                value={order.data.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}/>
        </div>
    )
}

export default Order;
