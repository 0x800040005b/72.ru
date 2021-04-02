document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var sectionCount = document.querySelectorAll('section').length;

    var popup = document.querySelector('#popup');
    var popupModal = document.querySelector('#popup-modal');

    var orderConsultation = document.querySelector('#order_consultation');

    var burger = document.querySelector('#burger');
    var menu = document.querySelector('#menu');
    var menuClose = document.querySelector('#menu-close');
    var popupClose = document.querySelector('#popup-close');
    var bulletContainer = document.querySelectorAll('.bullets');
    var sections = document.querySelectorAll('section');


    renderBullet();

    /* Events */

    if (menuClose != null) {
        menuClose.addEventListener('click', function (event) {
            menu.classList.remove('active')
            burger.classList.remove('active');
            body.classList.remove('lock');
        });
    }
    if (burger != null) {
        burger.addEventListener('click', function () {
            burger.classList.add('active');
            menu.classList.add('active');
            body.classList.add('lock');

        });
    }
    if (popupClose != null) {
        popupClose.addEventListener('click', function () {
            popup.classList.remove('active')
            popupModal.classList.remove('active');
            body.classList.remove('lock');


        });
    }
    if (orderConsultation != null) {
        orderConsultation.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            popupModal.classList.add('active');
            popup.classList.add('active');
            body.classList.add('lock');

        });
    }
    if (bulletContainer != null) {
        for (var i = 0; i < bulletContainer.length; i++) {
            bulletContainer.item(i).addEventListener('click', function (event) {
                event.stopImmediatePropagation();
                let target = event.target;
                let href = target.parentNode.getAttribute('href');
                let links = document.querySelectorAll(`a.bullet__link[href="${href}"]`);
                let bulletActive = document.querySelectorAll('span.bullet.active')
                bulletActive.forEach(function (item,i, bulletActive) {
                    item.classList.remove('active');
                });
                links.forEach(function (item, i, links) {
                    item.querySelector('span.bullet').classList.add('active');

                });
            });
        }
    }
    document.addEventListener("scroll", function (event) {
        console.log(window.scrollY);
    });

    console.log('DOMContentLoaded');

    function createBullet(id) {
        return `<a href="#${id}" class="bullet__link"><span class="bullet"></span></a>`
    }

    function renderBullet() {
        if (bulletContainer != null && bulletContainer.length > 0) {
            for (var i = 0; i < bulletContainer.length; i++) {
                for (var j = 0; j < sectionCount; j++) {
                    let id = sections.item(j).getAttribute('id');
                    bulletContainer[i].insertAdjacentHTML('beforeend', createBullet(id));
                }
                let bullets = bulletContainer[i].querySelectorAll('.bullet');
                bullets[0].classList.add('active');
            }
        }
    }

});

