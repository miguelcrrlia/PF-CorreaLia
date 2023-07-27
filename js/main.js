mainProgram()
//Función Toastify
function toastify(content) {
    if (content === "¡Se te ha olvidado elegir un talle!") {
       Toastify({ 
        text: content,
        duration: 2000,
        offset: {
            y: 30
        },
        style: {
            background: "rgb(255, 242, 18)",
            color: "rgb(62, 64, 149)"
          }  }).showToast()
    }
    else {
        Toastify({
            text: content,
            duration: 2000,
            offset: {
                y: 30
            },
        }).showToast()
    }
}
//Devuelve lo almacenado en el localStorage
function functionJSON() {
    let a = JSON.parse(localStorage.getItem("carrito"))
    return a
}
//Escucha a los botones del carrito
function buttonFunction(id1, id2, articles) {
    id1.addEventListener("click", () => cleanCart(articles))
    id2.addEventListener("click", () => finishCart(articles))
}
//Borra el locaStorage
function cleanCart(articles) {
    let auxCarrito = functionJSON()
    if (auxCarrito !== null && auxCarrito !== undefined) {
        auxCarrito.forEach((el) => {
            if (el.size !== "único" && el.size !== "s/t") {
                let auxarticle = articles.findIndex((e) => e.id === el.id)
                let idSelectAux = document.getElementById("talles" + articles[auxarticle].id)
                for (const auxEl in el.amountSize) {
                    articles[auxarticle].stock[auxEl] += el.amountSize[auxEl]
                    //Agrego este condicional, ya que si se realiza alguna búsqueda o filtro 
                    // puede no estar en el DOM el artículo que sí está en el carrito 
                    if (idSelectAux) {
                        idSelectAux.addEventListener("change", () => {reviewStock(articles, auxEl, articles[auxarticle].id)})
                    }
                }
                thereIsStock(articles[auxarticle].id)
            }
            else {
                let auxarticle = articles.findIndex((e) => e.id === el.id)
                articles[auxarticle].stock += el.amount
                thereIsStock(articles[auxarticle].id)
            }
        })
    }
    localStorage.clear()
    makeCart(articles)  
}
//Función de finalizar la compra
function finishCart(articles) {
    let cartSection = document.getElementById("cartSection")
    let message = document.createElement("p")
    cartSection.innerHTML = `<h3>¡Compra finalizada!</h3>`
    cartSection.appendChild(message)
    ShowButtonsCart("close")
    articles = JSON.parse(localStorage.getItem("carrito"))
    localStorage.clear()
}
//Actualiza el stock corriente con respecto al carrito
function updateArticles(articles, carrito) {   
    if (carrito !== null) {
        if (carrito.length !== 0) {   
            carrito.forEach((article) => {
                let aux = articles.findIndex((el) => el.id === article.id)
                articles[aux].stock = article.stock
            })
        }
    }
    return articles
}
//Cambia la clase del botón cuando no hay stock
function outOfStock(articleId) {
    let emptyStock = document.getElementById(articleId)
    emptyStock.classList.remove("figure__button")
    emptyStock.classList.add("figure__button__empty")
    emptyStock.innerText = "Artículo agotado"
}
//Cambia la clase del botón cuando hay stock
function thereIsStock(articleId) {
    let isStock = document.getElementById(articleId)
    //Agrego este condicional, ya que si se realiza alguna búsqueda o filtro 
    // puede no estar en el DOM el artículo que sí está en el carrito 
    if (isStock) {
        isStock.classList.add("figure__button")
        isStock.classList.remove("figure__button__empty")
        isStock.innerText = "añadir al carrito"
    }
}
//Agrega artículos al carrito
function addArticle(e, articles) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let article = articles.find((el) => el.id === Number(e.target.id))
    let aux = carrito.findIndex((el) => el.id === article.id) 
    let selectSize = document.getElementById("talles" + article.id)
    let sizeOption 
        //El artículo existe en el carrito
        if(aux !== -1) {
            //El artículo tiene varios talles
            if (article.size !== "único" && article.size !== "s/t") {
                //Cuando no se ingresó un talle
                if (selectSize.value === "") {
                    toastify("¡Se te ha olvidado elegir un talle!", "true")
                }
                else {
                    //Cuando no hay stock
                    sizeOption = selectSize.value
                    if (article.stock[sizeOption] <= 0) {
                        outOfStock(article.id)
                    }   
                    //Cuando hay stock
                    else {
                        sizeOption = selectSize.value
                        toastify("Se agregó el artículo al carrito")
                        carrito[aux].amount ++
                        if (carrito[aux].amountSize[selectSize.value]) {
                            carrito[aux].amountSize[selectSize.value] ++
                        }
                        else {
                            carrito[aux].amountSize[selectSize.value] = 1
                        }
                        carrito[aux].stock[sizeOption] --
                        carrito[aux].subtotal = Number(carrito[aux].price) * Number(carrito[aux].amount)
                        //Actualiza el localStorage
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        //Actualiza el stock de los artículos que hay en la tienda
                        articles = updateArticles(articles, carrito)
                    }
                }
            }
            //El artículo no tiene talles
            else {
                //Cuando no hay stock
                if (article.stock <= 0) {
                    outOfStock(article.id)
                }   
                //Cuando hay stock
                else {
                    toastify("Se agregó el artículo al carrito")
                    carrito[aux].amount ++
                    carrito[aux].stock --
                    carrito[aux].subtotal = Number(carrito[aux].price) * Number(carrito[aux].amount)
                    //Actualiza el localStorage
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                    //Actualiza el stock de los artículos que hay en la tienda
                    articles = updateArticles(articles, carrito)
                }
            }
        }
    //Cuando el artículo no existe en el carrtio
    else {
        //El artículo tiene varios talles
        if (article.size !== "único" && article.size !== "s/t") {
            if (selectSize.value === "") {
                toastify("¡Se te ha olvidado elegir un talle!")
            }
            else {
                if (article.stock[selectSize.value] === 0) {
                    outOfStock(article.id)
                }   
                else {
                    let auxStock = {...article.stock}
                    let auxAmount = {[selectSize.value]: 1}
                    sizeOption = selectSize.value
                    auxStock[selectSize.value] -= 1  
                    toastify("Se agregó el artículo al carrito")
                    carrito.push({
                        id: article.id,
                        name: article.name,
                        price: article.price,
                        image: article.image,
                        stock: auxStock,
                        amount: 1,
                        amountSize: auxAmount,
                        size: article.size,
                        subtotal: article.price
                    })
                    //Actualiza el localStorage
                   localStorage.setItem("carrito", JSON.stringify(carrito))
                   //Actualiza el stock de los artículos que hay en la tienda
                   articles = updateArticles(articles, carrito)
                }
            }
        }
        //El artículo no tiene talles
        else {
            if (article.stock === 0) {
                outOfStock(article.id)
            }   
            else {
                toastify("Se agregó el artículo al carrito")
                carrito.push({
                    id: article.id,
                    name: article.name,
                    price: article.price,
                    image: article.image,
                    stock: article.stock - 1,
                    size: article.size,
                    amount: 1,
                    subtotal: article.price
                })
                //Actualiza el localStorage
               localStorage.setItem("carrito", JSON.stringify(carrito))
               //Actualiza el stock de los artículos que hay en la tienda
               articles = updateArticles(articles, carrito)
            }
        }
    }
    if (article.size !== "único" && article.size !== "s/t") {
        //Agrego este llamado para que cuando cambie de talle el botón se actualice a "artículo agotado" ó "añadir al carrito"
        selectSize.addEventListener("change", () => {reviewStock(articles, selectSize.value, article.id)})
    }
    makeCart(articles)  
}
//Función que revisa el stock para modificar el botón 
function reviewStock(array, selectSize, articleId) {
    let aux = array.findIndex((el) => el.id === articleId) 
    if (array[aux].stock[selectSize] > 0) {
        thereIsStock(articleId)
    }
    else {
        outOfStock(articleId)
    }
}
//Función donde empieza a desarrollarse el carrito
function cart(articles) {     
    let addCart = document.querySelectorAll(".figure__button")
    addCart.forEach((adds) => {
        adds.addEventListener("click", (e) => addArticle(e, articles))
    })
}
//Función que crea dinámicamente el carrito
function makeCart(articles) {   
    let cartSection = document.getElementById("cartSection")
    let cartTable = document.createElement("table")
    cartTable.id = "idTable"
    let auxCart = functionJSON()
    let auxAmountSize = 0
    cartSection.innerHTML = ""
    //Si el carrito tiene artículos
    if (auxCart) {
        ShowButtonsCart("always")
        cartTable.classList.add("schedules--relative")
        cartTable.innerHTML = 
        `
            <tr class="schedules__days--sticky">
            <tr class="schedules__days--sticky">
                <th></th>
                <th>Nombre</th>
                <th>Precio por unidad</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            <tr id="b" class="schedules__days--sticky">
            <th></th>
            <th></th>
            <th></th>
            <th id="tC"></th>
            <th id="t"></th>
            </tr>
        `
        cartSection.appendChild(cartTable)
        let b = document.getElementById("b")
        let t = document.getElementById("t")
        let tC = document.getElementById("tC")
        let total = 0
        t.innerHTML = ""
        auxCart.forEach((article) => {
            //El artículo tiene varios talles
            if (article.size !== "único" && article.size !== "s/t") {
                let auxIdsize = 1
                for (const art in article.amountSize) {
                    auxAmountSize += Number(article.amountSize[art])
                    let item = document.createElement("tr")
                    total += article.subtotal
                    t.innerText = `Total: 
                    $ ${total}`
                    tC.innerText = `Total:
                    ${auxAmountSize}`
                    item.innerHTML = 
                    `
                    <th><input id="${article.id}${article.name}${auxIdsize}" class="button_delete" type="button" title="elimina" value="eliminar"><img src="${article.image[0]}" class="imgTableCart"></th>
                    <td>${article.name} Talle: ${art}</td>
                    <td>$ ${article.price}</td>
                    <td>${article.amountSize[art]}</td>
                    <td>$ ${article.subtotal}</td>
                    `
                    let parentElement = b.parentElement
                    parentElement.insertBefore(item, b) 
                    deleteFuntion(articles, article.id+article.name+auxIdsize, article, art)
                    auxIdsize ++
                }
            }
            //El artículo no tiene varios talles
            else {
                auxAmountSize += Number(article.amount)
                let item = document.createElement("tr")
                    total += article.subtotal
                    t.innerText = `Total: 
                    $ ${total}`
                    tC.innerText = `Total:
                    ${auxAmountSize}`
                    item.innerHTML = 
                    `
                    <th><input id="${article.id}${article.name}" class="button_delete" type="button" title="elimina" value="eliminar"><img src="${article.image[0]}" class="imgTableCart"></th>
                    <td>${article.name}</td>
                    <td>$ ${article.price}</td>
                    <td>${article.amount}</td>
                    <td>$ ${article.subtotal}</td>
                    `
                    let parentElement = b.parentElement
                    parentElement.insertBefore(item, b) 
                    deleteFuntion(articles, article.id+article.name, article)
            }
        })
        let buttonClean = document.getElementById("clean")
        let buttonFinish = document.getElementById("finish")
        buttonFunction(buttonClean, buttonFinish, articles)
    }
    //Si el carrito no tiene artículos
    else {
        let cartAlert = document.createElement("p")
        ShowButtonsCart("close")
        cartAlert.innerText = "El carrito está vacío!"
        cartSection.appendChild(cartAlert)
    }
}
function deleteFuntion(articles, idDeleteButton, article, articleAmountSize) {
    let deleteButton = document.getElementById(idDeleteButton)
    deleteButton.addEventListener("click", () => {
        let carrito = functionJSON()
        //El artículo tiene varios talles
        if (article.size !== "único" && article.size !== "s/t") {
            let aux = carrito.findIndex((el) => el.id === article.id)
            let auxTwo = articles.findIndex((el) => el.id === article.id)
            let buttonAdd = document.getElementById(article.id)
            //Le devuelvo el stock del talle
            articles[auxTwo].stock[articleAmountSize] += carrito[aux].amountSize[articleAmountSize]
            carrito[aux].stock[articleAmountSize] += carrito[aux].amountSize[articleAmountSize]
            delete carrito[aux].amountSize[articleAmountSize]
            //Reviso si la propiedad del objeto quedó vacía, si no el makeCart() armará el carrito sin ningún artículo
            if (Object.getOwnPropertyNames(carrito[aux].amountSize).length === 0) {
                carrito.splice(aux, 1)
            }
            //Borro el localStorage en caso de que quede un array vacío, situación que se puede dar si existía un único
            //artículo con varios talles y se elimina. De nuevo el makeCart() armará el carrito sin ningún artículo.
            localStorage.setItem("carrito", JSON.stringify(carrito))  
            if (carrito.length === 0) {
                localStorage.clear()
            }
            //Me fijo antes si se encuentra el botón en el DOM
            if (buttonAdd) {
                //como se reintegra el stock al estado anterior cambio la situacion del botón a añadir al carrito
                buttonAdd.addEventListener("change", reviewStock(articles, articleAmountSize, article.id))
            }
            // updateArticlesAfterDelete(articles, article, articleAmountSize)
            makeCart(articles)
        }
        //El artículo no tiene varios talles
        else {
            let newCarrito = carrito.filter((el) => el.id !== article.id)
            let aux = articles.findIndex((el) => el.id === article.id)
            articles[aux].stock += article.amount
            //como se reintegra el stock al estado anterior cambio la situacion del botón a añadir al carrito
                thereIsStock(article.id)
            localStorage.setItem("carrito", JSON.stringify(newCarrito))  
            if (newCarrito.length === 0) {
                localStorage.clear()
            }
            // updateArticlesAfterDelete(articles, article)
            makeCart(articles)
        }
    })
}
//Esconde o muestra el carrito
function showCart() {
    let cartSection = document.getElementById("sectionHide")
    let mainSection = document.getElementById("mainSection")
    let form_search = document.getElementById("form_search")
    cartSection.classList.toggle("hide")
    mainSection.classList.toggle("hide")
    form_search.classList.toggle("hide")
}
//Esconde o muestra los botones del carrito
function ShowButtonsCart(option) {
    let buttonsCartClean = document.getElementById("clean")
    let buttonsCartFinish = document.getElementById("finish")
    if (option === "always") {
        buttonsCartClean.classList.remove("hide")
        buttonsCartFinish.classList.remove("hide")
    }
    else if (option === "close") {
        buttonsCartClean.classList.add("hide")
        buttonsCartFinish.classList.add("hide")
    }
}
//Crea una lista de talles  
function detailSizes(size, idSize, id) {
    let paragraph = document.getElementById(idSize)
    paragraph.classList.add("font-size", "text-start", "sizePadding")
    let options = document.createElement("select")
    options.id = "talles" + id
    paragraph.innerHTML = 
    `
        Talle: 
    `
    if (size !== "único")
    {
        let optn = document.createElement("option")
        optn.setAttribute("value", "")
        optn.innerHTML = 
        `
            Elija un talle...
        `
        options.appendChild(optn)
        for(let i = 0; i <size.length; i++) {
            let op = document.createElement("option")
                op.setAttribute("value", size[i])
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
    cart(array)
    return result
}
function searchFunction(e, array) {
    let result
    if (e.which === 13 || e.keyCode === 13 || e.key === "enter") {
        e.preventDefault()
        result = searchFunctionInside(e.target.value, array)
        showArticles(result, "sectionArticles", "modalsSection")
        cart(array)
      }
      return result
}
function orderFunction(e, array) {
    let result 
    if (e.target.value === "mayor") {
        result = array.sort((a, b) => b.price - a.price)
        showArticles(result, "sectionArticles", "modalsSection")     
        cart(array)
    }
    else if (e.target.value === "menor") {
        result = array.sort((a, b) => a.price - b.price)
        showArticles(result, "sectionArticles", "modalsSection")
        cart(array)
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
            cart(array)
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
            cart(array)
    }
}
function filtersFunction(e, articles) {
    let result
    if (e.target.value === "") {
        result = articles
        showArticles(articles, "sectionArticles", "modalsSection")
        cart(articles)
    }
    else {
        result = articles.filter(producto => e.target.value === producto.category)
        showArticles(result, "sectionArticles", "modalsSection") 
        cart(articles)
    }
    let order = document.getElementById("filterOrder")
    order.addEventListener("input", (e) => orderFunction(e, result))
    return result
}
function showFilterList(articles, idDiv) {
    let categories = []
    let filterCategory = document.getElementById(idDiv)
    articles.forEach(product => {
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
async function mainProgram() {
    let articlesTemp 
    articlesTemp = await articles()
    startProgram(articlesTemp)
}
function articles() {
    let timeMark
    function messageWait(messageOption) {
        let message = messageOption
        let i = 0
        let sectionArticles = document.getElementById("sectionArticles")
        sectionArticles.innerHTML =
            `<h3>${message}</h3>`
         timeMark = setInterval(async () => {
            message += "."
            if(i === 3) {
                i = -1
                message = "Espere por favor"
            }  
            sectionArticles.innerHTML =
            `<h3>${message}</h3>`
            i++
        }, 250)
    }
    messageWait("Espere por favor")
    return order = new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch("../js/data.json")
                .then((response) => response.json())
                .then((data) => {
                    clearInterval(timeMark)
                    resolve(data)
                })
                .catch(() => {
                    reject("Error de conexión")
                    window.location.href = "../pages/404.html"
                })
        }, 2500)
    })
}
//Agrego esta función en caso de que el stock sea cero 
//(como en este caso no puedo usar el método put para modificar el .json 
//nunca será necesario a no ser que modifique "a mano" el stock)
function firstReviewStock(element) {
    //El id del select de los talles de los productos es "talles+artículo.id"
    let AuxIdSelect = "talles" + element.id
                let selectSizeListen = document.getElementById(AuxIdSelect)
                selectSizeListen.addEventListener("change", (e) => {
                    if (element.stock[e.target.value] === 0) {
                        outOfStock(element.id)
                    } 
                    else {
                        thereIsStock(element.id)
                    }
                })
} 
//ShowArticles es la función que muestra los artículos de la tienda, 
//siendo el primer parámetro un array que los contiene, el segundo la id en donde se ubican 
//y el último donde se ubican sus modals.
function showArticles(articles, idDiv, idDivtwo) {
    let sectionArticles = document.getElementById(idDiv)
    let modalPlace = document.getElementById(idDivtwo)
    modalPlace.innerHTML = ""
    sectionArticles.innerHTML = ""
    if (articles.length === 0) {
        sectionArticles.innerHTML = 
        `
            <h3>¡Oops, lo sentimos, no hemos encontrado nada!
        `
    }
    else {
        articles.forEach(element => {
            let card = document.createElement("div")
            let modals = document.createElement("div")
            //En el caso que el artículo tenga solo una imágen
            if (element.image.length === 1) {
                card.classList.add("d-flex", "flex-column", "align-items-center", "col-xs-12", "col-sm-6", "col-lg-3", "mb-sm-3", "mb-4")
                card.innerHTML = 
                `
                    <figure>
                        <!-- Carrusel de Bootstrap -->
                        <div id="${element.idCarousel}" class="carousel slide carousel-fade">
                            <div class="carousel-inner lupa">
                                <div class="d-flex justify-content-center carousel-item active">
                                    <img src=${element.image[0]} data-bs-toggle="modal" data-bs-target= "#${element.idModal}" alt="${element.alt}">
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
                    <button id="${element.id}" class="figure__button" type="button">
                        añadir al carrito
                    </button>
                `
                sectionArticles.appendChild(card)
                //Agrego esta condición en caso de que el stock sea cero 
                //(como en este caso no puedo usar el método put para modificar el .json 
                //nunca será necesario a no ser que modifique "a mano" el stock)
                if (element.stock === 0 && (element.size === "único" || element.size === "s/t")) {
                    outOfStock(element.id)
                }
                //El artículo tiene varios talles
                if (element.size !== "s/t" && element.size !== "único") {
                    detailSizes(element.size, element.idSize, element.id)
                    firstReviewStock(element)
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
                                <img src="${element.image[0]}" class="img-fluid" alt="${element.alt}">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                `
                modalPlace.appendChild(modals)
            }
            //En el caso que el artículo tenga más de una imágen
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
                    <button id="${element.id}" class="figure__button" type="button">
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
                //Para mostrar una lista de talles
                if (element.size !== "s/t" && element.size !== "único") {
                    detailSizes(element.size, element.idSize, element.id)
                    firstReviewStock(element)
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
                                                <img src="${element.image[0]}" class="img-fluid" alt="${element.alt}">
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
}
//Función principal
function startProgram(articles) {
    let saveLocal = functionJSON() 
    articles = updateArticles(articles, saveLocal)
    let aux = articles
    let filters = document.getElementById("filterCategory")
    let order = document.getElementById("filterOrder")
    let search = document.getElementById("input_search")
    let searchInput = document.getElementById("input_button_search")
    let cartButton = document.querySelectorAll(".cartAccess")
    //Uso un forEach para ir iterando las etiquetas <a> que ya estaban dentro del HTML, así de esta manera me ahorro de editar un botón completamente de cero, ya que lo tenía hecho anteriormente.
    cartButton.forEach((button) => {
        button.addEventListener("click", showCart)
    })
    showFilterList(articles, "filterCategory")
    showArticles(articles, "sectionArticles", "modalsSection")
    cart(articles)
    makeCart(articles)
    //Opto por usar dos variables alternativas para que se pueda ordenar lo que se filtró o se buscó
    filters.addEventListener("input", (e) => {filtersFunction(e, aux)})
    order.addEventListener("input", (e) => orderFunction(e, aux))
    search.addEventListener("keydown", (e) => {aux = searchFunction(e, articles)})
    searchInput.addEventListener("click", () => {
        let textSearch = search.value
        aux = searchFunctionInside(textSearch, articles)
    })
}    
