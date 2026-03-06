import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { addToast } = useToast();
    const shipping = cartTotal > 50 ? 0 : 9.99;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + shipping + tax;
    const recommended = products.filter(p => !cartItems.find(c => c.id === p.id)).slice(0, 3);

    if (cartItems.length === 0) {
        return (
            <div className="section-container py-20 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-2">Your cart is empty</h2>
                <p className="text-dark-400 mb-6 text-sm">Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="btn-primary text-sm">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="bg-cream-100 dark:bg-dark-900 py-8 mb-8">
                <div className="section-container">
                    <h1 className="section-title text-dark-900 dark:text-white">Shopping Cart</h1>
                    <p className="text-dark-400 mt-1 text-sm">{cartItems.length} item{cartItems.length !== 1 && 's'} in your cart</p>
                </div>
            </div>

            <div className="section-container pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        {/* Table Header (desktop) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-cream-100 dark:bg-dark-800 rounded-xl text-xs font-semibold text-dark-500 uppercase tracking-wider mb-4">
                            <div className="col-span-5">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Subtotal</div>
                        </div>

                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                    className="bg-white dark:bg-dark-800 rounded-2xl p-4 shadow-card border border-cream-100 dark:border-dark-700 animate-fade-in">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Product */}
                                        <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                            <Link to={`/product/${item.id}`} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-cream-100 dark:bg-dark-700">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </Link>
                                            <div className="min-w-0">
                                                <Link to={`/product/${item.id}`} className="text-sm font-semibold text-dark-900 dark:text-white hover:text-primary-500 transition-colors truncate block">{item.name}</Link>
                                                {item.selectedSize && <p className="text-xs text-dark-400 mt-0.5">Size: {item.selectedSize}</p>}
                                                {item.selectedColor && (
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <span className="text-xs text-dark-400">Color:</span>
                                                        <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: item.selectedColor }} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-4 md:col-span-2 text-center">
                                            <span className="text-sm font-semibold text-dark-900 dark:text-white">${item.price.toFixed(2)}</span>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-4 md:col-span-3 flex justify-center">
                                            <div className="flex items-center border border-dark-200 dark:border-dark-600 rounded-lg">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                                    className="w-8 h-8 flex items-center justify-center text-dark-500 hover:bg-cream-100 dark:hover:bg-dark-700 text-sm">−</button>
                                                <span className="w-8 text-center text-sm font-medium text-dark-900 dark:text-white">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                                    className="w-8 h-8 flex items-center justify-center text-dark-500 hover:bg-cream-100 dark:hover:bg-dark-700 text-sm">+</button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="col-span-3 md:col-span-2 text-right flex items-center justify-end gap-2">
                                            <span className="text-sm font-bold text-dark-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button onClick={() => { removeFromCart(item.id, item.selectedSize, item.selectedColor); addToast('Item removed', 'info'); }}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Link to="/shop" className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-1">
                                ← Continue Shopping
                            </Link>
                            <button onClick={() => { clearCart(); addToast('Cart cleared', 'info'); }} className="text-sm text-red-500 hover:text-red-600 font-medium">
                                Clear Cart
                            </button>
                        </div>

                        {/* Cross-sell */}
                        {recommended.length > 0 && (
                            <div className="mt-10">
                                <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white mb-4 uppercase tracking-wide">
                                    Many Customers Added the Following
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {recommended.map(p => (
                                        <Link key={p.id} to={`/product/${p.id}`} className="bg-white dark:bg-dark-800 rounded-xl p-3 shadow-card border border-cream-100 dark:border-dark-700 hover:shadow-card-hover transition-all group">
                                            <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-cream-100 dark:bg-dark-700">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            </div>
                                            <p className="text-xs font-medium text-dark-900 dark:text-white truncate">{p.name}</p>
                                            <p className="text-xs text-primary-500 font-bold mt-1">${p.price.toFixed(2)}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 sticky top-24 space-y-4">
                            <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white">Order Summary</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-dark-500"><span>Subtotal</span><span className="text-dark-900 dark:text-white font-medium">${cartTotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-dark-500">
                                    <span>Shipping</span>
                                    <span className="text-dark-900 dark:text-white font-medium">{shipping === 0 ? <span className="text-accent-500">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-dark-500"><span>Tax</span><span className="text-dark-900 dark:text-white font-medium">${tax.toFixed(2)}</span></div>
                            </div>

                            {shipping > 0 && (
                                <div className="bg-cream-100 dark:bg-dark-700 rounded-xl p-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-dark-500">Free shipping progress</span>
                                        <span className="text-primary-500 font-medium">${(50 - cartTotal).toFixed(2)} away</span>
                                    </div>
                                    <div className="w-full bg-dark-200 dark:bg-dark-600 rounded-full h-1.5">
                                        <div className="bg-primary-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.min(100, (cartTotal / 50) * 100)}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-cream-200 dark:border-dark-700 pt-4 flex justify-between">
                                <span className="font-display font-bold text-dark-900 dark:text-white">Grand Total</span>
                                <span className="font-display text-xl font-bold text-dark-900 dark:text-white">${grandTotal.toFixed(2)}</span>
                            </div>

                            <Link to="/checkout" className="btn-primary w-full text-center block text-sm">
                                Proceed to Checkout
                            </Link>
                            <Link to="/shop" className="btn-outline w-full text-center block text-sm">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
