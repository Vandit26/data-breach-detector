const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    }
};

export const getBreachesForEmail = async (email) => {
    try {
        const url = 'https://data-breach-detector-server-production.up.railway.app/api/getBreachesForEmail';
        const result = await fetch(url, {
            ...requestOptions,
            body: JSON.stringify({
                email,
            }),
        });
        return result.json();
    } catch (err) {
        throw err;
    }
};


