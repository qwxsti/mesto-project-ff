// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.imgAlt || `Фотография: ${cardData.name}`;
    cardTitle.textContent= cardData.name;

    cardDeleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    return cardElement;

}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard);
    cardList.append(card);
})