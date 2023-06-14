const baseUrl = 'http://127.0.0.1:8080';
const endpoints = {
    auth: {
        login: `${baseUrl}/api/v1/auth/login`,
        register: `${baseUrl}/api/v1/auth/register`,
        refreshToken: `${baseUrl}/api/v1/auth/refresh`,
        logout: `${baseUrl}/api/v1/auth/logout`,
    },
    user: {
        get: `${baseUrl}/api/v1/user`,
        getMe: `${baseUrl}/api/v1/user/me`,
        delete: `${baseUrl}/api/v1/user`,
    },
    post: {
        get: `${baseUrl}/api/v1/posts`,
        getOne: `${baseUrl}/api/v1/posts/`,
        post: `${baseUrl}/api/v1/posts`,
        delete: `${baseUrl}/api/v1/posts/`,
    },
};

export { baseUrl, endpoints };
