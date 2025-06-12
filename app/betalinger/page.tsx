"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "", // New input for belop (amount)
    paymentMethod: "credit_card",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const paymentData = {
      memberId: 1, // Example member ID
      belop: formData.amount,
      betalingsDato: new Date().toISOString().slice(0, 19).replace("T", " "),
      betalingsMetode: formData.paymentMethod,
      status: "Completed",
    };

    try {
      const response = await fetch('/api/betalinger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert("Payment processed successfully!");
      } else {
        const errorData = await response.json();
        console.error("Payment failed:", errorData);
        alert("Failed to process payment.");
      }
    } catch (error) {
      console.error("Error occurred while processing payment:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-5">
        <CardContent>
          <h1 className="text-xl font-semibold text-center mb-5">Payment Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount (Beløp)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="1000"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Betalingsmetode</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Velg betalingsmetode</option>
                <option value="card">Kort</option>
                <option value="vipps" onClick={() => window.open('https://vipps.no', '_blank')}>
                  Vipps
                </option>
                <option value="paypal" onClick={() => window.open('https://paypal.com', '_blank')}>
                  PayPal
                </option>
              </select>
              <div className="mt-2 text-sm text-gray-500">
                <a 
                  href="https://vipps.no" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Betal med Vipps
                </a>
                <a
                  href="https://paypal.com"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Betal med PayPal
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Betal nå
            </Button>
          </form>
        </CardContent>

      </Card>
    </div>
  );
}
