const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('authToken');

const handleResponse = async (response) => {
    let data;
    try {
        data = await response.json();
    } catch (error) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
    }

    if (!response.ok) {
        throw new Error(data.message || 'Algo deu errado');
    }

    return data;
};

export const registerUser = (username, password, profilePicture) => {
    return fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, profilePicture }),
    }).then(handleResponse);
};

export const loginUser = (username, password) => {
    return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }).then(handleResponse);
};

export const postScore = (score) => {
    const token = localStorage.getItem('authToken')
    if (!token) {
        return Promise.reject(new Error('Nenhum token encontrado'))
    }

    return fetch(`${API_URL}/score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
    }).then(handleResponse);
};

export const getLeaderboard = () => {
    return fetch(`${API_URL}/score/leaderboard`).then(handleResponse);
};

export const getUserData = () => {
    const token = getToken();
    if (!token) return Promise.reject(new Error('Nenhum token encontrado'));

    return fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(handleResponse);
};

export const updateUserData = (userData) => {
    const token = getToken();
    if (!token) return Promise.reject(new Error('Nenhum token encontrado'));

    return fetch(`${API_URL}/auth/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

export const updatePassword = (oldPassword, newPassword) => {
    const token = getToken();
    if (!token) return Promise.reject(new Error('Nenhum token encontrado'));

    return fetch(`${API_URL}/auth/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
    }).then(handleResponse);
};

export const deleteUser = () => {
    const token = getToken();
    if (!token) return Promise.reject(new Error('Nenhum token encontrado'));

    return fetch(`${API_URL}/auth/me`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(handleResponse);
};