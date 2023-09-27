import { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function App() {
  const [product, setProduct] = useState({
    name: "Headphone 5",
    price: 536,
  });
  const priceForStipe = product.price * 100;
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "POST",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if(response.status === 200){
        alert('Payment Successfull')
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>Stripe payment</h2>
      <p>
        <span>Product:</span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey="pk_test_51Nv25OSIbpzFRocgaATP7295x5fJdV6WxIBrnB5W9aRAqQtrJUlFz95u9UjZaVVgVcVkfRoFruPygv1gzOrgvNuk00G5tsk0TX"
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStipe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default App;
