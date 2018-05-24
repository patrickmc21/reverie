$(function() {
    var img = new Image();
    var img_src = 'https://media.flaticon.com/img/popup_internet_day/fi-internet-day.png';

    // if (document.querySelector('#modal-designer-week .modal-popup__wrapper')) {
    //     img_src = document.querySelector('#modal-designer-week .modal-popup__wrapper').style.backgroundImage;
    //     img_src = img_src.replace('url("','');
    //     img_src = img_src.replace('")','');
    // } else {
    //     return false;
    // }

    img.src = img_src;

    img.onload = function() {
        try {

            var popups = Array.prototype.slice.call(document.getElementsByClassName('popups'));

            popups.forEach(function(popup) {
                var popupModalClose = popup.querySelector('.modal-popup__close');
                var popupModalInterval;
                var currentDate = new Date();
                var startDate = new Date(popup.getAttribute('data-start'));
                var endDate = new Date(popup.getAttribute('data-end'));

                setTimeout(function() {
                    if (!Cookie.get(popup.id) && popup && popupModalClose && (currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()) && ('undefined' !== typeof gr && !gr.auth.me.premium) && window.innerWidth >= 768) {
                        $(popup).addClass('show');
                    
                        setCountdown(popup, popupModalClose, popupModalInterval, startDate, endDate);

                        popupModalInterval = setInterval(function() {
                            setCountdown(popup, popupModalClose, popupModalInterval, startDate, endDate);
                        }, 1000);
                    
                        popupModalClose.addEventListener('click', function () {
                            var cookieTime = new Date();
                    
                            cookieTime.setHours(cookieTime.getHours() + 2);
                    
                            $(popup).removeClass('show');
                    
                            Cookie.setH(popup.id, '1', cookieTime);
                    
                            clearInterval(popupModalInterval);
                        });
                    }
                }, 1500);



            });

        } catch(err) {
            console.error('There has been an error showing current popups: ', err);
        }
    };
});



/**
 * Popup
 */


function formatTimer(distance) {
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    var dateString = normalizeTimer(minutes) + ':' + normalizeTimer(seconds);

    if (days > 0) {
        hours = hours + (days * 24);
    }

    if (hours > 0) {
        dateString = normalizeTimer(hours) + ':' + dateString;
    }

    return dateString;
}

function normalizeTimer(number) {
    if (number < 10) {
        return '0' + number;
    }

    return number;
}

function setCountdown(popup, popupModalClose, popupModalInterval, startDate, endDate) {
    var currentDate = new Date();

    if (currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()) {
        var popupModalContdown = popup.querySelector('.modal-popup-countdown');

        if (popupModalContdown) {
            var timeleft = endDate - currentDate;

            popupModalContdown.innerText = formatTimer(timeleft);
        }
    } else {
        $(popup).removeClass('show');

        clearInterval(popupModalClose);
    }
}
