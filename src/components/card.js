const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки
export function createCard(cardData, deleteCallback, likeCallback, imageCallback, userID) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    const isLiked = cardData.likes.some((user) => user._id === userID);

    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', (evt) => {
        likeCallback(evt, cardData._id, likeButton.classList.contains('card__like-button_is-active'));
    })

    likeCounter.textContent = cardData.likes.length;

    if (cardData.owner._id === userID) {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => {
            deleteCallback(cardData._id, cardElement);
        });
    } else {
        deleteButton.style.display = 'none';
    }
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.imgAlt || `Фотография: ${cardData.name}`;
    cardTitle.textContent= cardData.name;

    //реализация попапа из карточки
    cardImage.addEventListener('click', () => {
        imageCallback(cardData);
    })

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
}