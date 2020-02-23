$(document).ready(function () {
    // Countdown
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let countDown = new Date('Feb 29, 2020 00:00:00').getTime(),
        x = setInterval(function() {

            let now = new Date().getTime(),
                distance = countDown - now;

                document.getElementById('days').innerText = Math.floor(distance / (day)),
                document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

        }, second);

    // Display products
    var products = [];

    $.getJSON("./example.json", function(json) {
        products = json.list;
        generateProduct(products, 4);
    });

    function generateProduct(products, value) {
        var html = '';
        if(value > products.length) {
            value = products.length;
        }
        for (var i = 0; i < value; i++) {
            html += `
            <div class="products__item">
                    <div class="products__item__header">
                        <p>
                            <img src="./src/images/icons/bin.png">
                            sztuk:
                            <span class="pieces">1</span>
                        </p>
                        <span class="save">oszczędzasz:
                            <strong>${products[i].price.gross.base_float - products[i].price.gross.promo_float} zł</strong>
                        </span>
                    </div>
                    <div class="products__item__image">
                        <img src="https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_${products[i].main_image}.jpg" alt="">
                    </div>
                    <div class="products__item__footer">
                        <div class="products__price">
                            <span class="price">${products[i].price.gross.promo_float} zł</span>
                            <span class="price-old">${products[i].price.gross.base_float} zł</span>
                        </div>
                        <h3>${products[i].name}</h3>
                        <p>
                            <small>Grupa Kler</small>
                        </p>
                    </div>
                </div>
            `
        }
        $('.products__items').html(html);
    }

    // Selection of the number of products on the page
    $('#display-products').change(function () {
        generateProduct(products, $(this).val());
    });
});

