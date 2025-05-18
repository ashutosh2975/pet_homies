import React, { useState } from 'react';
import './Donation.css';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const suggestedAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (amt) => {
    setAmount(amt.toString());
  };

  const validateInputs = () => {
    if (!name || !email || !amount) {
      setError('Please fill in all fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    return true;
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Create order
      const orderResponse = await fetch('http://localhost:4000/donation/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          name,
          email,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();
      
      const options = {
        key: 'rzp_test_o4BYuWab5ZZGk5', // Your Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Pet Homies',
        description: 'Donation for Pet Homies',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            setIsLoading(true);
            const verifyResponse = await fetch('http://localhost:4000/donation/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              setSuccess('Thank you for your generous donation! Your contribution will help us care for more animals.');
              // Clear form
              setName('');
              setEmail('');
              setAmount('');
            } else {
              setError('Payment verification failed. Please contact support if amount was deducted.');
            }
          } catch (error) {
            setError('Payment verification failed. Please contact support if amount was deducted.');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: '#4a148c',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donation-container">
      <div className="donation-content">
        <h2>Make a Donation</h2>
        <p>Your donation helps us care for animals in need</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleDonation} className="donation-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <div className="amount-suggestions">
              {suggestedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="amount-suggestion"
                  onClick={() => handleAmountSelect(amt)}
                  disabled={isLoading}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="donate-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Donate Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;