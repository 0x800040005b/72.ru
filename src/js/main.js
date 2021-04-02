document.addEventListener("DOMContentLoaded", function() {
    var body = document.body;
    var sectionCount = document.getElementsByTagName('section').length;

    var popup = document.getElementById('popup');
    var popupModal = document.getElementById('popup-modal');


    var orderConsultation = document.getElementById('order_consultation');
    var callbackFormButton = document.getElementById('callback-form__button');

    var burger = document.getElementById('burger');
    var menu = document.getElementById('menu');
    var menuClose = document.getElementById('menu-close');
    var popupClose = document.getElementById('popup-close');
    var bulletContainer = document.getElementsByClassName('bullets');
    var sections = document.getElementsByTagName('section');


    if (menuClose != null) {
        menuClose.addEventListener('click', function(event) {
            menu.classList.remove('active')
            burger.classList.remove('active');
            body.classList.remove('lock');
        });
    }
    if (burger != null) {
        burger.addEventListener('click', function() {
            burger.classList.add('active');
            menu.classList.add('active');
            body.classList.add('lock');

        });
    }
    if (popupClose != null) {
        popupClose.addEventListener('click', function() {
            popup.classList.remove('active')
            body.classList.remove('lock');
            resetCoord(popupModal);



        });
    }

    if (orderConsultation != null) {
        orderConsultation.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            popup.classList.add('active');
            setCoord(popupModal, window.event.clientX, window.event.clientY);
            body.classList.add('lock');

        });
    }
    console.log('DOMContentLoaded');
});

function resetCoord(item) {
    item.style.top = '0'
    item.style.left = '0'
}

function getCoord(item) {
    return {
        x: item.getBoundingClientRect().left,
        y: item.getBoundingClientRect().top
    }
}

function setCoord(item, x, y) {
    item.style.top = x + 'px';
    item.style.left = y + 'px';
}

function createBullet(id) {
    return `<a href="${id}" class="bullet__link"><span class="bullet"></span></a>`
}

function renderBullet() {
    if (bulletContainer != null && bulletContainer > 0) {
        for (var i = 0; i < sectionCount; i++) {
            bulletContainer[i].innerHTML = createBullet();
        }
    }
}