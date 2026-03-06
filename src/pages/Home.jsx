import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { products, categories, testimonials } from '../data/products';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const featuredProducts = activeTab === 'all'
        ? products.slice(0, 8)
        : products.filter(p => p.badge === (activeTab === 'new' ? 'New' : activeTab === 'best' ? 'Best Seller' : 'Sale')).slice(0, 8);

    const bestDeals = products.filter(p => p.discount > 20).slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section-container py-6 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Hero Card */}
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-dark-800 dark:to-dark-700 p-8 lg:p-12 flex flex-col justify-center min-h-[400px] lg:min-h-[480px] group">
                        <div className="relative z-10 max-w-md">
                            <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full mb-4 animate-fade-in">
                                ✨ New Collection 2024
                            </span>
                            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white leading-tight mb-4 animate-fade-in-up">
                                Best Furniture
                                <br />
                                <span className="text-gradient">Collection</span>
                            </h1>
                            <p className="text-dark-500 dark:text-dark-400 mb-6 text-sm lg:text-base animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                Discover premium products crafted for modern living. Up to 40% off on selected items.
                            </p>
                            <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <Link to="/shop" className="btn-primary text-sm">
                                    Shop Now →
                                </Link>
                                <Link to="/shop" className="btn-outline text-sm">
                                    Explore Collection
                                </Link>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 dark:opacity-10">
                            <div className="absolute top-10 right-10 w-32 h-32 bg-primary-300 rounded-full blur-3xl" />
                            <div className="absolute bottom-10 right-20 w-24 h-24 bg-amber-300 rounded-full blur-2xl" />
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop"
                            alt="Furniture"
                            className="absolute right-4 bottom-4 w-48 lg:w-64 h-auto rounded-2xl shadow-2xl opacity-90 group-hover:scale-105 transition-transform duration-700 hidden sm:block"
                        />
                    </div>

                    {/* Side Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 flex flex-col justify-between min-h-[220px] group cursor-pointer hover:shadow-card-hover transition-all duration-300">
                            <div>
                                <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wider">Trending</span>
                                <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white mt-1">
                                    Stylish Looks For Any Season
                                </h3>
                            </div>
                            <div className="flex items-end justify-between">
                                <Link to="/shop" className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                                    Shop Now →
                                </Link>
                                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-2xl">
                                    👔
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 flex flex-col justify-between min-h-[220px] group cursor-pointer hover:shadow-card-hover transition-all duration-300">
                            <div>
                                <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">Electronics</span>
                                <h3 className="font-display text-lg font-bold text-dark-900 dark:text-white mt-1">
                                    Smart Gadgets & More
                                </h3>
                            </div>
                            <div className="flex items-end justify-between">
                                <Link to="/shop" className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                                    Shop Now →
                                </Link>
                                <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Up to 30% OFF
                                </span>
                            </div>
                        </div>

                        <div className="sm:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 flex items-center justify-between min-h-[140px] group cursor-pointer hover:shadow-card-hover transition-all duration-300">
                            <div>
                                <span className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider">Special Offer</span>
                                <h3 className="font-display text-xl font-bold text-dark-900 dark:text-white mt-1">
                                    Fitness for Smart
                                    <br />
                                    <span className="text-green-600 dark:text-green-400">Special Offer</span>
                                </h3>
                                <Link to="/shop" className="inline-block mt-3 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline">
                                    View Deals →
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-3xl">
                                    🏋️
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section-container py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="section-title text-dark-900 dark:text-white">Shop by Category</h2>
                        <p className="text-dark-400 mt-1 text-sm">Explore our curated collections</p>
                    </div>
                    <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors">
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {categories.map((cat, i) => (
                        <Link
                            key={cat.id}
                            to="/shop"
                            className={`${cat.color} rounded-2xl p-4 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up`}
                            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                        >
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                {cat.icon}
                            </div>
                            <p className="text-sm font-semibold text-dark-900 dark:text-white">{cat.name}</p>
                            <p className="text-xs text-dark-400 mt-0.5">{cat.count} items</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-container py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="section-title text-dark-900 dark:text-white">Featured Products</h2>
                        <p className="text-dark-400 mt-1 text-sm">Handpicked just for you</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-cream-100 dark:bg-dark-800 rounded-xl p-1 gap-1">
                        {[
                            { key: 'all', label: 'All' },
                            { key: 'new', label: 'New' },
                            { key: 'best', label: 'Best Sellers' },
                            { key: 'sale', label: 'On Sale' },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === tab.key
                                        ? 'bg-white dark:bg-dark-700 text-dark-900 dark:text-white shadow-sm'
                                        : 'text-dark-400 hover:text-dark-600 dark:hover:text-dark-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link to="/shop" className="btn-outline text-sm inline-flex items-center gap-2">
                        View All Products
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Weekly Best Deals */}
            <section className="section-container py-12">
                <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="font-display text-2xl lg:text-3xl font-bold text-white">
                                    Weekly Best Deals
                                </h2>
                                <p className="text-white/70 text-sm mt-1">Don't miss out on these limited-time offers</p>
                            </div>
                            <Link to="/shop" className="bg-white text-primary-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                                View All Deals →
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {bestDeals.map((product, i) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/25 transition-all duration-300 group"
                                >
                                    <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-white/10">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="text-white font-semibold text-sm truncate">{product.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-white font-bold">${product.price.toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="text-white/50 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <span className="inline-block mt-2 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Save {product.discount}%
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Promotional Banners */}
            <section className="section-container py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-cream-200 dark:bg-dark-800 rounded-3xl p-6 flex items-center gap-4 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                            🚚
                        </div>
                        <div>
                            <h4 className="font-semibold text-dark-900 dark:text-white text-sm">Free Shipping</h4>
                            <p className="text-dark-400 text-xs mt-0.5">On orders over $50</p>
                        </div>
                    </div>
                    <div className="bg-cream-200 dark:bg-dark-800 rounded-3xl p-6 flex items-center gap-4 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                        <div className="w-14 h-14 bg-accent-100 dark:bg-accent-900/30 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                            🔄
                        </div>
                        <div>
                            <h4 className="font-semibold text-dark-900 dark:text-white text-sm">Easy Returns</h4>
                            <p className="text-dark-400 text-xs mt-0.5">30-day return policy</p>
                        </div>
                    </div>
                    <div className="bg-cream-200 dark:bg-dark-800 rounded-3xl p-6 flex items-center gap-4 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                            🛡️
                        </div>
                        <div>
                            <h4 className="font-semibold text-dark-900 dark:text-white text-sm">Secure Payment</h4>
                            <p className="text-dark-400 text-xs mt-0.5">100% secure checkout</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-container py-12">
                <div className="text-center mb-10">
                    <h2 className="section-title text-dark-900 dark:text-white">What Our Customers Say</h2>
                    <p className="text-dark-400 mt-2 text-sm max-w-md mx-auto">
                        Real reviews from real customers who love NovaCart
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((t, i) => (
                            <div
                                key={t.id}
                                className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
                            >
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <svg key={j} className={`w-4 h-4 ${j < t.rating ? 'text-amber-400' : 'text-dark-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed mb-4">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold text-dark-900 dark:text-white">{t.name}</p>
                                        <p className="text-xs text-dark-400">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="section-container py-12">
                <div className="bg-dark-900 dark:bg-dark-800 rounded-3xl p-8 lg:p-14 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20" />
                    <div className="relative z-10">
                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
                            Discover Premium Products
                            <br />
                            <span className="text-primary-400">for Modern Living</span>
                        </h2>
                        <p className="text-dark-400 mb-6 text-sm max-w-lg mx-auto">
                            Join thousands of happy customers. Get exclusive access to new arrivals, special deals, and more.
                        </p>
                        <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                            Start Shopping
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
