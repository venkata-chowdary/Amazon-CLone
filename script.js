function getHotDeals(){
    db.collection("items").get().then((querySnapshot)=>{
        let items=[];
        querySnapshot.forEach((doc)=>{
            items.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                make:doc.data().make,
                rating:doc.data().rating,
                price:doc.data().price
            })
        });
        generateHotDeals(items);
    });
}

function generateHotDeals(items){
    items.forEach((item)=>{
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5","text-left","mb-5");            
        doc.innerHTML = `
            <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain select-none" src="${item.image}">
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-md">
                ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-300 font-bold my-1">
            ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700 text-lg">
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
        document.querySelector(".main-section-products").appendChild(doc);
    })
}
getHotDeals();
