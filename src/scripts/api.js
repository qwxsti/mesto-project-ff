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

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(checkResponse);
}

export const setUserInfo = (newName, newDescription) => {
        return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newDescription,
        })
    })
    .then(checkResponse);
}

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(checkResponse);
}

export const addCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(checkResponse)
}

export const deleteCardOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkResponse);
}

export const putLike = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(checkResponse);
}

export const deleteLike = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(checkResponse);
}

export const updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(checkResponse);
}
