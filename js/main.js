mainProgram(articles())
function detailSizes(size, id) {
    let paragraph = document.getElementById(id)
    paragraph.classList.add("font-size", "text-start")
    let options = document.createElement("select")
    
    paragraph.innerHTML = 
    `
        Talle: 
    `
    if (size !== "único")
    {
        for(let i = 0; i <size.length; i++) {
            let op = document.createElement("option")
            op.setAttribute("value", "${size[i]}")
            op.innerHTML = 
            `
                    ${size[i]}
            `
            options.appendChild(op)
        }
        paragraph.appendChild(options)
    }
    else {
        paragraph.innerHTML = 
        `
            Talle: <span class="text--format">único</span>
        `
    }
}
function searchFunctionInside(e, array) {
    let result
    result = array.filter(producto => producto.name.toLowerCase().includes(e.toLowerCase()) || producto.category.toLowerCase().includes(e.toLowerCase()))
    showArticles(result, "sectionArticles", "modalsSection")
    return result
}
function searchFunction(e, array) {
    let result
    if (e.which === 13 || e.keyCode === 13 || e.key === "enter") {
        e.preventDefault()
        result = searchFunctionInside(e.target.value, array)
        showArticles(result, "sectionArticles", "modalsSection")
      }
      return result
}
function orderFunction(e, array) {
    let result 
    console.log(array)
    if (e.target.value === "mayor") {
        result = array.sort((a, b) => b.price - a.price)
        showArticles(result, "sectionArticles", "modalsSection")       
    }
    else if (e.target.value === "menor") {
        result = array.sort((a, b) => a.price - b.price)
        showArticles(result, "sectionArticles", "modalsSection")       
    }
    else if (e.target.value === "a-z") {
        result = array.sort(function(a, b) {
            let x = a.name.toLowerCase()
            let y = b.name.toLowerCase()
            if (x < y) { 
                return -1
            }
            else if (x > y) {
                return 1
            }
            else {
                return 0
            }
            })
            showArticles(result, "sectionArticles", "modalsSection")
    }
    else if (e.target.value === "z-a") {
        result = array.sort(function(a, b) {
            let x = a.name.toLowerCase()
            let y = b.name.toLowerCase()
            if (x > y) { 
                return -1
            }
            else if (x < y) {
                return 1
            }
            else {
                return 0
            }
            })
            showArticles(result, "sectionArticles", "modalsSection")
    }
}
function filtersFunction(e, articles) {
    let result
    if (e.target.value === "") {
        result = articles
        showArticles(articles, "sectionArticles", "modalsSection")
    }
    else {
        result = articles.filter(producto => e.target.value === producto.category)
        showArticles(result, "sectionArticles", "modalsSection")
    }
    console.log(result)
    return result
}
function showFilterList(articles, idDiv) {
    let categories = []
    let filterCategory = document.getElementById(idDiv)
    articles.forEach(product => {
        console.log(product.category)
        if (!categories.some(el => el === product.category)) {
            categories.push(product.category)
        }
    })
    categories.forEach(producto => {
        let option = document.createElement("option")
        option.innerHTML = 
        `
         <option value="${producto}">${producto}</option>   
         `
         filterCategory.appendChild(option)
        })
    }
    function articles() {
        const articles = [
            {id: 1, name: "Chismosa", price: 100, category: "accesorios", offer: false, gender: "s/g", stock: 25, color: "rgb(255, 255, 255)", size: "s/t", description: "Tote bag o \"chismosa\" para tus mandados o simplemente llevar tu set de ajedrez a todos lados.", image: ["../img/img-tienda/Bag.webp"], idCarousel: "section_carousel_chismosa", idModal: "art_chismosa", idModalCarousel: "carousel_chismosa"},
            {id: 2, name: "Reloj", price: 650, category: "accesorios", offer: false, gender: "s/g", stock: 12, color: "rgb(255, 255, 255)", size: "s/t", description: "Reloj de cuarzo para pared con logo del club.", image: ["../img/img-tienda/Clock.webp"], idCarousel: "section_carousel_reloj", idModal: "art_reloj", idModalCarousel: "carousel_reloj"},
            {id: 3, name: "Taza", price: 50, category: "accesorios", offer: true, gender: "s/g", stock: 85, color: ["rgb(255, 255, 255)", "rgb(0, 0, 0)"], size: "s/t", description: "Taza de porcelana.", image: ["../img/img-tienda/Mug-white.webp", "../img/img-tienda/Mug-black.webp"], idCarousel: "section_carousel_taza", idModal: "art_taza", idModalCarousel: "carousel_taza", idInsert: "insert_taza", idCarouselInner: "innerTaza"},
            {id: 4, name: "Llavero", price: 25, category: "accesorios", offer: true, gender: "s/g", stock: 130, color: "rgb(255, 255, 255)", size: "s/t", description: "Llavero con logo.", image: ["../img/img-tienda/Keychain.webp"], idCarousel: "section_carousel_llavero", idModal: "art_llavero", idModalCarousel: "carousel_llavero"},
            {id: 5, name: "Gorra", price: 350, category: "vestimenta", offer: false, gender: "s/g", stock: 75, color: "rgb(62, 64, 149)", size: "único", description: "Gorra estampada con el logo del club.", image: ["../img/img-tienda/Snapback-Cap-front34.webp", "../img/img-tienda/Snapback-Cap-front.webp", "../img/img-tienda/Snapback-Cap-back.webp"], idCarousel: "section_carousel_gorra", idModal: "art_gorra", idModalCarousel: "carousel_gorra", idInsert: "insert_gorra", idSize: "gorra_sizes", idCarouselInner: "innerGorra"},
            {id: 6, name: "Remera", price: 650, category: "vestimenta", offer: false, gender: "masculino", stock: {s: 5, m: 12, l: 7, xl: 4 }, color: ["rgb(255, 255, 255)"], size: ["s", "m", "l", "xl"], description: "Para que luzcas la insignia en el verano. Remera estampada con el logo del club, 100% algodón.", image: ["../img/img-tienda/T-Shirt-Front.webp", "../img/img-tienda/T-Shirt-Back.webp"], idCarousel: "section_carousel_remera", idModal: "art_remera", idModalCarousel: "carousel_remera", idInsert: "insert_remera", idSize: "remera_sizes", idCarouselInner: "innerRemera"},
            {id: 7, name: "Remera para mujer", price: 650, category: "vestimenta", offer: false, gender: "femenino", stock: {s: 5, m: 12, l: 7, xl: 4}, color: ["rgb(255, 255, 255)"], size: ["s", "m", "l", "xl"], description: "Remera con ajuste femenino estampada con el logo del club, 100% algodón.", image: ["../img/img-tienda/t-shirt-woman-front.webp"], idCarousel: "section_carousel_remera_para_mujer", idModal: "art__remera__mujer", idModalCarousel: "carousel_remera_para_mujer", idInsert: "insert_remera_mujer", idSize: "remera_mujer_sizes", idCarouselInner: "innerMujer"},
            {id: 8, name: "Buzo c/ capucha", price: 950, category: "vestimenta", offer: false, gender: "s/g", stock: {s: 5, m: 12, l: 7, xl: 4}, color: ["rgb(255, 255, 255)"], size: ["s", "m", "l", "xl"], description: "Buzo estampado con capucha y amplio bolsillo, 100% algodón.", image: ["../img/img-tienda/Hoody.webp", "../img/img-tienda/Hoody-bck.webp", "../img/img-tienda/Hoody-yellow.webp", "../img/img-tienda/Hoody-yellow-bck.webp"], idCarousel: "section_carousel_buzo", idModal: "art_buzo", idModalCarousel: "carousel_buzo", idInsert: "insert_buzo", idSize: "buzo_sizes", idCarouselInner: "innerBuzo"}
        ]
        return articles
    }
    //ShowArticles es la función que muestra los artículos de la tienda, siendo el primer parámetro un array, el segundo la id en donde se ubican los artículos y el último donde se ubican los modals de cada artículo.
    function showArticles(articles, idDiv, idDivtwo) {
        let sectionArticles = document.getElementById(idDiv)
        let modalPlace = document.getElementById(idDivtwo)
        modalPlace.innerHTML = ""
        sectionArticles.innerHTML = ""
        articles.forEach(element => {
            let card = document.createElement("div")
            let modals = document.createElement("div")
            if (element.image.length === 1) {
                card.classList.add("d-flex", "flex-column", "align-items-center", "col-xs-12", "col-sm-6", "col-lg-3", "mb-sm-3", "mb-4")
                card.innerHTML = 
                `
                    <figure>
                        <!-- Carrusel de Bootstrap -->
                        <div id="${element.idCarousel}" class="carousel slide carousel-fade">
                            <div class="carousel-inner lupa">
                                <div class="d-flex justify-content-center carousel-item active">
                                    <img src=${element.image} data-bs-toggle="modal" data-bs-target= "#${element.idModal}" alt="Bolsa-Club de ajedrez Bella Vista">
                                </div>
                            </div>
                        </div>
                        <figcaption>${element.name}
                            <p>
                                ${element.description}
                            </p>
                            <div id="${element.idSize}">
                            </div>
                            <p class="text-center text__bold">
                                $ ${element.price}
                            </p>
                        </figcaption>
                    </figure>
                    <button class="figure__button" type="button">
                        añadir al carrito
                    </button>
                `
                sectionArticles.appendChild(card)
                if (element.size !== "s/t") {
                    detailSizes(element.size, element.idSize)
                }
                modals.innerHTML = 
                `
                <div class="modal fade" id="${element.idModal}" tabindex="-1" aria-hidden="true">
                <div class="modal-xl modal-dialog modal-dialog-centered">
                  <div class="modal-content rounded-0">
                    <div class="modal-header border-0">
                      <button type="button" class="btn-close button__close-color" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="carousel-inner">
                            <div class="d-flex justify-content-center carousel-item active">
                                <img src="${element.image}" class="img-fluid" alt="Remera para mujer con logo">
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
                `
                modalPlace.appendChild(modals)
            }
            else if (element.image.length > 1) {
                card.classList.add("d-flex", "flex-column", "align-items-center", "col-xs-12", "col-sm-6", "col-lg-3", "mb-sm-3", "mb-4")
                card.innerHTML = 
                `   
                    <figure>
                        <!-- Carrusel de Bootstrap -->
                        <div id="${element.idCarousel}" class="carousel slide carousel-fade">
                            <div id="${element.idInsert}" class="carousel-inner lupa">
                                <div class="d-flex justify-content-center carousel-item active">
                                    <img src= "${element.image[0]}" data-bs-toggle="modal" data-bs-target="#${element.idModal}" alt="Taza-blanca-Club de ajedrez Bella Vista">
                                </div>
                            </div>
                            <button class="carousel-control-prev carousel__button" type="button" data-bs-target="#${element.idCarousel}" data-bs-slide="prev">
                                <img src="../css/img/arrowlft.svg" class="border-0 carousel-control-prev-icon" aria-hidden="true" alt="flecha izquierda">
                            </button>
                            <button class="carousel-control-next carousel__button" type="button" data-bs-target="#${element.idCarousel}" data-bs-slide="next">
                                <img src="../css/img/arrowrgth.svg" class="border-0 carousel-control-next-icon" aria-hidden="true" alt="flecha derecha"> 
                            </button>
                        </div>
                        <figcaption>${element.name}
                            <p>
                                ${element.description}
                            </p>
                            <div id="${element.idSize}">
                            </div>
                            <p class="text-center text__bold">
                                $ ${element.price}
                            </p>
                        </figcaption>
                    </figure>   
                    <button class="figure__button" type="button">
                        añadir al carrito
                    </button>   
                `
                sectionArticles.appendChild(card)
                for (let i = 1; i < element.image.length; i++) {
                    let imagesCarrousel = document.createElement("div")
                    imagesCarrousel.classList.add("d-flex", "justify-content-center", "carousel-item")
                    imagesCarrousel.innerHTML = 
                    `
                    
                    <img src= "${element.image[i]}">  
                    
                    `
                    let place = document.getElementById(element.idInsert)
                    place.appendChild(imagesCarrousel)
                }
                if (element.size !== "s/t") {
                    detailSizes(element.size, element.idSize)
                }
                modals.innerHTML = 
                `
                    <div class="modal fade" id="${element.idModal}" tabindex="-1" aria-hidden="true">
                        <div class="modal-xl modal-dialog modal-dialog-centered">
                            <div class="modal-content rounded-0">
                                <div class="modal-header border-0">
                                    <button type="button" class="btn-close button__close-color" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div id="${element.idModalCarousel}" class="carousel slide carousel-fade">
                                        <div id="${element.idCarouselInner}" class="carousel-inner">
                                            <div class="d-flex justify-content-center carousel-item active">
                                                <img src="${element.image[0]}" class="img-fluid" alt="T-shirt-Club de ajedrez Bella Vista">
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev carousel__button" type="button" data-bs-target="#${element.idModalCarousel}" data-bs-slide="prev">
                                            <img src="../css/img/arrowlft.svg" class="border-0 carousel-control-prev-icon" aria-hidden="true" alt="flecha izquierda">
                                        </button>
                                        <button class="carousel-control-next carousel__button" type="button" data-bs-target="#${element.idModalCarousel}" data-bs-slide="next">
                                            <img src="../css/img/arrowrgth.svg" class="border-0 carousel-control-next-icon" aria-hidden="true" alt="flecha derecha"> 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                modalPlace.appendChild(modals)
                for(let i = 1; i < element.image.length; i++) {
                    let imagesCarrousel = document.createElement("div")
                    imagesCarrousel.classList.add("d-flex", "justify-content-center", "carousel-item")
                    imagesCarrousel.innerHTML = 
                    `
                    
                        <img src= "${element.image[i]}" class="img-fluid" alt="">  
                    
                    `
                    let place = document.getElementById(element.idCarouselInner)
                    place.appendChild(imagesCarrousel) 
                }
            }
                })
            }
            function mainProgram(articles) {
                let aux = articles
                let filters = document.getElementById("filterCategory")
                let order = document.getElementById("filterOrder")
                let search = document.getElementById("input_search")
                let searchInput = document.getElementById("input_button_search")
                showFilterList(articles, "filterCategory")
                showArticles(articles, "sectionArticles", "modalsSection")
                filters.addEventListener("input", (e) => {filtersFunction(e, articles)})
                order.addEventListener("input", (e) => orderFunction(e, aux))
                search.addEventListener("keydown", (e) => {aux = searchFunction(e, articles)})
                searchInput.addEventListener("click", () => {
                    let textSearch = search.value
                    aux = searchFunctionInside(textSearch, articles)
                })

            }    
            