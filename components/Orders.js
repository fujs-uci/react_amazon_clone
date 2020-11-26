import React, { useState, useEffect } from 'react';
import '../styles/orders.css';
import { db } from './firebase.js';
import { useStateValue } from './StateProvider.js';
import Order from './Order.js';


function Orders() {

    const [orders, setOrders] = useState([]);
    const [{user}] = useStateValue();

    useEffect(() => {
        if(user) {
            db.collection('users')
                .doc(user?.email)
                .collection('orders')
                .orderBy('create', 'desc')
                .onSnapshot( snapshop => (
                    setOrders(snapshop.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ));
        }else{
            setOrders([]);
        }

    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            {orders.length === 0 ? (
                <div className="orders__order">
                    <h3>No Orders</h3>
                </div>
            ) : (
                <div className="orders__order">
                    {orders?.map(order => (
                        <Order order={order}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders;
