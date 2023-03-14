function getSmartPhones(){
    db.collection("smart-phones").get().then((querySnapshot)=>{
        let smartPhones=[]
        querySnapshot.forEach((doc)=>{
            smartPhones.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                make:doc.data().make,
                rating:doc.data().rating,
                price:doc.data().price
            })
        });
        generateElectronics(smartPhones)
    })
}


function getLaptops(){
    db.collection("laptops").get().then((querySnapshot)=>{
        let laptops=[]
        querySnapshot.forEach((doc)=>{
            laptops.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                make:doc.data().make,
                rating:doc.data().rating,
                price:doc.data().price
            })
        });
        generateLaptops(laptops)
    })
}

function generateLaptops(items){
    items.forEach((item)=>{
        let doc=document.createElement("div");
        doc.classList.add("electronic", "mr-5","mb-5" ,"text-left");
        doc.innerHTML=`
        <div class="product-image w-48 h-52 bg-white p-4 rounded-lg">
            <img class="w-full h-full object-contain select-none" src="${item.image}">
        </div>
        <div class="product-name text-gray-700 font-bold text-md mt-2">
            ${item.name}
        </div>
        <div class="product-make text-green-700 font-bold">
            ${item.make}
        </div>
        <div class="product-rating text-yellow-300 my-1 font-bold">
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
        document.querySelector(".laptop-products").appendChild(doc);
    })
}

function generateElectronics(items){
    items.forEach((item)=>{
        let doc=document.createElement("div");
        doc.classList.add("electronic", "mr-5","mb-5" ,"text-left");
        doc.innerHTML=`
        <div class="product-image w-48 h-52 bg-white p-4 rounded-lg">
            <img class="w-full h-full object-contain select-none" src="${item.image}">
        </div>
        <div class="product-name text-gray-700 font-bold text-md mt-2">
            ${item.name}
        </div>
        <div class="product-make text-green-700 font-bold">
            ${item.make}
        </div>
        <div class="product-rating text-yellow-300 my-1 font-bold">
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
        document.querySelector(".smart-phones-products").appendChild(doc);
    })
}

getSmartPhones();
getLaptops();