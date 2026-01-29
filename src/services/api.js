// API Service for Portfolio
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper
async function fetchApi(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    // Handle empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

// Auth token management
export const setAuthToken = (token) => {
    localStorage.setItem('portfolio_token', token);
};

export const getAuthToken = () => {
    return localStorage.getItem('portfolio_token');
};

export const clearAuthToken = () => {
    localStorage.removeItem('portfolio_token');
};

// Authenticated fetch
async function fetchApiAuth(endpoint, options = {}) {
    const token = getAuthToken();
    return fetchApi(endpoint, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });
}

// Profile API
export const profileApi = {
    get: () => fetchApi('/profile'),
    update: (data) => fetchApiAuth('/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// About API
export const aboutApi = {
    get: () => fetchApi('/about'),
    update: (data) => fetchApiAuth('/about', { method: 'PUT', body: JSON.stringify(data) }),
};

// Stats API
export const statsApi = {
    getAll: () => fetchApi('/stats'),
    create: (data) => fetchApiAuth('/stats', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchApiAuth(`/stats/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchApiAuth(`/stats/${id}`, { method: 'DELETE' }),
};

// Experiences API
export const experiencesApi = {
    getAll: () => fetchApi('/experiences'),
    get: (id) => fetchApi(`/experiences/${id}`),
    create: (data) => fetchApiAuth('/experiences', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchApiAuth(`/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchApiAuth(`/experiences/${id}`, { method: 'DELETE' }),
};

// Skill Categories API
export const skillCategoriesApi = {
    getAll: () => fetchApi('/skill-categories'),
    create: (data) => fetchApiAuth('/skill-categories', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchApiAuth(`/skill-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchApiAuth(`/skill-categories/${id}`, { method: 'DELETE' }),
};

// Skills API
export const skillsApi = {
    getAll: () => fetchApi('/skills'),
    create: (data) => fetchApiAuth('/skills', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchApiAuth(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchApiAuth(`/skills/${id}`, { method: 'DELETE' }),
};

// Projects API
export const projectsApi = {
    getAll: () => fetchApi('/projects'),
    get: (id) => fetchApi(`/projects/${id}`),
    create: (data) => fetchApiAuth('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchApiAuth(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchApiAuth(`/projects/${id}`, { method: 'DELETE' }),
};

// Contact API
export const contactApi = {
    get: () => fetchApi('/contact'),
    update: (data) => fetchApiAuth('/contact', { method: 'PUT', body: JSON.stringify(data) }),
};

// Social Links API
export const socialLinksApi = {
    getAll: () => fetchApi('/social-links'),
    create: (data) => fetchApiAuth('/social-links', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchApiAuth(`/social-links/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetchApiAuth(`/social-links/${id}`, { method: 'DELETE' }),
};

// Email API (Contact Form)
export const emailApi = {
    send: (data) => fetchApi('/email/send', { method: 'POST', body: JSON.stringify(data) }),
};

// Auth API
export const authApi = {
    login: async (username, password) => {
        const response = await fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        if (response.token) {
            setAuthToken(response.token);
        }
        return response;
    },
    logout: () => {
        clearAuthToken();
    },
    changePassword: (username, currentPassword, newPassword) =>
        fetchApiAuth('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ username, currentPassword, newPassword }),
        }),
};

export default {
    profile: profileApi,
    about: aboutApi,
    stats: statsApi,
    experiences: experiencesApi,
    skillCategories: skillCategoriesApi,
    skills: skillsApi,
    projects: projectsApi,
    contact: contactApi,
    socialLinks: socialLinksApi,
    email: emailApi,
    auth: authApi,
};
