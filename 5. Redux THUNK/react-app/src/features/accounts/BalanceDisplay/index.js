import React from 'react'
import { connect } from 'react-redux';
import { formatCurrency } from "../../../utilities";

const  BalanceDisplay = ({ balance }) => 
{
  return (<div className="balance">{formatCurrency(balance)}</div>);
}

const mapStateToProps = (state) =>
{
  return { balance : state.account.balance };
}

export default  connect(mapStateToProps)(BalanceDisplay);


