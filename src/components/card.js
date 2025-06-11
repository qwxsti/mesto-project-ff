const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки
export function createCard(cardData, deleteCallback, likeCallback, imageCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    likeButton.addEventListener('click', (evt) => {
        likeCallback(evt);
    })
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.imgAlt || `Фотография: ${cardData.name}`;
    cardTitle.textContent= cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    //реализация попапа из карточки
    cardImage.addEventListener('click', () => {
        imageCallback(cardData);
    })

    return cardElement;
}

// Функция лайка
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
}