import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    if (wishlistItems.length === 0) {
        return (
            <div className="section-container py-20 text-center">
                <div className="text-6xl mb-4">💝</div>
                <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-2">Your wishlist is empty</h2>
                <p className="text-dark-400 mb-6 text-sm">Save your favorite items for later.</p>
                <Link to="/shop" className="btn-primary text-sm">Explore Products</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="bg-cream-100 dark:bg-dark-900 py-8 mb-8">
                <div className="section-container">
                    <h1 className="section-title text-dark-900 dark:text-white">My Wishlist</h1>
                    <p className="text-dark-400 mt-1 text-sm">{wishlistItems.length} saved item{wishlistItems.length !== 1 && 's'}</p>
                </div>
            </div>

            <div className="section-container pb-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {wishlistItems.map((item, i) => (
                        <div key={item.id} className="card animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                            <Link to={`/product/${item.id}`} className="block">
                                <div className="aspect-square overflow-hidden bg-cream-100 dark:bg-dark-700">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </div>
                            </Link>
                            <div className="p-4 space-y-3">
                                <div>
                                    <p className="text-xs text-dark-400 uppercase tracking-wider">{item.category}</p>
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="text-sm font-semibold text-dark-900 dark:text-white hover:text-primary-500 transition-colors line-clamp-2">{item.name}</h3>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-bold text-dark-900 dark:text-white">${item.price.toFixed(2)}</span>
                                    {item.originalPrice && <span className="text-xs text-dark-400 line-through">${item.originalPrice.toFixed(2)}</span>}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { addToCart(item, 1, item.sizes?.[0], item.colors?.[0]); addToast(`${item.name} added to cart`, 'success'); }}
                                        className="flex-1 bg-dark-900 dark:bg-white text-white dark:text-dark-900 text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => { removeFromWishlist(item.id); addToast('Removed from wishlist', 'info'); }}
                                        className="w-10 h-10 rounded-xl border border-dark-200 dark:border-dark-600 flex items-center justify-center text-dark-400 hover:text-red-500 hover:border-red-200 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
