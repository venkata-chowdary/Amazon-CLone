function getFeaturedBooks(){
    db.collection("featured-categories").get().then((doc)=>{
        let featuredBooks=[];
        doc.forEach((book)=>{
            featuredBooks.push({
                id:book.id,
                category:book.data().category,
                image:book.data().image
            })
        })
        generateFeaturedBook(featuredBooks);
    })
}

function addToCart(item){
    let cartItem=db.collection("cart-items").doc(item.id)
    cartItem.get().then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity:doc.data().quantity + 1
            })

        }
        else{
            cartItem.set({
                image:item.image,
                make:item.author,
                name:item.name,
                rating:item.rating,
                price:item.price,
                quantity:1
            })
        }
    })
}


function generateSelfhelpBooks(items){
    items.forEach((item)=>{
        let doc=document.createElement("div");
        doc.classList.add("self-help-book" ,"text-left","mb-5")
        doc.innerHTML=`
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain select-none" src="${item.image}">
            </div>
            <div class="book-name w-9/12 font-bold text-md mt-2 text-gray-700">
                ${item.name}
            </div>
            <div class="book-author text-green-700 font-bold">
                ${item.author}
            </div>
            <div class="book-rating text-yellow-300 font-bold my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="book-price font-bold text-md text-lg text-gray-700">
                ₹${f.format(item.price)}
            </div>
        `
        let addToCartEl=document.createElement("div")
        addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center","mt-2","select-none");
        addToCartEl.innerText="Add to Cart";
        addToCartEl.addEventListener("click",function(){
            addToCart(item);
            getCartItems();
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".self-help-books").appendChild(doc);
    })
}

function generateFeaturedBook(featuredBooks){
    featuredBooks.forEach((book)=>{
        let featuredBook=document.createElement("div")
        featuredBook.classList.add("category-product", "w-52", "h-52" ,"bg-gray-200" ,"rounded-full" ,"text-center","p-8","mb-8")
        featuredBook.innerHTML=`
        <img  class="w-full h-full object-contain" src="${book.image}">
        <h4 class="category-name font-bold text-gray-800 opacity-90 mt-10 mb-2 text-l cursor-pointer h-8 border-solid border-2 border-gray-600 rounded-xl hover:bg-gray-800 hover:text-white text-medium"><a href="#${book.category}">${book.category}</a></h4>
        `
        document.querySelector(".featured-category-products").appendChild(featuredBook);
    })
}

function getSelfHelpBooks(){
    db.collection("self-help-books").get().then((data)=>{
        let selfHelpBooks=[]
        data.forEach((doc)=>{
            selfHelpBooks.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                author:doc.data().author,
                rating:doc.data().rating,
                price:doc.data().price
            })
        });
        generateSelfhelpBooks(selfHelpBooks)
    });
}

getFeaturedBooks();
getSelfHelpBooks();


