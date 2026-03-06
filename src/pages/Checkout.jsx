import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { addToast } = useToast();
    const [step, setStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const shipping = cartTotal > 50 ? 0 : 9.99;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + shipping + tax;

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', state: '', zip: '', country: 'US',
        cardName: '', cardNumber: '', expiry: '', cvv: '',
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        clearCart();
        addToast('Order placed successfully!', 'success');
    };

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="section-container py-20 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-2">Your cart is empty</h2>
                <Link to="/shop" className="btn-primary text-sm">Start Shopping</Link>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="section-container py-20 text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
                <h2 className="font-display text-3xl font-bold text-dark-900 dark:text-white mb-2">Order Confirmed!</h2>
                <p className="text-dark-400 mb-2 text-sm">Order #NC-{Date.now().toString().slice(-6)}</p>
                <p className="text-dark-500 mb-8 text-sm max-w-md mx-auto">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
                <Link to="/shop" className="btn-primary text-sm">Continue Shopping</Link>
            </div>
        );
    }

    const steps = [
        { num: 1, label: 'Contact' },
        { num: 2, label: 'Shipping' },
        { num: 3, label: 'Payment' },
    ];

    return (
        <div className="min-h-screen">
            <div className="bg-cream-100 dark:bg-dark-900 py-8 mb-8">
                <div className="section-container">
                    <h1 className="section-title text-dark-900 dark:text-white">Checkout</h1>
                    {/* Steps */}
                    <div className="flex items-center gap-2 mt-4">
                        {steps.map((s, i) => (
                            <div key={s.num} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s.num ? 'bg-primary-500 text-white' : 'bg-dark-200 dark:bg-dark-700 text-dark-400'
                                    }`}>{s.num}</div>
                                <span className={`text-sm font-medium hidden sm:inline ${step >= s.num ? 'text-dark-900 dark:text-white' : 'text-dark-400'}`}>{s.label}</span>
                                {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 ${step > s.num ? 'bg-primary-500' : 'bg-dark-200 dark:bg-dark-700'}`} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="section-container pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Contact */}
                            {step >= 1 && (
                                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 animate-fade-in">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white">Contact Information</h3>
                                        {step > 1 && <button type="button" onClick={() => setStep(1)} className="text-xs text-primary-500 font-medium">Edit</button>}
                                    </div>
                                    {step === 1 ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">First Name</label>
                                                    <input name="firstName" value={form.firstName} onChange={handleChange} className="input-field" placeholder="John" required /></div>
                                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">Last Name</label>
                                                    <input name="lastName" value={form.lastName} onChange={handleChange} className="input-field" placeholder="Doe" required /></div>
                                            </div>
                                            <div><label className="text-xs font-medium text-dark-500 mb-1 block">Email</label>
                                                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="john@example.com" required /></div>
                                            <div><label className="text-xs font-medium text-dark-500 mb-1 block">Phone</label>
                                                <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" /></div>
                                            <button type="button" onClick={() => setStep(2)} className="btn-primary text-sm">Continue to Shipping</button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-dark-500">{form.firstName} {form.lastName} · {form.email}</p>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Shipping */}
                            {step >= 2 && (
                                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 animate-fade-in">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white">Shipping Address</h3>
                                        {step > 2 && <button type="button" onClick={() => setStep(2)} className="text-xs text-primary-500 font-medium">Edit</button>}
                                    </div>
                                    {step === 2 ? (
                                        <div className="space-y-4">
                                            <div><label className="text-xs font-medium text-dark-500 mb-1 block">Address</label>
                                                <input name="address" value={form.address} onChange={handleChange} className="input-field" placeholder="123 Main Street" required /></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">City</label>
                                                    <input name="city" value={form.city} onChange={handleChange} className="input-field" placeholder="New York" required /></div>
                                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">State</label>
                                                    <input name="state" value={form.state} onChange={handleChange} className="input-field" placeholder="NY" required /></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">ZIP Code</label>
                                                    <input name="zip" value={form.zip} onChange={handleChange} className="input-field" placeholder="10001" required /></div>
                                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">Country</label>
                                                    <select name="country" value={form.country} onChange={handleChange} className="input-field">
                                                        <option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option>
                                                    </select></div>
                                            </div>
                                            <button type="button" onClick={() => setStep(3)} className="btn-primary text-sm">Continue to Payment</button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-dark-500">{form.address}, {form.city}, {form.state} {form.zip}</p>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Payment */}
                            {step >= 3 && (
                                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 animate-fade-in">
                                    <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white mb-4">Payment Method</h3>
                                    <div className="space-y-4">
                                        <div><label className="text-xs font-medium text-dark-500 mb-1 block">Name on Card</label>
                                            <input name="cardName" value={form.cardName} onChange={handleChange} className="input-field" placeholder="John Doe" required /></div>
                                        <div><label className="text-xs font-medium text-dark-500 mb-1 block">Card Number</label>
                                            <input name="cardNumber" value={form.cardNumber} onChange={handleChange} className="input-field" placeholder="4242 4242 4242 4242" required maxLength={19} /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="text-xs font-medium text-dark-500 mb-1 block">Expiry</label>
                                                <input name="expiry" value={form.expiry} onChange={handleChange} className="input-field" placeholder="MM/YY" required maxLength={5} /></div>
                                            <div><label className="text-xs font-medium text-dark-500 mb-1 block">CVV</label>
                                                <input name="cvv" value={form.cvv} onChange={handleChange} className="input-field" placeholder="123" required maxLength={4} type="password" /></div>
                                        </div>
                                        <div className="flex gap-2 pt-1">
                                            {['Visa', 'MC', 'Amex', 'PayPal'].map(c => (
                                                <span key={c} className="px-3 py-1.5 bg-cream-100 dark:bg-dark-700 rounded-lg text-xs text-dark-500 font-medium">{c}</span>
                                            ))}
                                        </div>
                                        <button type="submit" className="btn-primary w-full text-sm">Place Order · ${grandTotal.toFixed(2)}</button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 sticky top-24 space-y-4">
                            <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white">Order Summary</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-dark-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-dark-900 dark:text-white truncate">{item.name}</p>
                                            <p className="text-xs text-dark-400">${item.price.toFixed(2)}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-dark-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-cream-200 dark:border-dark-700 pt-3 space-y-2 text-sm">
                                <div className="flex justify-between text-dark-500"><span>Subtotal</span><span className="font-medium text-dark-900 dark:text-white">${cartTotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-dark-500"><span>Shipping</span><span className="font-medium text-dark-900 dark:text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                                <div className="flex justify-between text-dark-500"><span>Tax</span><span className="font-medium text-dark-900 dark:text-white">${tax.toFixed(2)}</span></div>
                            </div>
                            <div className="border-t border-cream-200 dark:border-dark-700 pt-3 flex justify-between">
                                <span className="font-bold text-dark-900 dark:text-white">Total</span>
                                <span className="font-display text-xl font-bold text-dark-900 dark:text-white">${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
