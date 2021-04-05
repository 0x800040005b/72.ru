document.addEventListener("DOMContentLoaded", function() {
    var body = document.body;
    var popup = document.querySelector('#popup');
    var popupModal = document.querySelector('#popup-modal');
    var isScroll = false;
    var firstSection;

    var orderConsultation = document.querySelector('#order_consultation');

    var burger = document.querySelector('#burger');
    var menu = document.querySelector('#menu');
    var menuClose = document.querySelector('#menu-close');
    var popupClose = document.querySelector('#popup-close');
    var bulletContainer = document.querySelectorAll('.bullets');
    var sections = document.querySelectorAll('section');
    firstSection = sections[0];


    renderBullet();
    let bullets = firstSection.querySelectorAll('.bullet__link')
    bullets[0].classList.add('active');




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
    window.addEventListener('scroll', function(event) {
        sections.forEach(function(currentSection, indexSection, sections) {
            if (getCoord(currentSection).top <= 0 && getCoord(currentSection).bottom >= 0) {
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
        if (isScroll == true) {
            let bullets = section.querySelectorAll('.bullet__link');
            bullets.forEach(function(currentBullet, indexBullet, bullets) {
                if (currentBullet.getAttribute('href') == "#" + section.id) {
                    currentBullet.classList.add('active');
                }
            });
        } else {
            return;
        }
    }
});