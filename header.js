function getCartItems(){
    db.collection("cart-items").onSnapshot((querySnapshot)=>{
        let total=0;
        querySnapshot.forEach((doc)=>{
            total+=doc.data().quantity;
        })
        setCartCounter(total)
    })
}


function setCartCounter(totalCount){
    document.querySelector(".cart-item-number").innerHTML=totalCount;
}

getCartItems();