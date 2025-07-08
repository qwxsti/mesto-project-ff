import './cards.js';
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openPopup, closePopup, closePopupByClick } from '../components/modal.js';
import { createCard, deleteCard} from '../components/card.js';
import {enableValidation, clearValidation} from './validation.js';
import { getUserInfo, getCards, setUserInfo, addCard, deleteCardOnServer, putLike, deleteLike, updateAvatar } from './api.js';

const cardList = document.querySelector('.places__list');

const avatarEditButton = document.querySelector('.profile__image-edit-button');
const avatarEditPopup = document.querySelector('.popup_type_avatar-change');
const avatarEditForm = avatarEditPopup.querySelector('.popup__form')
const avatarInput = avatarEditForm.querySelector('.popup__input');


//Попапы
const allPopups = document.querySelectorAll('.popup');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const imageTypePopup = document.querySelector('.popup_type_image');

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

const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmButton = confirmPopup.querySelector('.popup__button');
let cardToDelete = null;
//Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// --ФУНКЦИИ ОБРАБОТЧИКИ--

// Добавление карточки из формы
function formCardSubmit(evt) {
    evt.preventDefault();

    const cardSubmitButton = formCardElement.querySelector('.popup__button');
    cardSubmitButton.textContent = "Сохранение...";
    addCard(cardNameInput.value, cardLinkInput.value)
        .then((cardData) => {
            const myID = cardData.owner._id;
            const card = createCard(cardData, handleDeleteCard, handleLikeCard, imageClick, myID);

            cardList.prepend(card);

                clearValidation(formCardElement, validationConfig);
                formCardElement.reset();
                closePopup(newCardPopup);
        })
        .catch((err) => {
            console.log(`Ошибка при добавлении карточки`);
        })
        .finally(() => {
            cardSubmitButton.textContent = "Сохранить";
        })
}

// Редактирование профиля из формы
function formProfileSubmit(evt) {
    evt.preventDefault();

    const profileSubmitButton = formProfileElement.querySelector('.popup__button')
    profileSubmitButton.textContent = 'Сохранение...'

    setUserInfo(nameInput.value, jobInput.value)
        .then((userData) => {
            renderUserInfo(userData);
            closePopup(editProfilePopup)
        })
        .catch((err) => {
            console.log('Ошибка при обновлении профиля')
        })
        .finally(() => {
            profileSubmitButton.textContent = 'Сохранить'
        })
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

    clearValidation(formProfileElement, validationConfig);
    
    openPopup(editProfilePopup);
});

// Кнопка открытия попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
    clearValidation(formCardElement, validationConfig);
    formCardElement.reset();
    
    openPopup(newCardPopup);
});

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarEditPopup, validationConfig);
    avatarEditForm.reset();

    openPopup(avatarEditPopup);
})

//Закрытие попапа по крестику и клику вне его области
allPopups.forEach(popup => {
    popup.addEventListener('mousedown', closePopupByClick);
});

// Кнопка принятия формы изменения профиля
formProfileElement.addEventListener('submit', formProfileSubmit);

// Кнопка принятия формы добавления карточки
formCardElement.addEventListener('submit', formCardSubmit);

const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();

    const avatarEditSubmit = avatarEditForm.querySelector('.popup__button');

    avatarEditSubmit.textContent = "Сохранение...";
    updateAvatar(avatarInput.value)
    .then((userData) => {
        renderUserInfo(userData);
        closePopup(avatarEditPopup);
    })
    .catch((err) => {
        console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
        avatarEditSubmit.textContent = "Сохранить";
    })
}

avatarEditForm.addEventListener('submit', handleAvatarFormSubmit);

// ВАЛИДАЦИЯ ФОРМ

//конфиг для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);

//API

//Функция для отображения данных с сервера
const renderUserInfo = (userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
}

//Удаление карточки на сервере
const handleDeleteCard = (cardID, cardElement) => {
    cardToDelete = {
        id: cardID,
        element: cardElement
    }

    openPopup(confirmPopup);
}

//Клик по лайку
const handleLikeCard = (evt, cardID, isLiked) => {
    const likeDecision = isLiked ? deleteLike(cardID) : putLike(cardID);

    likeDecision.then((cardData) => {
        const likeButton = evt.target;
        const likeCounter = likeButton.closest('.card').querySelector('.card__like-counter');
        likeCounter.textContent = cardData.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
    });
}


confirmButton.addEventListener('click', () => {
    if (cardToDelete) {
        confirmButton.textContent = 'Удаление...';

        deleteCardOnServer(cardToDelete.id)
        .then(() => {
            deleteCard(cardToDelete.element);
            closePopup(confirmPopup);
            cardToDelete = null;
        })
        .catch((err) => {
            console.log(`Ошибка при удалении карточки: ${err}`);
        })
        .finally(() => {
            confirmButton.textContent = 'Да';
        })
    }
})
//Получение данных с сервера и их отображение
Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
        const myID = userData._id;

        renderUserInfo(userData);
        cardsData.forEach((cardData) => {
                const card = createCard(cardData, handleDeleteCard, handleLikeCard, imageClick, myID);
                cardList.append(card);
        });
    })
    .catch((err) => {
        console.log("Ошибка при загрузке: ", err)
    });