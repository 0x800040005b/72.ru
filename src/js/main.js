document.addEventListener("DOMContentLoaded", function() {
    var body = document.body;
    var popup = document.querySelector('#popup');
    var popupModal = document.querySelector('#popup-modal');
    var isScroll = false;

    var orderConsultation = document.querySelector('#order_consultation');

    var burger = document.querySelector('#burger');
    var menu = document.querySelector('#menu');
    var menuListLinks = document.querySelectorAll(".menu-list__link");
    var menuClose = document.querySelector('#menu-close');
    var popupClose = document.querySelector('#popup-close');
    var bulletContainer = document.querySelectorAll('.bullets');
    var sections = document.querySelectorAll('section');
    var buttonBack = document.querySelector('.callback-block__link');

    renderBullet();




    /* Events */

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
            popupModal.classList.remove('active');
            body.classList.remove('lock');


        });
    }
    if (orderConsultation != null) {
        orderConsultation.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            popupModal.classList.add('active');
            popup.classList.add('active');
            body.classList.add('lock');

        });
    }
    if (bulletContainer != null) {
        bulletContainer.forEach(function(currentContainer, indexContainer, bulletContainer) {
            currentContainer.addEventListener('click', function(event) {
                event.stopImmediatePropagation();
                event.preventDefault();
                let target = event.target;
                sections.forEach(function(currentSection, sectionIndex, sections) {
                    if ("#" + currentSection.id == target.getAttribute('href')) {
                        currentSection.scrollIntoView({ behavior: "smooth" });
                        let bullets = currentSection.querySelectorAll('.bullets .bullet__link');
                        bullets.forEach(function(currentBullet, bulletIndex, bullets) {
                            if (currentBullet.getAttribute('href') == "#" + currentSection.id) {
                                currentBullet.classList.add('active');
                            }
                        });
                    }
                });
            });
        });

    }
    if (menuListLinks != null) {
        menuListLinks.forEach(function(currentItemMenu, indexCurrentItemMenu, menuListLinks) {
            currentItemMenu.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                sections.forEach(function(currentSection, indexCurrent, sections) {
                    if (currentItemMenu.getAttribute('href') == "#" + currentSection.id) {
                        console.log(currentSection.id + ' = ' + currentItemMenu.getAttribute('href'));
                        currentSection.scrollIntoView({ behavior: "smooth" });
                        menu.classList.remove('active');
                        body.classList.remove('lock');
                        burger.classList.remove('active');

                    }
                });

            });
        });
    }
    if (buttonBack != null) {
        buttonBack.addEventListener('click', function(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
            scrollTo({
                top: 0,
                behavior: 'smooth',
            });

        });
    }

    window.addEventListener('scroll', function(event) {
        sections.forEach(function(currentSection, indexSection, sections) {
            if (getCoord(currentSection).top <= 200 && getCoord(currentSection).bottom >= 0 || window.pageYOffset == 0) {
                isScroll = true;
                scrollBySection(currentSection, isScroll);
            } else {
                isScroll = false;
                scrollBySection(currentSection, isScroll);

            }

        });
    });

    console.log('DOMContentLoaded');

    function createBullet(id) {
        return `<a href="#${id}" class="bullet__link"></a>`
    }

    function renderBullet() {
        if (bulletContainer != null && bulletContainer.length > 0) {
            for (var i = 0; i < bulletContainer.length; i++) {
                for (var j = 0; j < sections.length; j++) {
                    let id = sections.item(j).getAttribute('id');
                    bulletContainer[i].insertAdjacentHTML('beforeend', createBullet(id));
                }
            }
        }
    }

    function getCoord(element) {
        if (element != null && typeof element.getBoundingClientRect().top != 'undefined' && typeof element.getBoundingClientRect().bottom != 'undefined')
            return element.getBoundingClientRect();
    }

    function scrollBySection(section, isScroll) {
        let bullets = null
        if (isScroll == true) {
            bullets = section.querySelectorAll('.bullet__link');
            bullets.forEach(function(currentBullet, indexBullet, bullets) {
                currentBullet.classList.remove('active');
                if (currentBullet.getAttribute('href') == "#" + section.id) {
                    currentBullet.classList.add('active');
                }
            });
        } else {
            bullets = section.querySelectorAll('.bullet__link');
            bullets.forEach(function(currentBullet, currentIndex, bullets) {
                if (currentBullet.classList.contains('active')) {
                    currentBullet.classList.remove('active');
                }
            });
            return;
        }
    }
});