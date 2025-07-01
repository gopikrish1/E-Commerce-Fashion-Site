import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

//Global Variables
const currency ='inr'
const deliveryCharge = 100

//Gateway Inititalize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
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

//Placing Orders using Stripe Method
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
        unit_amount: item.price * 100, // fixed typo: unit_amount, not unit_ammount
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
    
}

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

export {verifyStripe,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders,updateStatus}