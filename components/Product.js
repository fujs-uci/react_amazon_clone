import React from 'react';
import '../styles/product.css';
import { useStateValue } from './StateProvider.js';

function Product({ id, title, price, rating, image }) {

    const [{ basket }, dispatch] = useStateValue();

    const addToBacket = () => {
        // dispatch the item to the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                key: id,
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="product">
            {/** Product info */}
            <div className="product__info">
                <p className="product__infoTitle">
                    { title }
                </p>
                <p className="product__infoPrice">
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>
                <div className="product__infoRating">
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </div>
            </div>
            {/** Product image */}
            <img 
                className="product__image"
                src={ image }
                alt="product"/>
            {/** add to basket */}
            <button onClick={addToBacket}>Add to Basket</button>
        </div>
    )
}

export default Product;
