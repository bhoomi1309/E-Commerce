const api = 'http://localhost:3001';
export const fetchProducts = () => {
    const arr = fetch(api + '/products').then(res => res.json());
    return arr;
};
export const getProductById = async (id) => {
    const res = await fetch(api + '/products/' + id, { method: "GET" });
    const data = await res.json();
    return data;
};
export const removeFromCartAPI = async (userEmail, productId) => {
    try {
        const response = await fetch(api + "/cart/remove", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail,
                productId,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to remove product from cart");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error removing product from cart:", error.message);
        return { error: error.message };
    }
};
export const getCartByEmail = async (email) => {
    try {
        const res = await fetch(api + '/cart/' + email, { method: "GET" });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in getCartByEmail:", error);
        throw error;
    }
};

export const addToCartAPI = async (userEmail, productId) => {
    try {
        const response = await fetch(api+"/cart/add", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail, productId }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }
};

export const emptyCart = async (email) => {
    try {
        const response = await fetch(api+'/cart/empty', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error clearing cart:", error);
        return { success: false, message: 'Something went wrong. Please try again later.' };
    }
};

export const getOrdersByEmail = async (email) => {
    try {
        const res = await fetch(api + '/orders/' + email, { method: "GET" });
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};

export const addToOrder = async ({ email, items, address, paymentMethod, totalAmount }) => {
    const formatOrderDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const orderDate = formatOrderDate();
    try {
        const response = await fetch(api+'/order/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                items,
                address,
                paymentMethod,
                totalAmount,
                orderDate
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to place the order.');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error placing order:', error.message);
        return { success: false, message: error.message };
    }
};

export const getProductStock = async (productNo) => {
    try {
        const response = await fetch(api+'/products/stock/'+productNo);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.Stock !== undefined) {
            return data.Stock;
        } else {
            throw new Error('Stock information not available');
        }
    } catch (error) {
        console.error("Failed to fetch product stock:", error);
        throw error;
    }
};