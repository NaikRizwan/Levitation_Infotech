import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      fetchInvoices();
    }
  }, [state.loggedIn, navigate]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`/invoices/${state.email}`);
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        console.error("Failed to fetch invoices");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  return (
    <div className="mt-20 p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="mb-4">Email: {state.email}</p>
      <h2 className="text-xl font-bold mb-2">Invoices</h2>
      <div className="overflow-x-auto">
        {invoices.length === 0 ? (
          <p className="text-center text-gray-500">No data found</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Qty</th>
                <th className="py-2 px-4 border-b">Rate</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) =>
                invoice.products.map((product, idx) => (
                  <tr key={`${index}-${idx}`}>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.qty}</td>
                    <td className="py-2 px-4 border-b">{product.rate}</td>
                    <td className="py-2 px-4 border-b">{product.total}</td>
                    {idx === 0 && (
                      <td
                        className="py-2 px-4 border-b"
                        rowSpan={invoice.products.length}
                      >
                        {new Date(invoice.date).toLocaleString()}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
