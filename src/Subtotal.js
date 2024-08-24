import React from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
    const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue();



    // Format the basket total using Intl.NumberFormat
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(getBasketTotal(basket));


    return (
        <div className='subtotal'>
            <>
                <p>
                    Subtotal ({basket.length} items): <strong>{formattedValue}</strong>
                </p>
                <small className='subtotal__gift'>
                    <input type='checkbox' />
                    This order contains a gift
                </small>
            </>
            <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;

// import React from 'react'
// import './Subtotal.css'
// import CurrencyFormat from "react-currency-format"
// import { useStateValue } from './StateProvider';
// import { getBasketTotal } from './reducer';
// import { useNavigate } from 'react-router-dom';

// function Subtotal() {
//     const navigate = useNavigate();
//     const [{ basket }, dispatch] = useStateValue();

//     return (
//         <div className='subtotal'>
//             <CurrencyFormat
//                 renderText={(value) => (
//                     <>
//                         <p>
//                             Subtotal({basket.length}items): <strong>{value}</strong>
//                         </p>
//                         <small className='subtotal__gift'>
//                             <input type='checkbox' />
//                             this order contains gift

//                         </small>
//                     </>
//                 )}
//                 decimalScale={2}
//                 value={getBasketTotal(basket)}
//                 displayType={'text'}
//                 thousandSeparator={true}
//                 prefix={"$"}
//             />
//             <button onClick={e => navigate('/payment')}>proceed to checkout</button>

//         </div>
//     )
// }

// export default Subtotal



