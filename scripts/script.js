'use strict'

$(document).ready(function () {

    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        responsive: [
            {
                breakpoint: 930,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    });

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    let burger_menu = $('#burger-menu');

    $('#show-menu').click(function () {
        $('.main__menu')[0].scrollIntoView({behavior: "smooth"});
    });

    $('#book-table').click(function () {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    });

    $('#menu-footer').click(function () {
        $('.main__menu')[0].scrollIntoView({behavior: "smooth"});
    });

    $('#order-footer').click(function () {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    });

    $('#book-burger').click(function () {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
        burger_menu.removeClass('open-burger');
    });

    $('#menu-burger-item').click(function () {
        $('.main__menu')[0].scrollIntoView({behavior: "smooth"});
        burger_menu.removeClass('open-burger');
    });

    $('#menu-contacts').click(function () {
        $('.footer')[0].scrollIntoView({behavior: "smooth"});
        burger_menu.removeClass('open-burger');
    });

    $('#menu-feedback').click(function () {
        $('.feedback')[0].scrollIntoView({behavior: "smooth"});
        burger_menu.removeClass('open-burger');
    });

    $('#header-burger').on('click', function () {
        burger_menu.addClass('open-burger');
    });

    $('#burger-cancel').click(() => {
        burger_menu.removeClass('open-burger');
    });

    let inputName = $('#input-name');
    let inputPhone = $('#input-phone');
    let inputTime = $('#input-time');

    let inviteMessage = $('.invite-message');

    $('#invite-message-cancel').click(function () {
        inviteMessage.css('display', 'none');
        inputName.val(null);
        inputPhone.val(null);
        inputTime.val(null);
    });

    let chooseList = $('.order__form-choose-list');
    let chooseArrow = $('.order__form-choose-arrow');
    let orderWrapper = $('.order-wrapper');

    const showOrHideScheduleBlock = () => {
        chooseList.toggleClass('open');
        chooseArrow.toggleClass('open-arrow');
    }

    document.addEventListener('click', () => {
        chooseList.removeClass('open');
        chooseArrow.removeClass('open-arrow');
    });

    orderWrapper.click((event) => {
        event.stopPropagation();
        showOrHideScheduleBlock();
    });

    chooseList.click((event) => {

        if (event.target.classList.contains("list-disable")) {
            return false;
        }

        inputTime.val(event.target.innerText);
        chooseList.css('display', 'none');
    });

    inputName.on('keydown', (event) => {
        let word = parseInt(event.key);
        if(!isNaN(word)) {
            return false;
        }
    });

    inputPhone.attr('maxLength', '18');
    inputPhone.on('keyup', function(event) {

        if (event.target.value.length === 2) {
            $(event.target).val(event.target.value + ' (');
        }

        if (event.target.value.length === 7) {
            $(event.target).val(event.target.value + ') ');
        }

        if (event.target.value.length === 12) {
            $(event.target).val(event.target.value + '-');
        }

        if (event.target.value.length === 15) {
            $(event.target).val(event.target.value + '-');
        }

    });

    $('#main-book-btn').on('click', () => {
        let formInvalid = $('.form__invalid');
        let hasError = false;

        formInvalid.css('display', 'none');

        if (!inputName.val()) {
            formInvalid.eq(0).css('display', 'block');
            hasError = true;
        }

        if (!inputPhone.val()) {
            formInvalid.eq(1).css('display', 'block');
            hasError = true;
        }

        if (!inputTime.val()) {
            formInvalid.eq(2).css('display', 'block');
            hasError = true;
        }

        if (!hasError) {
            let loader = $('.loader');
            loader.css('display', 'flex');

            $.ajax({
                url: "https://testologia.site/checkout",
                method: "POST",
                data: {
                    name: inputName.val(), phone: inputPhone.val(), time: inputTime.val()
                }
            })

                .done(function (message) {
                    loader.css('display', 'none');
                    if (message.success) {
                        inviteMessage.css('display', 'flex');
                        let dateNow = new Date();
                        let dateNew = dateNow.toLocaleString('ru-RU', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric'
                        });
                        $('.invite-message-books-dates-new').text(dateNew);
                        $('.invite-message-books-times-new').text(inputTime.val());
                    } else {
                        alert('Произошла ошибка. Позвоните по номеру для брони.');
                    }

                });


        }


    });


});