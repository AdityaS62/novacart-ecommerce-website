import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { products, categories } from '../data/products';

export default function ProductListing() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [selectedCategory, sortBy, minRating]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        if (minRating > 0) {
            result = result.filter(p => p.rating >= minRating);
        }

        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            case 'discount':
                result.sort((a, b) => b.discount - a.discount);
                break;
            default:
                break;
        }

        return result;
    }, [selectedCategory, priceRange, minRating, sortBy]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat !== 'All') {
            setSearchParams({ category: cat });
        } else {
            setSearchParams({});
        }
    };

    const resetFilters = () => {
        setSelectedCategory('All');
        setPriceRange([0, 1000]);
        setMinRating(0);
        setSortBy('featured');
        setSearchParams({});
    };

    return (
        <div className="min-h-screen">
            {/* Page Header */}
            <div className="bg-cream-100 dark:bg-dark-900 py-8 mb-8">
                <div className="section-container">
                    <h1 className="section-title text-dark-900 dark:text-white">All Products</h1>
                    <p className="text-dark-400 mt-1 text-sm">
                        Showing {filteredProducts.length} products
                    </p>
                </div>
            </div>

            <div className="section-container pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-dark-800 rounded-xl border border-cream-200 dark:border-dark-700 text-sm font-medium text-dark-600 dark:text-dark-300"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`w-full lg:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 sticky top-24 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-display font-bold text-dark-900 dark:text-white">Filters</h3>
                                <button onClick={resetFilters} className="text-xs text-primary-500 hover:text-primary-600 font-medium">
                                    Reset All
                                </button>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="text-sm font-semibold text-dark-900 dark:text-white mb-3">Category</h4>
                                <div className="space-y-1.5">
                                    <button
                                        onClick={() => handleCategoryChange('All')}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'All'
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                                : 'text-dark-500 hover:bg-cream-100 dark:hover:bg-dark-700'
                                            }`}
                                    >
                                        All Products
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.name)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${selectedCategory === cat.name
                                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                                    : 'text-dark-500 hover:bg-cream-100 dark:hover:bg-dark-700'
                                                }`}
                                        >
                                            <span>{cat.icon}</span>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="text-sm font-semibold text-dark-900 dark:text-white mb-3">Price Range</h4>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[1]}
                                        onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full accent-primary-500"
                                    />
                                    <div className="flex items-center justify-between text-xs text-dark-400">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <h4 className="text-sm font-semibold text-dark-900 dark:text-white mb-3">Rating</h4>
                                <div className="space-y-1.5">
                                    {[4, 3, 2, 1].map(rating => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${minRating === rating
                                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                    : 'text-dark-500 hover:bg-cream-100 dark:hover:bg-dark-700'
                                                }`}
                                        >
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400' : 'text-dark-200 dark:text-dark-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span>& up</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-dark-400">
                                <span className="font-semibold text-dark-900 dark:text-white">{filteredProducts.length}</span> products found
                            </p>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="px-4 py-2 rounded-xl bg-white dark:bg-dark-800 border border-cream-200 dark:border-dark-700 text-sm text-dark-600 dark:text-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                                <option value="discount">Biggest Discount</option>
                            </select>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                {[...Array(9)].map((_, i) => <ProductCardSkeleton key={i} />)}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                {filteredProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="font-display text-xl font-bold text-dark-900 dark:text-white mb-2">No products found</h3>
                                <p className="text-dark-400 text-sm mb-6">Try adjusting your filters or search terms</p>
                                <button onClick={resetFilters} className="btn-primary text-sm">
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
