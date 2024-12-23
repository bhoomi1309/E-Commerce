const api = 'http://localhost:3001';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${api}/products`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const addProducts = async (data) => {
    try {
        const response = await fetch(api + '/products', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error occurred while adding product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${api}/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        await response.json();
    } catch (error) {
        console.error(`Failed to delete product with ID ${id}:`, error);
        throw error;
    }
};

export const renumberProducts = async (id) => {
    try {
        const response = await fetch(`${api}/products/${id}`, {
            method: 'POST',
            body: JSON.stringify({ deletedNo: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to renumber products with ID ${id}:`, error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${api}/orders`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw error;
    }
};