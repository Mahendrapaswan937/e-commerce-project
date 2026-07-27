const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById("navbar");


if (bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click', () =>{
        nav.classList.remove('active');
    })
}

// ================= SHOP PRODUCTS =================

const productContainer = document.getElementById("productContainer");

if (productContainer) {
    loadProducts();
}

async function loadProducts() {
    try {
        const res = await fetch("http://localhost:8002/products");
        const products = await res.json();

        productContainer.innerHTML = "";

        products.forEach(product => {

            productContainer.innerHTML += `
            
            <div class="pro">

                <img src="${product.image}" alt="">

                <div class="des">

                    <span>${product.category}</span>

                    <h5>${product.name}</h5>

                    <div class="star">
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                    </div>

                    <h4>₹${product.price}</h4>

                </div>

                <a href="#">
                    <i class="ri-shopping-bag-line line"></i>
                </a>

            </div>

            `;

        });

    } catch (err) {
        console.log(err);
    }
}

// ================= Products =================

// const productContainer = document.getElementById("productContainer");

// if (productContainer) {
//     loadProducts();
// }

// async function loadProducts() {
//     try {
//         const response = await fetch("http://localhost:8002/products");
//         const products = await response.json();

//         productContainer.innerHTML = "";

//         products.forEach((product) => {
//             productContainer.innerHTML += `
//                 <div class="pro">
//                     <img src="${product.image}" alt="${product.name}">

//                     <div class="des">
//                         <span>${product.category}</span>
//                         <h5>${product.name}</h5>

//                         <div class="star">
//                             <i class="ri-star-fill"></i>
//                             <i class="ri-star-fill"></i>
//                             <i class="ri-star-fill"></i>
//                             <i class="ri-star-fill"></i>
//                             <i class="ri-star-fill"></i>
//                         </div>

//                         <h4>₹${product.price}</h4>
//                     </div>

//                     <a href="#">
//                         <i class="ri-shopping-bag-line line"></i>
//                     </a>
//                 </div>
//             `;
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }