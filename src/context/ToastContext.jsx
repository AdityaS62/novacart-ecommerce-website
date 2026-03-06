import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto animate-slide-up px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px] max-w-md backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] ${toast.type === 'success'
                                ? 'bg-accent-500/95 text-white'
                                : toast.type === 'error'
                                    ? 'bg-red-500/95 text-white'
                                    : toast.type === 'warning'
                                        ? 'bg-amber-500/95 text-white'
                                        : 'bg-dark-900/95 text-white dark:bg-white/95 dark:text-dark-900'
                            }`}
                        onClick={() => removeToast(toast.id)}
                    >
                        <span className="text-lg">
                            {toast.type === 'success' && '✓'}
                            {toast.type === 'error' && '✕'}
                            {toast.type === 'warning' && '⚠'}
                            {toast.type === 'info' && 'ℹ'}
                        </span>
                        <span className="font-medium text-sm">{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
