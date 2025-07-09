const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-41',
    headers: {
        authorization: '7f946882-e149-4e6e-94f3-84a3a2a0011a',
        'Content-Type': 'application/json'
    }
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка:${res.status}`);
    }
}

const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}

export const getUserInfo = () => {
    return request(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
}


export const setUserInfo = (newName, newDescription) => {
        return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newDescription,
        })
    })
}

export const getCards = () => {
    return request(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
}

export const addCard = (cardName, cardLink) => {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
}

export const deleteCardOnServer = (cardId) => {
    return request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const putLike = (cardID) => {
    return request(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers,
    })
}

export const deleteLike = (cardID) => {
    return request(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const updateAvatar = (link) => {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
}
