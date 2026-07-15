let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlistContainer");

function loadWishlist() {

    if (wishlist.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;width:100%;">
                ❤️ Wishlist is Empty
            </h2>
        `;

        return;
    }

    container.innerHTML = "";

    wishlist.forEach(food => {

        container.innerHTML += `

        <div class="card">

            <img src="${food.image}">

            <h2>${food.name}</h2>

            <p>${food.description}</p>

            <h3>₹${food.price}</h3>

            <p><b>Category :</b> ${food.category}</p>

            <div class="btns">

                <button class="cartBtn"
                onclick="addToCart('${food.id}')">

                    🛒 Add To Cart

                </button>

                <button class="removeBtn"
                onclick="removeWishlist('${food.id}')">

                    🗑 Remove

                </button>

            </div>

        </div>

        `;

    });

}

function removeWishlist(id) {

    wishlist = wishlist.filter(item => item.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    loadWishlist();

}

function addToCart(id) {

    const food = wishlist.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: food.id,
            name: food.name,
            image: food.image,
            price: food.price,
            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("🛒 Added To Cart");

}

loadWishlist();