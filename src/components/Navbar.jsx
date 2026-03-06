import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { cartCount } = useCart();
    const { wishlistItems } = useWishlist();
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const searchRef = useRef(null);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setUserMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Categories', path: '/shop' },
        { name: 'Deals', path: '/shop' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/90 dark:bg-dark-950/90 backdrop-blur-xl shadow-lg py-2'
                    : 'bg-white dark:bg-dark-950 py-4'
                }`}>
                <div className="section-container">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">N</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-dark-900 dark:text-white">
                                Nova<span className="text-primary-500">Cart</span>
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors duration-200 hover:text-primary-500 ${location.pathname === link.path
                                            ? 'text-primary-500'
                                            : 'text-dark-600 dark:text-dark-300'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:block flex-1 max-w-md mx-4" ref={searchRef}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSearchOpen(true);
                                    }}
                                    onFocus={() => setSearchOpen(true)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 dark:bg-dark-800 border border-transparent focus:border-primary-300 dark:focus:border-primary-600 focus:outline-none text-sm text-dark-900 dark:text-white placeholder:text-dark-400 transition-all duration-200"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>

                                {/* Search Results Dropdown */}
                                {searchOpen && searchResults.length > 0 && (
                                    <div className="absolute top-full mt-2 w-full bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-cream-200 dark:border-dark-700 overflow-hidden animate-scale-in z-50">
                                        {searchResults.map(product => (
                                            <Link
                                                key={product.id}
                                                to={`/product/${product.id}`}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-cream-100 dark:hover:bg-dark-700 transition-colors"
                                                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                            >
                                                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                                <div>
                                                    <p className="text-sm font-medium text-dark-900 dark:text-white">{product.name}</p>
                                                    <p className="text-xs text-dark-400">${product.price.toFixed(2)}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="md:hidden p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-dark-800 transition-colors text-dark-600 dark:text-dark-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-dark-800 transition-all duration-300 text-dark-600 dark:text-dark-300"
                                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                            </button>

                            {/* Wishlist */}
                            <Link
                                to="/wishlist"
                                className="p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-dark-800 transition-colors text-dark-600 dark:text-dark-300 relative"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-dark-800 transition-colors text-dark-600 dark:text-dark-300 relative"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] animate-scale-in">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User / Account */}
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => isLoggedIn ? setUserMenuOpen(!userMenuOpen) : navigate('/account')}
                                    className="p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-dark-800 transition-colors text-dark-600 dark:text-dark-300"
                                >
                                    {isLoggedIn && user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </button>
                                {userMenuOpen && isLoggedIn && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-cream-200 dark:border-dark-700 overflow-hidden animate-scale-in">
                                        <div className="px-4 py-3 border-b border-cream-200 dark:border-dark-700">
                                            <p className="text-sm font-semibold text-dark-900 dark:text-white">{user?.name}</p>
                                            <p className="text-xs text-dark-400">{user?.email}</p>
                                        </div>
                                        <Link to="/account" className="block px-4 py-2.5 text-sm text-dark-600 dark:text-dark-300 hover:bg-cream-100 dark:hover:bg-dark-700 transition-colors">My Account</Link>
                                        <Link to="/account" className="block px-4 py-2.5 text-sm text-dark-600 dark:text-dark-300 hover:bg-cream-100 dark:hover:bg-dark-700 transition-colors">My Orders</Link>
                                        <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Sign Out</button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-dark-800 transition-colors text-dark-600 dark:text-dark-300"
                            >
                                {mobileMenuOpen ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    {searchOpen && (
                        <div className="md:hidden mt-3 animate-slide-down">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream-100 dark:bg-dark-800 border border-transparent focus:border-primary-300 dark:focus:border-primary-600 focus:outline-none text-sm text-dark-900 dark:text-white placeholder:text-dark-400"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {searchResults.length > 0 && (
                                <div className="mt-2 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-cream-200 dark:border-dark-700 overflow-hidden">
                                    {searchResults.map(product => (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-cream-100 dark:hover:bg-dark-700 transition-colors"
                                            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                        >
                                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-dark-900 dark:text-white">{product.name}</p>
                                                <p className="text-xs text-dark-400">${product.price.toFixed(2)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-cream-200 dark:border-dark-800 bg-white dark:bg-dark-950 animate-slide-down">
                        <div className="section-container py-4 space-y-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                                            : 'text-dark-600 dark:text-dark-300 hover:bg-cream-100 dark:hover:bg-dark-800'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {!isLoggedIn && (
                                <Link
                                    to="/account"
                                    className="block px-4 py-3 rounded-xl text-sm font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                >
                                    Sign In / Register
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            {/* Spacer */}
            <div className={`${scrolled ? 'h-[60px]' : 'h-[72px]'} transition-all duration-500`} />
        </>
    );
}
