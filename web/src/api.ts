const baseUrl = 'http://127.0.0.1:8080';
const endpoints = {
    auth: {
        login: `${baseUrl}/api/v1/auth/login`,
        register: `${baseUrl}/api/v1/auth/register`,
    },
};

export { baseUrl, endpoints };
