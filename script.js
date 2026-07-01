// MENU BUTTONS ON NAVBAR WORKING
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    menuBtn.classList.remove("fa-bars");
    menuBtn.classList.add("fa-xmark");
  } else {
    menuBtn.classList.remove("fa-xmark");
    menuBtn.classList.add("fa-bars");
  }
});
// SEARCH BOX
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
    const value = searchInput.value.toLowerCase().trim();

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();

        product.style.display = name.includes(value) ? "" : "none";
    });
}

// search box working

searchInput.addEventListener("input", filterProducts);
searchInput.addEventListener("keyup", filterProducts);

const searchToggle = document.getElementById("searchToggle");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");


searchToggle.addEventListener("click", () => {
    searchBox.classList.add("active");
    searchInput.focus();
});

closeSearch.addEventListener("click", () => {
    searchBox.classList.remove("active");
    searchInput.value = "";

    products.forEach(product => {
        product.style.display = "";
    });
});



// cart
// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtns = document.querySelectorAll(".cart-btn");
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// Add Product
cartBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const product = btn.closest(".product-card");

        const id = product.dataset.id;

        if(cart.find(item => item.id === id)){
            return;
        }

        cart.push({

            id: id,
            name: product.dataset.name,
            price: Number(product.dataset.price.replace("$","")),
            image: product.dataset.image

        });
        showToast("Added to Cart","successfully");

        updateCart();

    });

});

function updateCart(){

    cartCount.innerText = cart.length;

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length===0){

        cartItems.innerHTML =
        "<p class='empty-cart'>Your Cart is Empty</p>";

        cartTotal.innerText="$0";

        
        return;

    }

    cart.forEach(item=>{

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" width="70">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>$${item.price}</p>

            </div>

            <i class="fas fa-trash remove-cart"
               data-id="${item.id}"></i>

        </div>

        `;

    });

    cartTotal.innerText = "$"+total;

    document.querySelectorAll(".remove-cart").forEach(btn=>{

        btn.onclick=()=>{

            cart = cart.filter(item=>item.id!==btn.dataset.id);
            showToast("Removed from Cart", "remove")

            updateCart();

        };

    });
    localStorage.setItem("cart", JSON.stringify(cart));

}

function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
}

cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartSidebar);
cartOverlay.addEventListener("click", closeCartSidebar);


// ======================
// WISHLIST
// ======================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Elements
const wishlistButtons = document.querySelectorAll(".wishlist");
const wishlistCount = document.getElementById("wishlistCount");

const wishlistIcon = document.querySelector(".wishlist-icon");
const wishlistSidebar = document.getElementById("wishlistSidebar");
const wishlistOverlay = document.getElementById("wishlistOverlay");
const closeWishlist = document.getElementById("closeWishlist");
const wishlistItems = document.getElementById("wishlistItems");

// Add / Remove Wishlist
wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = button.closest(".product-card");
        const id = product.dataset.id;

        if (wishlist.includes(id)) {

            wishlist = wishlist.filter(item => item !== id);

            button.innerHTML = `<i class="fa-regular fa-heart"></i>`;

        } else {

            wishlist.push(id);
            showToast("Added to Wishlist","Successfully");

            button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        }

        updateWishlist();
        renderWishlist();

    });

});

// Update Count
function updateWishlist() {

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
      localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
    }

}

// Render Wishlist
function renderWishlist() {

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
        `<p class="empty-wishlist">Your wishlist is empty ❤️</p>`;

        return;
    }

    wishlist.forEach(id => {

        const product = document.querySelector(`.product-card[data-id="${id}"]`);

        wishlistItems.innerHTML += `

        <div class="wishlist-product">

            <img src="${product.dataset.image}" alt="">

            <div class="wishlist-info">

                <h4>${product.dataset.name}</h4>

                <p>${product.dataset.price}</p>

            </div>

            <i class="fas fa-trash remove-wishlist"
               data-id="${id}">
            </i>

        </div>

        `;

    });


    // Remove Product
    document.querySelectorAll(".remove-wishlist").forEach(btn => {

        btn.addEventListener("click", () => {

            const id = btn.dataset.id;

            wishlist = wishlist.filter(item => item !== id);
            showToast("Remove from wishlist","remove");

            document
                .querySelector(`.product-card[data-id="${id}"] .wishlist`)
                .innerHTML = `<i class="fa-regular fa-heart"></i>`;

            updateWishlist();
            renderWishlist();

        });

    });

}

// Open Sidebar
wishlistIcon.addEventListener("click", () => {

    renderWishlist();

    wishlistSidebar.classList.add("active");
    wishlistOverlay.classList.add("active");

});

// Close Sidebar
closeWishlist.addEventListener("click", closeWish);
wishlistOverlay.addEventListener("click", closeWish);

function closeWish() {

    wishlistSidebar.classList.remove("active");
    wishlistOverlay.classList.remove("active");

}

updateCart();
updateWishlist();
renderWishlist();

wishlist.forEach(id => {

    const heart = document.querySelector(`.product-card[data-id="${id}"] .wishlist`);

    if (heart) {
        heart.innerHTML = `<i class="fa-solid fa-heart" style="color:red;"></i>`;
    }

});


// dark light theme

const themeToggle = document.getElementById("themeToggle");

let theme = localStorage.getItem("theme") || "light";

if(theme === "dark"){
    document.body.classList.add("dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }else{
        localStorage.setItem("theme","light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

});

// toast notification
const toast = document.getElementById("toast");

function showToast(message,type){

    toast.innerText = message;

    toast.className = "";

    toast.classList.add("show");
    toast.classList.add(type);

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);

}

// contact form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("messageError").innerText = "";
    document.getElementById("successMsg").innerText = "";

    let valid = true;

    if(name.value.trim() === ""){
        document.getElementById("nameError").innerText =
        "Please enter your name";
        valid = false;
    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email.value)){
        document.getElementById("emailError").innerText =
        "Enter a valid email";
        valid = false;
    }

    if(message.value.trim().length < 10){
        document.getElementById("messageError").innerText =
        "Message must be at least 10 characters";
        valid = false;
    }

    if(valid){

        document.getElementById("successMsg").innerText =
        "✅ Message sent successfully!";

        contactForm.reset();

    }

});