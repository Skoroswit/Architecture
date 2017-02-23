/* COUNTERS
 * Funkcja licznika do dodawania wartości +1, 
 * do każdego elemenu, który ma clasę .count
 */
function counter() {
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 6000, // czas wykonania liczenia
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

var blockScrollActive = false;
function activeElementMenu() {
    /* SKRYPT ŚLEDZĄCY SCROLL
     * JEŚLI MINIEMY JAKĄŚ SEKCJĘ
     * DO ODPOWIEDNIEGO ELEMENTU W MENU
     * ZOSTANIE DOPISANA KLASA "active"
     *   */

    // zmienne pomocnicze
    // do zapamiętania położenia (od góry)
    // każdej sekcji
    var positionsElementsHeight = [];
    var positionsElementsId = [];
    //offset od góry
    var offsetHeight = $(window).height() - 180;

    // przeglądnie każdej sekcji
    // (diva który ma klasę .section)
    // i zapisywanie ich wysokości (od góry)
    // do zmiennej pomocniczej
    $(".section").each(function () {
        // pobranie położenia danego elemenu
        var positionsElement = $(this).position();

        // zapisanie do tablicy pomocniczej positionsElementsHeight położenia
        // tej sekcji od góry
        positionsElementsHeight.push(parseInt(positionsElement.top));
        // zapisanie do tablicy pomocniczej positionsElementsId
        // ID sekcji
        positionsElementsId.push($(this).attr('id'));
    });

    // zmienna pomocnicza to przechowywania
    // id aktualnie aktywnej sekcji
    var activeElementMenu = null;

    // przeglądanie każdego elementu z tablicy
    // która przechowyje wysokości każdej sekcji
    // (0, 900, 1800 ...)
    for (var i in positionsElementsHeight) {
        var scrollTop = $(window).scrollTop();
        // jeśli pozycja scrolla jest większa od pozycji którejś sekcji
        // I
        // aktualnie aktywny element, to nie jest ten element sekcji
        if (activeElementMenu != positionsElementsId[i]) {
            if (scrollTop >= (positionsElementsHeight[i] - offsetHeight)) {
                // jeśli nie istnieje przy tej sekcji klasa "start-effects"
                if (!$("#" + positionsElementsId[i]).hasClass('start-effects')) {
                    // to dopisz do tej sekcji klasę "start-effects"
                    $("#" + positionsElementsId[i]).addClass('start-effects');
                }
            }

            if (scrollTop >= (positionsElementsHeight[i] - 180)) {
                // usuń z menu zaznaczony na .active link
                $(".navbar .nav a.active").removeClass('active');
                // dodaj klasę ".active" do sekcji,
                //na wysokości której aktualnie się znajdujemy         
                $(".navbar .nav a[href='#" + positionsElementsId[i] + "']").addClass('active');

                // zapisz do zmiennej pomocniczej ID sekcji
                // żebyśmy wiedzieli, na wysokości której
                // aktualnie sekcji jesteśmy
                activeElementMenu = positionsElementsId[i];
            }
        }
    }
}




    // COUNTERS (pobranie wysokości elementów)
    //var positionsCounters = $("#counters").position();
    //var positionsCountersTop = 10 + parseInt(positionsCounters.top) - parseInt($(window).height());
    var cc = $("#counters").offset();
    //console.log(cc.top);



    // wysokość intro - wysokość menu
    var heightMenu = parseInt($("#intro").outerHeight()) - parseInt($(".navbar").outerHeight());

    $(window).scroll(function () {
        var scrollTop = parseInt($(window).scrollTop());
      //  console.log(scrollTop);
        if (scrollTop >= heightMenu) {
            if (!$(".navbar").hasClass('navbar-black')) {
                $(".navbar").addClass('navbar-black');
            }
        } else if ($(".navbar").hasClass('navbar-black')) {
            $(".navbar").removeClass('navbar-black');
        }

        // COUNTERS (uruchomienie)
        if (!$("#counters").hasClass('animated')) {
            if (scrollTop >= cc.top+200) {
                $("#counters").addClass('animated');
                counter();
            }
        }
        // ---------------------------------------------------------
        /* SKRYPT DODAJĄC KLASĘ ANIMUJĄCĄ */
        if (!blockScrollActive) {
            activeElementMenu();
        }
        /* KONIEC --- SKRYPT DODAJĄC KLASĘ ANIMUJĄCĄ */
    });


    // OBSŁUGA SCROLOWANIA DO SEKCJI PO KLIKNIĘCIU
    // W LINK W MENU
    $(".navbar .nav a").click(function () {
        var selector = $(this).attr('href');

        if ($(selector).length > 0) {
            blockScrollActive = true;
            $(".navbar .nav a.active").removeClass('active');
            $(this).addClass('active');

            var positions = $(selector).position();

            $("html, body").stop().animate({scrollTop: positions.top}, '500', 'swing', function () {
                // tutaj część po dojechaniu do tego elementu
                activeElementMenu();
                blockScrollActive = false;
            });
        }
        return false;
    });
    
