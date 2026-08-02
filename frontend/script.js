// ================= LOGIN PROTECTION =================

if (
    window.location.pathname.includes("shop.html") &&
    !localStorage.getItem("isLogin")
) {
    window.location.href = "login.html";
}


// ================= MOBILE NAVBAR =================

const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}


// ================= LOAD PRODUCTS =================

loadProducts();

async function loadProducts() {

    try {

        const res = await fetch("http://localhost:8002/products");

        const products = await res.json();


        // ================= HOME PAGE =================

        const homeContainer =
            document.getElementById("homeProducts");

        if (homeContainer) {

            homeContainer.innerHTML = "";

            products.slice(0, 8).forEach(product => {

                homeContainer.innerHTML += `

                    <div class="pro"
                         onclick="openProduct('${product._id}')">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

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

                        <a
                            href="javascript:void(0)"
                            onclick="event.stopPropagation(); addToCart('${product._id}')"
                        >
                            <i class="ri-shopping-bag-line line"></i>
                        </a>

                    </div>

                `;

            });

        }


        // ================= SHOP PAGE =================

        const shopContainer =
            document.getElementById("productContainer");

        if (shopContainer) {

            const params =
                new URLSearchParams(window.location.search);

            const searchTerm =
                params.get("search");

            let filteredProducts = products;


            // SEARCH FILTER

            if (searchTerm) {

                const search =
                    searchTerm.toLowerCase();

                filteredProducts = products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(search)

                );

            }


            shopContainer.innerHTML = "";


            // NO RESULT

            if (filteredProducts.length === 0) {

                shopContainer.innerHTML = `
                    <h3 style="width:100%; text-align:center;">
                        No products found
                    </h3>
                `;

            }


            // DISPLAY PRODUCTS

            filteredProducts.forEach(product => {

                shopContainer.innerHTML += `

                    <div class="pro"
                         onclick="openProduct('${product._id}')">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

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


                        <a
                            href="#"
                            onclick="event.preventDefault();
                            event.stopPropagation();
                            addToCart('${product._id}')"
                        >
                            <i class="ri-shopping-bag-line line"></i>
                        </a>

                    </div>

                `;

            });

        }

    }

    catch (err) {

        console.error(
            "Product loading error:",
            err
        );

    }

}


// ================= ADD TO CART =================

async function addToCart(productId) {

    try {

        const res = await fetch(
            "http://localhost:8002/cart",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    productId: productId,
                    quantity: 1
                })
            }
        );


        const data = await res.json();

        alert(data.message);

    }

    catch (err) {

        console.error(
            "Add to cart error:",
            err
        );

    }

}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");

    alert("Logout Successful");

    window.location.href = "login.html";

}


// ================= PRODUCT DETAILS =================

function openProduct(id) {

    window.location.href =
        `sproduct.html?id=${id}`;

}


// ================= SEARCH =================

const searchToggle =
    document.getElementById("searchToggle");

const searchOverlay =
    document.getElementById("searchOverlay");

const searchClose =
    document.getElementById("searchClose");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


// OPEN SEARCH

if (searchToggle && searchOverlay) {

    searchToggle.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            searchOverlay.classList.add("active");

            if (searchInput) {
                searchInput.focus();
            }

        }
    );

}


// CLOSE SEARCH

if (searchClose && searchOverlay) {

    searchClose.addEventListener(
        "click",
        function () {

            searchOverlay.classList.remove("active");

        }
    );

}


// CLICK OUTSIDE TO CLOSE

if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        function (e) {

            if (e.target === searchOverlay) {

                searchOverlay.classList.remove("active");

            }

        }
    );

}


// SEARCH BUTTON

if (searchBtn && searchInput) {

    searchBtn.addEventListener(
        "click",
        function () {

            const value =
                searchInput.value.trim();


            if (value === "") {

                alert("Please enter a product name");

                return;

            }


            window.location.href =
                "shop.html?search=" +
                encodeURIComponent(value);

        }
    );

}


// ENTER KEY SEARCH

if (searchInput && searchBtn) {

    searchInput.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Enter") {

                searchBtn.click();

            }

        }
    );

}

 

// ================= RAZORPAY PAYMENT =================

const payBtn = document.getElementById("payBtn");

if (payBtn) {

    payBtn.addEventListener("click", async () => {

        try {

            // Amount (₹500 Test)
            const res = await fetch("http://localhost:8002/payment/create-order", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: 500
                })

            });

            const order = await res.json();

            const options = {

                key: "rzp_test_TKiZeKgaZQC2MK",

                amount: order.amount,

                currency: order.currency,

                name: "My E-Commerce Store",

                description: "Order Payment",

                order_id: order.id,
handler: async function (response) {

    try {

        const res = await fetch("http://localhost:8002/payment/verify-payment", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_order_id: response.razorpay_order_id,

                razorpay_signature: response.razorpay_signature

            })

        });

        const data = await res.json();

        if (data.success) {

            window.location.href = "success.html";

        } else {

            alert("Payment Verification Failed");

        }

    } catch (err) {

        console.log(err);

        alert("Something Went Wrong");

    }

},

                prefill: {

                    name: "Customer",

                    email: "customer@gmail.com",

                    contact: "9999999999"

                },

                theme: {

                    color: "#088178"

                }

            };

            const rzp = new Razorpay(options);

            rzp.open();

        } catch (err) {

            console.log(err);

            alert("Payment Failed");

        }

    });

}