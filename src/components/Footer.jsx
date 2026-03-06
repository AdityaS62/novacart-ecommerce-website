import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Shop: [
            { name: 'New Arrivals', path: '/shop' },
            { name: 'Best Sellers', path: '/shop' },
            { name: 'Sale', path: '/shop' },
            { name: 'All Products', path: '/shop' },
        ],
        Company: [
            { name: 'About Us', path: '/' },
            { name: 'Careers', path: '/' },
            { name: 'Blog', path: '/' },
            { name: 'Press', path: '/' },
        ],
        Support: [
            { name: 'Help Center', path: '/' },
            { name: 'Shipping Info', path: '/' },
            { name: 'Returns', path: '/' },
            { name: 'Contact Us', path: '/' },
        ],
    };

    return (
        <footer className="bg-dark-900 dark:bg-dark-950 text-dark-300 mt-20">
            {/* Newsletter */}
            <div className="border-b border-dark-800">
                <div className="section-container py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-display text-xl font-bold text-white mb-1">
                                Subscribe to our newsletter
                            </h3>
                            <p className="text-dark-400 text-sm">
                                Get the latest updates on new products and upcoming sales.
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-primary-500 text-sm transition-colors"
                            />
                            <button className="btn-primary whitespace-nowrap text-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="section-container py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">N</span>
                            </div>
                            <span className="font-display font-bold text-lg text-white">
                                Nova<span className="text-primary-500">Cart</span>
                            </span>
                        </Link>
                        <p className="text-dark-400 text-sm leading-relaxed mb-4">
                            Discover premium products for modern living. Curated collections, exceptional quality.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {['twitter', 'instagram', 'facebook', 'youtube'].map(social => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-9 h-9 rounded-xl bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <span className="text-xs text-dark-400 hover:text-white capitalize">
                                        {social[0].toUpperCase()}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                {title}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map(link => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-dark-400 hover:text-primary-400 text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dark-800">
                <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-xs">
                        © {currentYear} NovaCart. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-dark-500 text-xs">We accept:</span>
                        <div className="flex gap-2">
                            {['Visa', 'MC', 'Amex', 'PayPal'].map(card => (
                                <span key={card} className="px-2 py-1 bg-dark-800 rounded text-[10px] text-dark-400 font-medium">
                                    {card}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
