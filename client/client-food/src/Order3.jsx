import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Order3 = () => {
    const navigate= useNavigate()
      useEffect(()=>{
navigate("/order3")
      },[])
  return (
    <div>Order3</div>
  )
}
