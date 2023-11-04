export const formatCurrency = (value)=> 
{
    return new Intl.NumberFormat("en", 
    {
      style: "currency",
      currency: "USD",
    }).format(value);
}

export const convertor = async(amount, currency)=>
{
  const host = 'api.frankfurter.app';
  const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
  const data = await res.json();
  console.log(data);
  return data.rates.USD;
}

