// src/App.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe("pk_test_51S7M1xCXqdoZHUUDZYKTyC6zECxQSwcqaHBYpe17vuWQS3IpjWz0MYkQFnjqe1Vd888s2naZYoQ1H1W8Fba9oUQF00mDm9ZamA");

function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <h2>Checkout</h2>
            <CheckoutForm orderId="68c7279a25d39537bf556026" />
        </Elements>
    );
}

export default PaymentPage;