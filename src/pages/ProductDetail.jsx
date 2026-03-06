import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import { products, reviews } from '../data/products';

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToast } = useToast();
    const product = products.find(p => p.id === Number(id));
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes?.[0] || null);
            setSelectedColor(product.colors?.[0] || null);
            setSelectedImage(0);
            setQuantity(1);
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="section-container py-20 text-center">
                <div className="text-5xl mb-4">😕</div>
                <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-2">Product Not Found</h2>
                <Link to="/shop" className="btn-primary text-sm">Back to Shop</Link>
            </div>
        );
    }

    const wishlisted = isInWishlist(product.id);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="min-h-screen">
            <div className="section-container py-4">
                <nav className="flex items-center gap-2 text-sm text-dark-400">
                    <Link to="/" className="hover:text-primary-500">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-primary-500">Shop</Link>
                    <span>/</span>
                    <span className="text-dark-600 dark:text-dark-200 font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>
            </div>

            <div className="section-container pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-cream-100 dark:bg-dark-800 relative">
                            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            {product.badge && (
                                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-sm font-bold bg-primary-500 text-white">{product.badge}</span>
                            )}
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button key={i} onClick={() => setSelectedImage(i)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary-500 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-primary-500 font-semibold uppercase tracking-wider mb-1">{product.category}</p>
                            <h1 className="font-display text-2xl lg:text-3xl font-bold text-dark-900 dark:text-white mb-3">{product.name}</h1>
                            <div className="flex items-center gap-3">
                                <div className="flex">{[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-dark-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}</div>
                                <span className="text-sm text-dark-400">{product.rating} ({product.reviewCount} reviews)</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="font-display text-3xl font-bold text-dark-900 dark:text-white">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <><span className="text-lg text-dark-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                    <span className="badge badge-sale">-{product.discount}%</span></>
                            )}
                        </div>

                        <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed">{product.description}</p>

                        {product.colors?.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-dark-900 dark:text-white mb-2">Color</h4>
                                <div className="flex gap-2">
                                    {product.colors.map(c => (
                                        <button key={c} onClick={() => setSelectedColor(c)}
                                            className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === c ? 'border-primary-500 scale-110 shadow-md' : 'border-dark-200 dark:border-dark-600'}`}
                                            style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.sizes?.length > 1 && (
                            <div>
                                <h4 className="text-sm font-semibold text-dark-900 dark:text-white mb-2">Size</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(s => (
                                        <button key={s} onClick={() => setSelectedSize(s)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedSize === s ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-dark-200 dark:border-dark-600 text-dark-600 dark:text-dark-300'}`}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center border border-dark-200 dark:border-dark-600 rounded-xl">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-dark-600 dark:text-dark-300 hover:bg-cream-100 dark:hover:bg-dark-700 text-lg">−</button>
                                <span className="w-12 text-center font-semibold text-dark-900 dark:text-white text-sm">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-dark-600 dark:text-dark-300 hover:bg-cream-100 dark:hover:bg-dark-700 text-lg">+</button>
                            </div>
                            <button onClick={() => { addToCart(product, quantity, selectedSize, selectedColor); addToast(`${product.name} added to cart`, 'success'); }} className="btn-primary flex-1 text-sm">Add to Cart</button>
                            <button onClick={() => { toggleWishlist(product); addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success'); }}
                                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${wishlisted ? 'bg-red-50 dark:bg-red-900/20 border-red-200 text-red-500' : 'border-dark-200 dark:border-dark-600 text-dark-400 hover:text-red-500'}`}>
                                <svg className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-cream-100 dark:bg-dark-800 rounded-2xl p-5 space-y-3">
                            {product.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300">
                                    <svg className="w-4 h-4 text-accent-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-16">
                    <div className="flex border-b border-cream-200 dark:border-dark-700 gap-8">
                        {['description', 'reviews', 'shipping'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-semibold capitalize transition-colors relative ${activeTab === tab ? 'text-primary-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500' : 'text-dark-400'}`}>
                                {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
                            </button>
                        ))}
                    </div>
                    <div className="py-8 max-w-3xl animate-fade-in">
                        {activeTab === 'description' && <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-sm">{product.description}</p>}
                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                {reviews.map(r => (
                                    <div key={r.id} className="bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-card border border-cream-100 dark:border-dark-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">{r.user[0]}</div>
                                                <div><p className="text-sm font-semibold text-dark-900 dark:text-white">{r.user}</p><p className="text-xs text-dark-400">{r.date}</p></div>
                                            </div>
                                            <div className="flex">{[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 ${i < r.rating ? 'text-amber-400' : 'text-dark-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            ))}</div>
                                        </div>
                                        <p className="text-sm text-dark-600 dark:text-dark-300">{r.text}</p>
                                        <button className="mt-3 text-xs text-dark-400 hover:text-primary-500">👍 Helpful ({r.helpful})</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div className="space-y-4 text-sm text-dark-600 dark:text-dark-300">
                                <p>🚚 <strong>Free Standard Shipping</strong> on orders over $50 (5-7 business days)</p>
                                <p>⚡ <strong>Express Shipping</strong> 2-3 business days for $12.99</p>
                                <p>🔄 <strong>Returns</strong> 30-day hassle-free return policy</p>
                            </div>
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="section-title text-dark-900 dark:text-white mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
