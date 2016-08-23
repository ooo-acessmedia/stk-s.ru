(function ($) {
    'use strict';

    var cl = function (msg) {
        console.log(msg);
    };

    // Fancybox

    $('.fancybox').fancybox();
    

    // Переменные для формы

    var $activateButtonMap = $('.address-search .map'),
        $formPopupMap = $('.map-popup'),
        $formFadeMap = $('.map-fade'),

        $activateButtonQuestion = $('.question-callout .question'),
        $formPopupQuestion = $('.question-popup'),
        $formFadeQuestion = $('.question-fade'),

        $activateButtonCallout = $('.question-callout .callout'),
        $formFadeCallout = $('.callout-fade'),
        $formPopupCallout = $('.callout-popup'),

        $formPopup = $('.form-popup'),
        $formFade = $('.form-fade'),
        $formClose = $('.form-popup-close'),
        thisPlaceholder;

    var activatePopupForm = function (activateButton, formPopup, formFade) {
        activateButton.on('click', function () {
            formPopup.add(formFade).addClass('is-visible fade-in');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('fade-in');
            }, 300);
        });

        formFade.add($formClose).on('click', function () {
            formPopup.add(formFade).addClass('fade-out');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('is-visible fade-out');
            }, 300);
        });
    };

    activatePopupForm($activateButtonMap, $formPopupMap, $formFadeMap);
    activatePopupForm($activateButtonQuestion, $formPopupQuestion, $formFadeQuestion);
    activatePopupForm($activateButtonCallout, $formPopupCallout, $formFadeCallout);

    // Сменяющиеся плейсхолдеры для форм

    $formPopup.find('input').add($formPopup.add('textarea'))
        .focus(function () {
            thisPlaceholder = $(this).attr('placeholder');
            $(this).data('placeholder', thisPlaceholder);
            $(this).attr('placeholder', '');
        })
        .blur(function () {
            thisPlaceholder = $(this).data('placeholder');
            $(this).attr('placeholder', thisPlaceholder);
        });

    // Центрирование формы

    var formCentered = function () {

        var winWidth = $(window).width(),
            formWidth = $formPopup.width();

        $formPopup.css({
            left: winWidth / 2 - formWidth / 2
        });
    };

    formCentered();

    $(window).resize(function () {
        formCentered();
    });

    // Всплывающее меню каталога

    var $catalogLink = $('.main-menu-list').find('li').eq(0).find('>a');

    $catalogLink.on('click', function (event) {
        event.preventDefault();

        if ($(this).hasClass('touched')) {
            $('.menu-catalog-list').removeClass('is-flex');
            $(this).removeClass('touched');
        } else {
            $(this).addClass('touched');
            $('.menu-catalog-list').addClass('is-flex');
        }
    });

    // Изменение количества товара на старнице товара

    var $inputCount = $('.buy .numbers-change');

    $inputCount.spinner({
        min: 1,
        change: function () {
            $(this).parents('.buy').find('form > input[name=count]').val($(this).val());
        }
    });


    // Убираем крошки если один элемент

    var $breadcrumbs = $('.breadcrumb');

    if ($breadcrumbs.find('li').size() <= 1) {
        $breadcrumbs.addClass('is-hidden');
    }

    // Всплывающее окно при клике в корзину

    var $popupShopActiveButton = $('.buy form button, .table-block button');

    $popupShopActiveButton.on('click', function () {
        $('.shop-page-popup, .shop-page-fade').addClass('is-visible');
    });

    $('.shop-page-popup-buttons div:nth-child(1), .shop-page-fade').on('click', function () {
        $('.shop-page-popup, .shop-page-fade').removeClass('is-visible');
    });

    // Автодополнение

    $.ajax({
        type: 'GET',
        url: 'avtodopolnenie.json',
        success: function (response) {
            $('#search').autocomplete({source: response, appendTo: '.search-autocomplit', minLength: 3});
        }
    });


    // --------Двухуровневое меню-------- //

    // Делаем ajax запрос на страницу с пыстым шаблоном (ajax-service) - там вызывается ajax сниппет

    var $towLevelMenu = $('.category-menu-list'),
        $twoLevelMenuItem = $('.category-menu-list > li'),
        $resultConteiner = $('.category-menu-sub'),
        ajaxPageUrl = 'sevices-pages/ajax-service';

    // Если меню есть на странице то ок

    if (!!$towLevelMenu.length) {

        // По умолчанию делаем первый пункт меню активным, и подгружаем подкатерии первого пункта

        $twoLevelMenuItem.eq(0).addClass('active');

        var startCategory = $twoLevelMenuItem.eq(0).data().menuindex,
            startSelectedCategory = $twoLevelMenuItem.eq(0).data().selected;

        var callAjax = function (parent, selected) {


            if (selected) {
                $.ajax({
                    type: 'POST',
                    url: ajaxPageUrl,
                    data: {action: 'getSubcategories', selected: selected},
                    success: function (data) {
                        $resultConteiner.empty();
                        $resultConteiner.append(data);
                    },
                    error: function () {
                        $resultConteiner.append('Произошла ошибка ajax соединения');
                    }
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: ajaxPageUrl,
                    data: {action: 'getSubcategories', parent: parent},
                    success: function (data) {
                        $resultConteiner.empty();
                        $resultConteiner.append(data);
                    },
                    error: function () {
                        $resultConteiner.append('Произошла ошибка ajax соединения');
                    }
                });
            }

        };

        callAjax(startCategory, startSelectedCategory);

        // Обрабатываем клики на меню

        $twoLevelMenuItem.on('click', function () {
            var currentParent = $(this).data().menuindex,
                currentSelectedCategory = $(this).data().selected;

            $twoLevelMenuItem.removeClass('active');
            $(this).addClass('active');

            callAjax(currentParent, currentSelectedCategory);
        });
    }

    // Передаем количество тонн в форму ms2

    $('.table-product-count').on('input', function () {
        var currentVal = $(this).val();
        $(this).parents('.product-table-item').find('.table-product-count-hidden').val(currentVal);
    });


    // Setup - add a text input to each footer cell

    $('#prodtable thead th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });

    // DataTable
    var table = $('#prodtable').DataTable({
        paging: false,
        "columnDefs": [
            {"orderable": false, "targets": 0},
            {"orderable": false, "targets": 1},
            {"orderable": false, "targets": 2},
            {"orderable": false, "targets": 3},
            {"orderable": false, "targets": 5},
            {"orderable": false, "targets": 6},

        ],
        "order": [[1, "asc"]]
    });

    // Apply the search
    table.columns().every(function () {
        var that = this;

        $('input', this.header()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    // Скрываем картинку категории если она пустая

    var $productCategoryImg = $('.product-category-img');

    if ($productCategoryImg.find('img').attr('src') === '') {
        $productCategoryImg.addClass('is-hidden');
    }

    // Скрываем заголовок таблицы если нет ни одного товова

    var $tableBlock = $('.table-block'),
        $warningMessage = $('<div></div>').attr('class', 'is-warning')
            .text('Приносим свои извинения! В настоящий момент раздел наполняется.');

    if ($tableBlock.find('table tbody *').size() === 0) {
        $tableBlock.empty().append($warningMessage);
    }

})(jQuery);