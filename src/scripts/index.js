import './cards.js';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup } from '../components/modal.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';

const cardList = document.querySelector('.places__list');

//Попапы
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const imageTypePopup = document.querySelector('.popup_type_image');
const allPopups = document.querySelectorAll('.popup');

//Элементы попапа с картинкой
const popupImage = imageTypePopup.querySelector('.popup__image');
const popupCaption = imageTypePopup.querySelector('.popup__caption');

//Кнопки
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

//Формы и их поля
const formProfileElement = editProfilePopup.querySelector('.popup__form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const formCardElement = newCardPopup.querySelector('.popup__form');
const cardNameInput = formCardElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = formCardElement.querySelector('.popup__input_type_url');

//Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// --ФУНКЦИИ ОБРАБОТЧИКИ--

// Добавление карточки из формы
function formCardSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        imgAlt: `Фотография: ${cardNameInput.value}`,
        link: cardLinkInput.value
    }

    const card = createCard(cardData, deleteCard, likeCard, imageClick);
    cardList.prepend(card);
    
    formCardElement.reset();
    closePopup(newCardPopup);
}

// Редактирование профиля из формы
function formProfileSubmit(evt) {
    evt.preventDefault();
    
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    formProfileElement.reset();

    closePopup(editProfilePopup);
}

// Внесение данных в попап с картинкой
function imageClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.imgAlt;
    popupCaption.textContent = cardData.name;
    // Еще я думал поставить в popupCaption не имя, а альт
    //popupCaption.textContent = cardData.imgAlt;

    openPopup(imageTypePopup);
}

// --СЛУШАТЕЛИ СОБЫТИЙ--

// Кнопка открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    
    openPopup(editProfilePopup);
});

// Кнопка открытия попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
    openPopup(newCardPopup);
});

// Кнопка принятия формы изменения профиля
formProfileElement.addEventListener('submit', formProfileSubmit);

// Кнопка принятия формы добавления карточки
formCardElement.addEventListener('submit', formCardSubmit);

// Закрытие попапа по крестику и клику вне его области
allPopups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
});

// --ИНИЦИАЛЗАЦИЯ СТРАНИЦЫ

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard, likeCard, imageClick);
    cardList.append(card);
})

