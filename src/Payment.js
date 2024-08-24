import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CheckoutTotal from './CheckoutTotal';
import { db } from './firebase';
import { getBasketTotal } from './reducer';
import axios from './Axios';
function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');   //clientSecret: This is a key provided by Stripe that allows you to securely complete the payment.



    useEffect(() => {
        /*
         getClientSecret:
                 This function is defined inside useEffect and is used to make an HTTP POST request to your backend server.
          axios request: 
                 Sends a request to your server at the endpoint /payments/create with the total amount of the basket (multiplied by 100 because Stripe expects amounts in the smallest currency unit, like cents).
          setClientSecret(response.data.clientSecret):
                 Once the server responds with the clientSecret, it is stored in the clientSecret state using setClientSecret.
        */
        const getClientSecret = async () => {
            // const response = await axios({
            //     method: 'post',
            //     url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            // })
            // setClientSecret(response.data.clientSecret)
            try {
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error.response ? error.response.data : error.message);
                setError('Unable to fetch client secret. Please try again later.');
            }
        }
        getClientSecret();

    }, [basket])

    console.log('the secret>>', clientSecret);

    console.log("person", user)
    console.log("User ID:", user?.uid);
    // console.log("Payment Intent ID:", paymentIntent?.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (!clientSecret) {
            console.error('Client secret is missing.');
            setError('Client secret is missing. Please try again later.');
            setProcessing(false);
            return;
        }

        try {
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (!user) {
                throw new Error("You must be logged in to complete the payment.");
            }

            await db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });

            setSucceeded(true);
            setError(null);
            dispatch({ type: 'EMPTY_BASKET' });
            navigate('/orders', { replace: true });
        } catch (error) {
            console.error('Payment error:', error.message);
            setError(`Payment failed: ${error.message}`);
        } finally {
            setProcessing(false);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setProcessing(true);

    //     /*
    //       * This line interacts with Stripe's API to confirm the payment using the clientSecret and the card details entered by the user in the CardElement.
    //       *  clientSecret is a key that allows your app to securely complete the payment process. It's generated on the server and sent to the client.
    //       *  elements.getElement(CardElement) retrieves the card details that the user entered into the form.
    //     */
    //     const payload = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement)
    //         }
    //     }).then(({ paymentIntent }) => {
    //         if (!user) {
    //             console.error("User is not logged in.");
    //             setError("You must be logged in to complete the payment.");
    //             setProcessing(false);
    //             return;
    //         }
    //         db
    //             .collection('users')
    //             .doc(user?.uid)
    //             .collection('orders')
    //             .doc(paymentIntent.id)
    //             .set({
    //                 basket: basket,
    //                 amount: paymentIntent.amount,
    //                 created: paymentIntent.created
    //             })
    //         setSucceeded(true);
    //         setError(null)
    //         setProcessing(false)

    //         dispatch({
    //             type: 'EMPTY_BASKET'
    //         })

    //         navigate('/orders', { replace: true });
    //     }).catch(error => {
    //         setError(`Payment failed: ${error.message}`);
    //         setProcessing(false);
    //     });


    // }
    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")

    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'> {basket?.length} items</Link>)
                </h1>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 react lane</p>
                        <p>Noida, India</p>

                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and Delivery</h3>

                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={item.rating}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <h3><CheckoutTotal /> </h3>
                                <button
                                    disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> : 'Buy Now'}</span>
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

export default Payment
