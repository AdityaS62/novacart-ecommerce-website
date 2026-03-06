import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Account() {
    const { user, isLoggedIn, login, register, logout } = useAuth();
    const { addToast } = useToast();
    const [isLogin, setIsLogin] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleAuth = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(formData.email, formData.password);
            addToast('Welcome back!', 'success');
        } else {
            register(formData.name, formData.email, formData.password);
            addToast('Account created!', 'success');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12">
                <div className="w-full max-w-md mx-4">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">N</span>
                        </div>
                        <h1 className="font-display text-2xl font-bold text-dark-900 dark:text-white">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-dark-400 text-sm mt-1">
                            {isLogin ? 'Sign in to your NovaCart account' : 'Join NovaCart today'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="text-xs font-medium text-dark-500 mb-1 block">Full Name</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="John Doe" required />
                            </div>
                        )}
                        <div>
                            <label className="text-xs font-medium text-dark-500 mb-1 block">Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input-field" placeholder="john@example.com" required />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-dark-500 mb-1 block">Password</label>
                            <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="input-field" placeholder="••••••••" required />
                        </div>
                        <button type="submit" className="btn-primary w-full text-sm">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                        <p className="text-center text-sm text-dark-400">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary-500 font-semibold hover:underline">
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    const tabs = [
        { key: 'orders', label: 'My Orders', icon: '📦' },
        { key: 'profile', label: 'Profile', icon: '👤' },
        { key: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    const statusColors = {
        Delivered: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
        Shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        Processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    };

    return (
        <div className="min-h-screen">
            <div className="bg-cream-100 dark:bg-dark-900 py-8 mb-8">
                <div className="section-container flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                        <h1 className="font-display text-xl font-bold text-dark-900 dark:text-white">{user.name}</h1>
                        <p className="text-dark-400 text-sm">{user.email} · Member since {user.joinDate}</p>
                    </div>
                </div>
            </div>

            <div className="section-container pb-16">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="md:w-56 flex-shrink-0">
                        <div className="bg-white dark:bg-dark-800 rounded-2xl p-2 shadow-card border border-cream-100 dark:border-dark-700 space-y-1 md:sticky md:top-24">
                            {tabs.map(tab => (
                                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${activeTab === tab.key ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-dark-500 hover:bg-cream-100 dark:hover:bg-dark-700'
                                        }`}>
                                    <span>{tab.icon}</span>{tab.label}
                                </button>
                            ))}
                            <button onClick={() => { logout(); addToast('Signed out', 'info'); }}
                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3">
                                <span>🚪</span>Sign Out
                            </button>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 animate-fade-in">
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                <h2 className="font-display text-lg font-bold text-dark-900 dark:text-white">Order History</h2>
                                {user.orders.map(order => (
                                    <div key={order.id} className="bg-white dark:bg-dark-800 rounded-2xl p-5 shadow-card border border-cream-100 dark:border-dark-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="text-sm font-semibold text-dark-900 dark:text-white">{order.id}</p>
                                                <p className="text-xs text-dark-400">{order.date}</p>
                                            </div>
                                            <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-dark-400">{order.items} item{order.items !== 1 && 's'}</span>
                                            <span className="font-bold text-dark-900 dark:text-white">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 space-y-4">
                                <h2 className="font-display text-lg font-bold text-dark-900 dark:text-white">Profile Settings</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-xs font-medium text-dark-500 mb-1 block">First Name</label>
                                        <input className="input-field" defaultValue="John" /></div>
                                    <div><label className="text-xs font-medium text-dark-500 mb-1 block">Last Name</label>
                                        <input className="input-field" defaultValue="Doe" /></div>
                                </div>
                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">Email</label>
                                    <input className="input-field" defaultValue={user.email} /></div>
                                <div><label className="text-xs font-medium text-dark-500 mb-1 block">Phone</label>
                                    <input className="input-field" placeholder="+1 (555) 000-0000" /></div>
                                <button onClick={() => addToast('Profile updated', 'success')} className="btn-primary text-sm">Save Changes</button>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-card border border-cream-100 dark:border-dark-700 space-y-6">
                                <h2 className="font-display text-lg font-bold text-dark-900 dark:text-white">Account Settings</h2>
                                {['Email notifications for orders', 'Promotional emails', 'SMS notifications'].map((setting, i) => (
                                    <div key={i} className="flex items-center justify-between py-2">
                                        <span className="text-sm text-dark-600 dark:text-dark-300">{setting}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={i === 0} className="sr-only peer" />
                                            <div className="w-10 h-5 bg-dark-200 dark:bg-dark-600 peer-checked:bg-primary-500 rounded-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                        </label>
                                    </div>
                                ))}
                                <div className="border-t border-cream-200 dark:border-dark-700 pt-4">
                                    <h3 className="text-sm font-semibold text-red-500 mb-2">Danger Zone</h3>
                                    <button className="text-sm text-red-500 border border-red-200 dark:border-red-800 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
