const Razorpay = require('razorpay');
const crypto = require('crypto');
const Donation = require('../Model/DonationModel');

// Initialize Razorpay with your key_id and key_secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, name, email } = req.body;

        if (!amount || !name || !email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }

        // Create order
        const options = {
            amount: amount, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            notes: {
                name: name,
                email: email
            }
        };

        const order = await razorpay.orders.create(options);

        // Save donation record
        const donation = new Donation({
            name,
            email,
            amount: amount / 100, // Store amount in rupees
            orderId: order.id,
            status: 'pending'
        });
        await donation.save();

        res.status(200).json({
            success: true,
            id: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create order' 
        });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature 
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing payment verification parameters' 
            });
        }

        // Verify signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(text)
            .digest('hex');

        const isAuthentic = generated_signature === razorpay_signature;

        if (isAuthentic) {
            // Update donation status
            await Donation.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { 
                    status: 'completed',
                    paymentId: razorpay_payment_id,
                    updatedAt: Date.now()
                }
            );

            res.json({
                success: true,
                verified: true,
                message: 'Payment verified successfully'
            });
        } else {
            // Mark donation as failed
            await Donation.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { 
                    status: 'failed',
                    updatedAt: Date.now()
                }
            );

            res.json({
                success: false,
                verified: false,
                error: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to verify payment',
            details: error.message 
        });
    }
};