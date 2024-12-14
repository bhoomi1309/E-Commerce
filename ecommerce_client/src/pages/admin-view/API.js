const api = 'http://localhost:3001';
export const fetchProducts = () => {
    const arr = fetch(api + '/products').then(res => res.json());
    return arr;
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
    fetch(api + '/products/' + id,
        { method: "DELETE" }
    )
        .then(res => res.json())
}
export const renumberProducts = async (id) => {
    const response = await fetch(api + '/products/' + id, {
        method: 'POST',
        body: JSON.stringify({ deletedNo: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
};


export const fetchOrders = () => {
    const arr = fetch(api + '/orders').then(res => res.json());
    return arr;
};