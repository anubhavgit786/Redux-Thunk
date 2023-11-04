import React from 'react';
import { useSelector } from 'react-redux';


const Customer = () => 
{
  const customer = useSelector((store)=> store.customer.fullName);
  return (<h2>👋 Welcome, {customer}</h2>);
}

export default Customer;


