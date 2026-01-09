import { useState } from "react";
import { CreditCard, Calendar, Lock } from "lucide-react";

const PaymentForm = ({ onSubmit, totalAmount }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }
    
    // Format expiry date
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (value.length > 5) return;
    }
    
    // Format CVV
    if (name === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    onSubmit({
      cardNumber: formData.cardNumber,
      cardName: formData.cardName,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <CreditCard className="h-6 w-6 mr-2 text-primary" />
        Payment Information
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus-theme"
              required
              maxLength="19"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
              required
              maxLength="5"
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="inline h-4 w-4 mr-1" />
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
              required
              maxLength="3"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total Amount</span>
            <span className="text-2xl font-bold text-primary">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors flex items-center justify-center"
          style={{ border: 'none' }}
        >
          <Lock className="h-5 w-5 mr-2" />
          Pay ₹{totalAmount.toFixed(2)}
        </button>

        <p className="text-xs text-gray-500 text-center">
          This is a simulated payment. No actual charges will be made.
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;

