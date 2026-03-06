import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('novacart-cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('novacart-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
        setCartItems(prev => {
            const existing = prev.find(
                item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            );
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedSize, selectedColor }];
        });
    };

    const removeFromCart = (productId, selectedSize = null, selectedColor = null) => {
        setCartItems(prev => prev.filter(
            item => !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
        ));
    };

    const updateQuantity = (productId, quantity, selectedSize = null, selectedColor = null) => {
        if (quantity <= 0) {
            removeFromCart(productId, selectedSize, selectedColor);
            return;
        }
        setCartItems(prev => prev.map(item =>
            item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
