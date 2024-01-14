import React, { useEffect, useState } from 'react';
import Layout from "@/components/layouts/Layout";
import History from '@/components/elements/History/History';
import api from '@/api';

export default function Transaction() {
  const [transactions, setTransactions] = useState([])

    
    const fetchTransactions = async () => {
        const response = await api.get('/transactions');
        const data = await response.data.payload;
        setTransactions(data.transactions)
    }
    
    useEffect(() => {
        fetchTransactions();
    }, [])

  return (
    <Layout>
      <p>Transaction Page</p>
      <History transactions={transactions}/>
    </Layout>
  )
}
