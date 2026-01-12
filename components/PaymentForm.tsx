
import React, { useState } from 'react';
import { Transaction } from '../types';

interface PaymentFormProps {
  transaction: Transaction;
  onSuccess: (method: string) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ transaction, onSuccess, onCancel }) => {
  const [method, setMethod] = useState<'card' | 'apple' | 'offline'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(method);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-lg">Checkout</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-black">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 font-medium">Order Total</p>
            <p className="text-2xl font-bold">${transaction.amount.toFixed(2)}</p>
          </div>
          <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Secure
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-600 px-1">Select Payment Method</label>
          
          <button 
            onClick={() => setMethod('apple')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${method === 'apple' ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.057 10.74c.03 2.625 2.25 3.51 2.28 3.525-.015.06-.36 1.23-1.185 2.445-.72 1.05-1.47 2.1-2.64 2.115-1.155.015-1.53-.69-2.85-.69-1.32 0-1.74.675-2.835.705-1.125.03-1.995-1.155-2.715-2.205-1.47-2.13-2.595-6.015-1.08-8.64.75-1.305 2.085-2.13 3.525-2.145 1.095-.015 2.13.75 2.805.75.66 0 1.905-.93 3.225-.795.555.03 2.1.225 3.09 1.68-.075.045-1.845 1.08-1.83 3.255zm-1.89-6.39c.6-1.14 1.29-2.28 1.245-3.465-.99.045-2.19.675-2.91 1.515-.645.75-1.215 1.905-1.05 3.06.33.03 1.125-.015 2.715-1.11z" />
              </svg>
              <span className="font-bold">Apple Pay</span>
            </div>
            {method === 'apple' && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </button>

          <button 
            onClick={() => setMethod('card')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${method === 'card' ? 'border-black bg-white shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
              <span className="font-bold">Credit / Debit Card</span>
            </div>
            {method === 'card' && <div className="w-2 h-2 bg-black rounded-full"></div>}
          </button>

          {method === 'card' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-4">
              <input 
                type="text" 
                placeholder="Card Number" 
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue="4242 4242 4242 4242"
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="flex-1 bg-white border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="12/26"
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="w-24 bg-white border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="123"
                />
              </div>
            </div>
          )}

          <button 
            onClick={() => setMethod('offline')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${method === 'offline' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-bold text-gray-800">Pay Offline (In-Store)</span>
            </div>
            {method === 'offline' && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
          </button>
        </div>

        <button 
          disabled={isProcessing}
          onClick={handlePay}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-gray-400' : 'bg-black hover:scale-[1.02] active:scale-95 shadow-lg'}`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            `Pay $${transaction.amount.toFixed(2)}`
          )}
        </button>
        
        <p className="text-[10px] text-center text-gray-400 leading-relaxed">
          Payments are SSL encrypted. By paying you agree to our Terms of Service and Privacy Policy. 
          PCI-DSS Level 1 Compliant.
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;
