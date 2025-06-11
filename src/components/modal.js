const allPopups = document.querySelectorAll('.popup');

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.body.classList.add('page_scroll-lock');
    document.addEventListener('keydown', escapeClosePopup);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.body.classList.remove('page_scroll-lock');
    document.removeEventListener('keydown', escapeClosePopup);
}

function escapeClosePopup(evt) {
    if (evt.key == 'Escape') {
        const openedPopup = document.querySelector('.popup.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

allPopups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
});