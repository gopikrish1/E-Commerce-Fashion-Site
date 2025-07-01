import React,{useState} from 'react'
import Title from './Title'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'
const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
                localStorage.setItem('adminToken', response.data.token);
                toast.success("Login Successful");
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message);
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md '>
        <Title className='text-2xl font-bold mb-4' text1={'ADMIN '} text2={'PANEL'}/>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)}  value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='yourmail@gmail.com' required/>
            </div>
            <div>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)}  value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter Your Password' required/>
            </div>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
