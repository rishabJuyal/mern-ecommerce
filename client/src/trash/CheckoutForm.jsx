// src/components/CheckoutForm.jsx
import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ orderId="68c663df8373575c247510e2" }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Step 1: Fetch clientSecret from backend
    useEffect(() => {
        const fetchClientSecret = async () => {
            const res = await fetch("http://localhost:5000/api/orders/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" ,
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzFkZTI4MWE3NGExY2QyM2IzN2NjYiIsInVzZXJuYW1lIjoiUjEiLCJyb2xlIjoiY3VzdG9tZXIiLCJlbWFpbCI6InJpc2hhYmp1eWFsMTJAZ21haWwuY29tIiwiaWF0IjoxNzU3ODgxOTAwLCJleHAiOjE3NTc4ODI4MDB9._eQMmdYoh-BcnmRg8iXhAGq6bqSaGHE2CgMR8Acx3P0`,
                },
                body: JSON.stringify({ orderId })
            });
            const data = await res.json();
            setClientSecret(data.clientSecret);
        };

        fetchClientSecret();
    }, [orderId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);
        setMessage('');

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Test User",
                },
            },
        });

        if (result.error) {
            setMessage(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
            setMessage("✅ Payment successful!");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={!stripe || loading}>
                {loading ? "Processing…" : "Pay"}
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
