import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import {toast} from 'react-toastify'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      console.warn('No token, skipping fetch.');
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { token }
      });
      console.log('Response data:', response.data);

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        console.warn('Response success false');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(response.data.message)
    }
  };

  const statusHandler = async(event,orderId) =>{
    try {
      const response = await axios.post(backendUrl+'/api/order/status', {orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
        toast.success("Status Updated!");
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <Title text1={'ALL '} text2={'ORDERS'} />

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
              key={index}
            >
              {/* Column 1: Icon */}
              <img src={assets.parcel_icon} alt="parcel" />

              {/* Column 2: Items */}
              <div>
                {order.items.map((item, itemIndex) => (
                  <p key={itemIndex}>
                    {item.name} x {item.quantity} <span>{item.size}{itemIndex < order.items.length - 1 ? ',' : ''}</span>
                  </p>
                ))}
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                <p>{order.address.phone}</p>
              </div>

              {/* Column 3: Details */}
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
                {/* Column 4: Amount  */}
              <div>
                <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              </div>
              {/* Column 5: Status */}
              <div>
            
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
