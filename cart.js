function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot)=>{
        let cartItems=[]
        snapshot.docs.forEach((doc)=>{
            cartItems.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                make:doc.data().make,
                rating:doc.data().rating,
                price:doc.data().price,
                quantity:doc.data().quantity                
            })
            generatecartItems(cartItems);
            cartTotal(cartItems)
        })
    })
}

function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}

function cartTotal(items){
    let total=0
    items.forEach((item)=>{
        total=total+(item.price*item.quantity)
    })
    document.querySelector(".total-cost-number").innerText= `₹${f.format(total)}.00`;
}

function generatecartItems(cartItems){
    let itemsHTML="";
    cartItems.forEach((item)=>{
        itemsHTML +=`
        <div class="cart-item flex items-center pb-4 border-b border-gray-300 mt-4">
        <div class="flex-grow flex flex-col items-start justify-around">
            <div class="cart-item-image w-40 h-24  p-1 rounded-lg ">
                <img class="w-full h-full object-contain select-none" src="${item.image}"> 
            </div>
            <div class="cart-item-details ml-10 my-2 text-center">
                <div class="cart-item-title font-bold text-sm text-gray-600">
                    ${item.name}
                </div>
                <div class="cart-item-brand text-sm text-gray-400">
                    ${item.make}
                </div>
            </div>
        </div>

        <div class="cart-item-counter w-48 flex items-center mr-3 mb-1">
            <div data-id="${item.id}" class="cart-item-decrease chevron-left cursor-pointer text-gray-400 bg-gray-200 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-300 mr-2">
                <i class="fa-solid fa-chevron-left fa-xs"></i>
            </div>
            <h4 class="text-gray-700 font-bold">${item.quantity}</h4>
            <div data-id="${item.id}" class="cart-item-increase chevron-right cursor-pointer text-gray-400 bg-gray-200 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-300 ml-2">
                <i class="fa-solid fa-chevron-right fa-xs"></i>
            </div>
        </div>
        <div class="cart-item-total-cost w-48 font-bold text-xl text-gray-700 mb-2 flex gap-4 flex-wrap">
            ₹${f.format((item.price)*(item.quantity))}.00
            <div data-id="${item.id}" class="cart-item-delete w-10 text-base font-bold text-gray-400 cursor-pointer hover:text-gray-500 ml-2">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
        
    </div>`
    })
    document.querySelector(".cart-items").innerHTML= itemsHTML;
    quantityButtons();

}

function quantityButtons(){
    let decreaseButtons=document.querySelectorAll(".cart-item-decrease");
    let increaseButtons=document.querySelectorAll(".cart-item-increase");
    let deleteButtons=document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button)=>{
        button.addEventListener("click",()=>{
            let cartItem=db.collection("cart-items").doc(button.dataset.id);
            cartItem.get().then(function(doc){
                if(doc.exists){
                    if(doc.data().quantity> 1){
                        cartItem.update({
                            quantity:doc.data().quantity - 1
                        })
                    }
                }
            })
        })
    })
    increaseButtons.forEach((button)=>{
        button.addEventListener("click",()=>{
            let cartItem=db.collection("cart-items").doc(button.dataset.id);
            cartItem.get().then(function(doc){
                if(doc.exists){
                    if(doc.data().quantity > 0){
                        cartItem.update({
                            quantity:doc.data().quantity + 1
                        })
                    }
                }
            })
        })
    })

    deleteButtons.forEach((button)=>{
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id)
        })
    })
}

getCartItems();