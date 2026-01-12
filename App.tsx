
import React, { useState, useCallback, useEffect } from 'react';
import { Retailer, Transaction, User, AppStep } from './types';
import { RETAILERS, MOCK_PRODUCTS } from './constants';
import Header from './components/Header';
import Scanner from './components/Scanner';
import PaymentForm from './components/PaymentForm';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.SHOP_SELECTOR);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null);
  const [user, setUser] = useState<User>({ phone: '', isLoggedIn: false });
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const resetFlow = useCallback(() => {
    setStep(AppStep.SHOP_SELECTOR);
    setSelectedRetailer(null);
    setTransaction(null);
  }, []);

  const handleShopSelect = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
    setStep(AppStep.QR_SCANNER);
  };

  const handleScanComplete = (data: string) => {
    // In a real app, 'data' would be a signed hash from the retailer's terminal
    const mockTxn: Transaction = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      retailerId: selectedRetailer?.id || 'unknown',
      amount: MOCK_PRODUCTS.reduce((acc, p) => acc + p.price, 0),
      items: MOCK_PRODUCTS,
      timestamp: Date.now(),
      status: 'pending'
    };
    setTransaction(mockTxn);
    
    // Redirect to Auth if not logged in, otherwise go straight to payment
    if (user.isLoggedIn) {
      setStep(AppStep.PAYMENT);
    } else {
      setStep(AppStep.AUTH);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.phone && loginForm.password) {
      setUser({ phone: loginForm.phone, isLoggedIn: true });
      setStep(AppStep.PAYMENT);
    }
  };

  const handlePaymentSuccess = (method: string) => {
    if (transaction) {
      setTransaction({ ...transaction, status: 'completed', paymentMethod: method });
      setStep(AppStep.RECEIPT);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header onHome={resetFlow} isLoggedIn={user.isLoggedIn} phone={user.phone} />

      <main className="container mx-auto px-4 pt-8 max-w-4xl">
        {step === AppStep.SHOP_SELECTOR && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Select Shop</h1>
              <p className="text-gray-500 text-lg font-medium">Choose a retailer to start your express checkout.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RETAILERS.map((retailer) => (
                <div 
                  key={retailer.id}
                  onClick={() => handleShopSelect(retailer)}
                  className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
                >
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:scale-125 transition-transform" 
                    style={{ backgroundColor: retailer.primaryColor, borderRadius: '0 0 0 100%' }}
                  ></div>
                  
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 border border-gray-50">
                        <img src={retailer.logo} alt={retailer.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold group-hover:text-black transition-colors">{retailer.name}</h2>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{retailer.category}</span>
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full py-3 bg-gray-50 rounded-xl font-bold text-gray-600 group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center gap-2">
                      Scan In-Store
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {step === AppStep.QR_SCANNER && selectedRetailer && (
          <Scanner 
            retailerName={selectedRetailer.name} 
            onScan={handleScanComplete}
            onCancel={() => setStep(AppStep.SHOP_SELECTOR)}
          />
        )}

        {step === AppStep.AUTH && (
          <div className="max-w-md mx-auto py-12 animate-in fade-in zoom-in-95">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Secure Login</h2>
                <p className="text-gray-500 mt-2">Required for global transactions at {selectedRetailer?.name}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    placeholder="+44 7000 000 000"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={loginForm.phone}
                    onChange={e => setLoginForm({...loginForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
                  <input 
                    required
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={loginForm.password}
                    onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          </div>
        )}

        {step === AppStep.PAYMENT && transaction && (
          <div className="py-8 animate-in fade-in slide-in-from-right-8">
            <PaymentForm 
              transaction={transaction}
              onCancel={() => setStep(AppStep.SHOP_SELECTOR)}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        )}

        {step === AppStep.RECEIPT && transaction && (
          <div className="max-w-md mx-auto py-8 animate-in fade-in scale-95 duration-700">
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 relative">
              {/* Receipt Header */}
              <div className="bg-black text-white p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-black text-3xl">
                    ✓
                  </div>
                  <h2 className="text-2xl font-black">PAYMENT SUCCESS</h2>
                  <p className="text-white/60 text-sm mt-1">Transaction ID: {transaction.id}</p>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-dashed border-gray-200">
                  <div className="flex items-center gap-3">
                    <img src={selectedRetailer?.logo} className="w-10 h-10 rounded-lg object-contain" alt="Logo" />
                    <div>
                      <p className="font-bold">{selectedRetailer?.name}</p>
                      <p className="text-xs text-gray-400">{new Date(transaction.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl">${transaction.amount.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{transaction.paymentMethod?.replace('card', 'Visa **** 4242')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Purchased Items</p>
                  {transaction.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Exit QR Section */}
                <div className="mt-8 p-6 bg-gray-50 rounded-3xl text-center space-y-4 border border-gray-100">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest">ONE-TIME EXIT QR</p>
                  <div className="w-48 h-48 bg-white p-4 rounded-2xl mx-auto shadow-sm flex items-center justify-center border border-gray-200">
                    <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-1 opacity-80">
                      {[...Array(100)].map((_, i) => (
                        <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium px-4">
                    Show this QR code at the security gate to verify your purchase and unlock the exit barrier.
                  </p>
                </div>

                <button 
                  onClick={resetFlow}
                  className="w-full py-4 bg-gray-100 rounded-2xl font-bold text-gray-800 hover:bg-gray-200 transition-all active:scale-95"
                >
                  Close Receipt
                </button>
              </div>

              {/* Decorative side notches */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-100"></div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full border border-gray-100"></div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Bar (Mobile Persistent) */}
      <nav className="fixed bottom-0 left-0 right-0 glass-morphism border-t px-6 py-4 sm:hidden flex justify-around items-center">
         <button onClick={resetFlow} className="flex flex-col items-center gap-1 text-gray-400 hover:text-black">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
           <span className="text-[10px] font-bold uppercase">Home</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-gray-400">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
           <span className="text-[10px] font-bold uppercase">Cart</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-gray-400">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
           <span className="text-[10px] font-bold uppercase">Settings</span>
         </button>
      </nav>
    </div>
  );
};

export default App;
