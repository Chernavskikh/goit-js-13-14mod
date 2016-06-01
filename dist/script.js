'use strict';
//объявляем массив объектов с вопросами и ответами

var testData = [{
    question: '1+1=?',
    answer: ['2', '3', '4'],
    check: ['true', 'false', 'false'],
    name: 'first'
}, {
    question: '2*2=?',
    answer: ['3', '4', '5'],
    check: ['false', 'true', 'false'],
    name: 'second'
}, {
    question: '2-2=?',
    answer: ['1', '3', '0'],
    check: ['false', 'false', 'true'],
    name: 'third'
}];

//записываем массив объектов с вопросами и ответами в localStorage
localStorage.setItem('questionAnswer', JSON.stringify(testData));

$(function () {
    //формируем тест с помощью шаблонизатора
    var test = $('#test').html();
    var content = localStorage.getItem('questionAnswer');
    content = JSON.parse(content);

    var page = tmpl(test, {
        data: content
    });

    $('.btn').before(page);

    //проверяем результаты по клику на кнопку
    $('.btn').on('click', function () {
        var $result = true;
        $('.checkbox').each(function () {
            if ($(this).prop('checked') != ($(this).attr('value') == 'true')) {
                $result = false;
                return false;
            }
        });
        console.log($result);

        $('.modal_text')[0].innerHTML = $result ? 'Вы прошли тест' : 'Вы не прошли тест =( '; // записываем результат теста в модальное окно
        $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
        function () {
            // пoсле выпoлнения предъидущей aнимaции
            $('#modal_form').css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
            .animate({ opacity: 1, top: '50%' }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
        });
    });

    $('#modal_close, #overlay').on('click', function () {
        $('#modal_form').animate({ opacity: 0, top: '45%' }, 200, function () {
            $(this).css("display", "none"); //убираем модальное окно
            $('#overlay').fadeOut(400); //убираем фон
        });
        $('.checkbox').each(function () {
            //очищаем чекбоксы
            $(this).prop('checked', false);
        });
    });
});