import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razorpay from 'razorpay'


//Global Variables
const currency ='inr'
const deliveryCharge = 100

//Gateway Inititalize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

//Placing Orders using COD
const placeOrder = async(req,res)=>{
    try {
        const{userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items, 
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date : Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}


// Placing Orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    const origin = req.headers.origin;

    // Save order with Stripe method and mark payment as pending
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Format items for Stripe Checkout
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe error:", error);
    res.json({ success: false, message: error.message });
  }
};

//Verify Stripe
const verifyStripe = async(req,res) => {
    const {orderId , success, userId} = req.body
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData: {}})
            res.json({success:true});
        }
        else{
            await orderModel.findByIdAndUpdate(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log("Stripe error:", error);
        res.json({ success: false, message: error.message });
    }
}

//Placing Orders using RazorPay Method
const placeOrderRazorpay = async(req,res)=>{
    try {

        const { userId, items, amount, address } = req.body;

    // Save the order with Razorpay method (payment pending)
        const orderData = {
            userId,
            items, 
            address,
            amount,
            paymentMethod:"RazorPay",
            payment:false,
            date : Date.now()
        }
    
        const newOrder = new orderModel(orderData);
        await newOrder.save();

    // Create a Razorpay order
        const options = {
        amount: amount * 100,
        currency: currency.toUpperCase(),
        receipt: newOrder._id.toString(),
        };

        await razorpayInstance.orders.create(options, (error,order) => {
        if (error) {
            console.log(error);
            return res.json({ success: false, message: error });
        }
        res.json({ success: true, order });
        });
  } catch (error) {
        console.log('Server Error:', error);
        resjson({ success: false, message: error.message });
  }
}

const verifyRazorpay = async (req, res) => {
  try {
    const {razorpay_order_id } = req.body;
    const userId = req.userId;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Done" });
    } else {
      res.json({ success: false, message: 'Payment Failed' });
    }
  } 
  catch (error) {
        console.log('Error:', error);
        res.json({ success: false, message:error });
  }
};




//All Orders data from admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User Orders Data for frontend
const userOrders = async(req,res) =>{
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
       
        res.json({success:true,orders});

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Update Order Status from admin panel
const updateStatus = async(req,res) =>{
    try {
        const {orderId , status} = req.body
        
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true , message:'Status updated!!'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {verifyRazorpay,verifyStripe,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders,updateStatus}