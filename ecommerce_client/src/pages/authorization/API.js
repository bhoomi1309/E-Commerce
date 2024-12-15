import Swal from "sweetalert2";
const apiUser = 'http://localhost:3001';

export const checkUserByEmail = async (email) => {
    try {
        const res = await fetch(apiUser + '/auth/users/email/' + email);
        if (res.status !== 200) {
            throw new Error('Failed to fetch user');
        }
        const data = await res.json();
        return data.exists;
    } 
    catch (error) {
        console.error('Error checking user by email:', error);
        return null;
    }
};

export const checkUserByUsername = async (username) => {
    try {
        const res = await fetch(apiUser + '/auth/users/username/' + username);
        if (res.status !== 200) {
            throw new Error('Failed to fetch user');
        }
        const data = await res.json();
        return data.exists;
    } 
    catch (error) {
        console.error('Error checking user by email:', error);
        return null;
    }
};

export const addUser = async (user, navigate) => {
    try {
        const response = await fetch(apiUser + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register');
        }
        else{
            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "You have registered successfully",
            });
            navigate('/auth/login');
        }
    } 
    catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.message,
        });
    }
};

export const checkUser = async (user) => {
    try {
        const res = await fetch(apiUser + '/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await res.json();
        localStorage.setItem('user', data.user);
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
