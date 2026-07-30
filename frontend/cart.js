const cartContainer = document.getElementById("cartContainer");

loadCart();

async function loadCart() {
    try {
        const res = await fetch("http://localhost:8002/cart");
        const cartItems = await res.json();

        cartContainer.innerHTML = "";

        cartItems.forEach(item => {
            cartContainer.innerHTML += `
                <tr>
                    <td>
                        <img src="https://via.placeholder.com/80" width="80">
                    </td>

                    <td>${item.productId}</td>

                    <td>${item.quantity}</td>

                    <td>
                        <button onclick="removeCart('${item._id}')">
                            Remove
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.log(err);
    }
}

async function removeCart(id) {

    await fetch(`http://localhost:8002/cart/${id}`, {
        method: "DELETE"
    });

    loadCart();
}

const placeOrderBtn = document.getElementById("placeOrderBtn");

if(placeOrderBtn){

placeOrderBtn.addEventListener("click",placeOrder);

}

async function placeOrder(){

try{

const cartRes=await fetch("http://localhost:8002/cart");

const cart=await cartRes.json();

if(cart.length===0){

alert("Cart is Empty");

return;

}

// next step me order API call karenge

console.log(cart);

const token = localStorage.getItem("token");

const res = await fetch("http://localhost:8002/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
   body: JSON.stringify({

    userId: JSON.parse(localStorage.getItem("user"))._id,

    products: cart,

    totalAmount: cart.reduce((sum,item)=>sum+item.quantity*1000,0)

})
});

const data = await res.json();

alert(data.message);

}catch(err){

console.log(err);

}

}