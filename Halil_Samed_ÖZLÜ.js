var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.head.appendChild(script);

script.onload = function () {
    $(document).ready(function () {
        (function () {
            let currentScrollPosition = 0;

            const initialize = () => {
                loadProducts();
                setupEventHandlers();
                injectStyles(); // Stil injection fonksiyonu ekledik
            };

            const injectStyles = () => {
                // Google Fonts'u dinamik olarak ekle
                const fontLink = document.createElement("link");
                fontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap";
                fontLink.rel = "stylesheet";
                document.head.appendChild(fontLink);
            
                // CSS kodları
                const styles = `
                    * {
                        font-family: 'Montserrat', sans-serif;
                    }
            
                    @media (max-width: 768px) {
                        .carousel-track {
                            flex-wrap: nowrap;
                            flex-direction: row;
                        }
                        .carousel-item {
                            flex: 0 0 auto;
                            margin: 0 10px;
                        }
                        .carousel-prev, .carousel-next {
                            font-size: 1.5rem;
                            width: 50px;
                            height: 50px;
                        }
                    }
            
                    .carousel-prev:hover,
                    .carousel-next:hover {
                        opacity: 1;
                        background-color: #2980b9;
                    }
            
                    .favorite-btn:hover {
                        transform: scale(1.3);
                    }
            
                    .carousel-container {
                        position: relative;
                        top: 100px;
                        width: 90vw;
                        height: 100vh;
                        background: linear-gradient(to bottom right, #f7f9fc, #e3ecf3);
                        border-radius: 20px;
                        padding: 40px 30px;
                        margin: 20px auto;
                        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        z-index:1;
                    }
            
                    .carousel-container h2 {
                        font-size: 3rem;
                        font-weight: 700;
                        color: #2c3e50;
                        margin-bottom: 30px;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                        animation: fadeInUp 1s ease-in-out;
                    }
            
                    @keyframes fadeInUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
            
                    .carousel-item {
                        flex: 0 0 22%;
                        margin: 0 15px;
                        border: 2px solid #ecf0f1;
                        border-radius: 15px;
                        overflow: hidden;
                        background-color: #ffffff;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        transition: transform 0.4s ease, box-shadow 0.4s ease;
                    }
            
                    .carousel-item:hover {
                        transform: scale(1.07);
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
                    }
            
                    .carousel-item h3 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin: 10px 0;
                        color: #2c3e50;
                    }
            
                    .carousel-item p {
                        margin: 5px 0;
                        color: #7f8c8d;
                    }
            
                    .carousel-item .price {
                        color: #27ae60;
                        font-weight: bold;
                        font-size: 1.3rem;
                    }
            
                    .carousel-prev,
                    .carousel-next {
                        font-size: 2rem;
                        width: 60px;
                        height: 60px;
                        background-color: #34495e;
                        color: #ffffff;
                        border: none;
                        border-radius: 50%;
                        cursor: pointer;
                        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
                        opacity: 0.7;
                        transition: opacity 0.3s, background-color 0.3s;
                    }
                `;
                const styleSheet = document.createElement("style");
                styleSheet.type = "text/css";
                styleSheet.innerText = styles;
                document.head.appendChild(styleSheet);
            };
            
            
            
            const loadProducts = () => {
                let productList = JSON.parse(localStorage.getItem('products')) || [];
                if (productList.length === 0) {
                    $.getJSON(
                        'https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json',
                        function (data) {
                            productList = data;
                            localStorage.setItem('products', JSON.stringify(productList));
                            createCarousel(productList);
                        }
                    );
                } else {
                    createCarousel(productList);
                }
            };

            const createCarousel = (products) => {
                let carouselHtml = `
                    <div class="carousel-container" style="position: relative; top: 100px; width: 90vw; height: 100vh; background-color: #f3f4f6; border-radius: 20px; padding: 40px 30px; margin: 20px auto; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15); overflow: hidden; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <h2 style="font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: bold; color: #2c3e50; margin-bottom: 25px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);">You Might Also Like</h2>
                        <div class="carousel" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
                            <button class="carousel-prev" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); z-index: 1000; background-color:rgb(87, 88, 88); opacity:0.3;color: white; border: none; border-radius: 50%; font-size: 2rem; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); transition: opacity 0.3s;">
                                &lt;
                            </button>
                            <div class="carousel-track" style="display: flex; transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); height: auto; align-items: center;">
                                ${products
                                    .slice(0, 10)
                                    .map(
                                        (product) => `  
                                            <div class="carousel-item" style="flex: 0 0 22%; margin: 0 15px; border: 1px solid #e1e4e8; border-radius: 15px; overflow: hidden; background-color: white; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; justify-content: space-between; align-items: center; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                                                <a href="${product.url}" target="_blank" style="text-decoration: none; width: 100%; height: 70%; display: flex; justify-content: center; align-items: center;">
                                                    <img src="${product.img}" alt="${product.name}" style="width: 100%; height: auto; max-height: 100%; display: block; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                                                </a>
                                                <div class="product-info" style="padding: 15px; text-align: center; font-family: 'Roboto', sans-serif;">
                                                    <h3 style="font-size: 1.4rem; font-weight: 600; margin: 10px 0; color: #34495e;">${product.name}</h3>
                                                    <p style="margin: 5px 0; color: #7f8c8d;">ID: ${product.id}</p>
                                                    <p style="color: #27ae60; font-weight: bold; font-size: 1.2rem;">Price: ${product.price}</p>
                                                </div>
                                                <button class="favorite-btn" data-id="${product.id}" style="border: none; background: none; font-size: 1.8rem; cursor: pointer; color: #e74c3c; transition: transform 0.2s;">
                                                    ${isProductFavorited(product.id) ? '💙' : '♡'}
                                                </button>
                                            </div>
                                        `
                                    )
                                    .join('')}
                            </div>
                            <button class="carousel-next" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); z-index: 1000; background-color: rgb(87, 88, 88); opacity: 0.3; color: white; border: none; border-radius: 50%; font-size: 2rem; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); transition: opacity 0.3s;">
                                &gt;
                            </button>
                        </div>
                    </div>
                `;
                $('body').prepend(carouselHtml);
                updateNavigationButtons();
            };

            const setupEventHandlers = () => {
                $(document).on('click', '.favorite-btn', function () {
                    const productId = $(this).data('id');
                    toggleProductFavoriteStatus(productId);
                    $(this).html(isProductFavorited(productId) ? '💙' : '♡');
                });

                $(document).on('click', '.carousel-next', function () {
                    const trackElement = $('.carousel-track');
                    const maxScrollPosition =
                        trackElement[0].scrollWidth - trackElement.width();
                    currentScrollPosition = Math.min(
                        currentScrollPosition +
                            trackElement.find('.carousel-item').outerWidth(true),
                        maxScrollPosition
                    );
                    trackElement.css('transform', `translateX(-${currentScrollPosition}px)`);
                    updateNavigationButtons();
                });

                $(document).on('click', '.carousel-prev', function () {
                    const trackElement = $('.carousel-track');
                    currentScrollPosition = Math.max(
                        currentScrollPosition - 
                            trackElement.find('.carousel-item').outerWidth(true),
                        0
                    );
                    trackElement.css('transform', `translateX(-${currentScrollPosition}px)`);
                    updateNavigationButtons();
                });

                $(document).on('mouseenter', '.carousel-item', function () {
                    $(this).css({
                        transform: 'scale(1.05)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    });
                });

                $(document).on('mouseleave', '.carousel-item', function () {
                    $(this).css({
                        transform: 'scale(1)',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                    });
                });
            };

            const updateNavigationButtons = () => {
                const trackElement = $('.carousel-track');
                const maxScrollPosition =
                    trackElement[0].scrollWidth - trackElement.width();

                $('.carousel-prev').prop('disabled', currentScrollPosition <= 0);
                $('.carousel-next').prop('disabled', currentScrollPosition >= maxScrollPosition);
            };

            const isProductFavorited = (productId) => {
                const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
                return favoritesList.includes(productId);
            };

            const toggleProductFavoriteStatus = (productId) => {
                let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
                if (favoritesList.includes(productId)) {
                    favoritesList = favoritesList.filter((id) => id !== productId);
                } else {
                    favoritesList.push(productId);
                }
                localStorage.setItem('favorites', JSON.stringify(favoritesList));
            };

            

            initialize();
        })();
    });
};
