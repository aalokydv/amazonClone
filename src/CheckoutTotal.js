import React, { useEffect } from 'react'
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

function CheckoutTotal() {
    const [{ basket }, dispatch] = useStateValue();

    // Format the basket total using Intl.NumberFormat
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(getBasketTotal(basket));

    return (
        <div>
            <p>Order Total ({basket.length} items): <strong>{formattedValue}</strong></p>
        </div>
    )
}
export default CheckoutTotal
