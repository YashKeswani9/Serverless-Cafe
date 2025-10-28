const API_BASE_URL = import.meta.env.VITE_API_URL

const getAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    const oidcContext = JSON.parse(sessionStorage.getItem(oidcKey || '') || "{}");
    const accessToken = oidcContext?.access_token;
    return accessToken;
};

export const deleteAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    if (oidcKey) {
        sessionStorage.removeItem(oidcKey);
    }
}

export const fetchCoffees = async () => {
    const response = await fetch(`${API_BASE_URL}/coffee`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.json();
};

export const getCoffee = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/coffee/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        },
    );
    return response.json();
};

export const createCoffee = async (coffee: any) => {
    const response = await fetch(`${API_BASE_URL}/coffee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(coffee),
    });
    return response.json();
};

export const updateCoffee = async (id: string, coffee: any) => {
    const response = await fetch(`${API_BASE_URL}/coffee/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(coffee),
    });
    return response.json();
};

export const deleteCoffee = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/coffee/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return response.json();
};
