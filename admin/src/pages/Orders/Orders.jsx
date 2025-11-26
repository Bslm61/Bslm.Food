import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'

export const Orders = ({url}) => {

  const [order,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div>
      orders
    </div>
  )
}
