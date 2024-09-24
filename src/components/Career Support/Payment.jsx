import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

const PaymentButton = () => {
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const paymentIntent = await response.json();

    const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      // Payment successful!
    }
};

return (
  <button onClick={handlePayment}>
    Pay with Stripe
  </button>
);
};

