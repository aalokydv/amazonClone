import React from 'react'
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';


function Order({ order }) {

    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(order.data.amount / 100);

    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY , h:mma')}</p>
            <p className='order__id'>
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    rating={item.rating}
                    price={item.price}
                    hideButton
                />
            ))}
            <h2>Orders Total : {formattedValue}</h2>




        </div>
    )
}

export default Order
