import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, index = 0 }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToast } = useToast();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const wishlisted = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
        addToast(`${product.name} added to cart`, 'success');
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
        addToast(
            wishlisted ? `Removed from wishlist` : `Added to wishlist`,
            wishlisted ? 'info' : 'success'
        );
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card group-hover:shadow-card-hover">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square bg-cream-100 dark:bg-dark-700">
                    {/* Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 skeleton" />
                    )}
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                    />

                    {/* Badge */}
                    {product.badge && (
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold ${product.badge === 'Sale' || product.badge === 'Best Seller'
                                ? 'bg-primary-500 text-white'
                                : product.badge === 'New'
                                    ? 'bg-accent-500 text-white'
                                    : product.badge === 'Top Rated'
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-dark-900 text-white dark:bg-white dark:text-dark-900'
                            }`}>
                            {product.badge}
                        </span>
                    )}

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            -{product.discount}%
                        </span>
                    )}

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-dark-900/30 flex items-center justify-center gap-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <button
                            onClick={handleAddToCart}
                            className="w-11 h-11 bg-white rounded-xl flex items-center justify-center hover:bg-primary-500 hover:text-white text-dark-900 transition-all duration-200 transform translate-y-3 group-hover:translate-y-0 shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleToggleWishlist}
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 transform translate-y-3 group-hover:translate-y-0 shadow-lg ${wishlisted
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-dark-900 hover:bg-red-500 hover:text-white'
                                }`}
                        >
                            <svg className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-xs text-dark-400 dark:text-dark-500 uppercase tracking-wider mb-1">
                        {product.category}
                    </p>
                    <h3 className="font-semibold text-dark-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                                <svg
                                    key={star}
                                    className={`w-3.5 h-3.5 ${star <= Math.floor(product.rating) ? 'text-amber-400' : 'text-dark-200 dark:text-dark-600'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-dark-400">({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-lg text-dark-900 dark:text-white">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-dark-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
