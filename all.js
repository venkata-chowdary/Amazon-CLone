const menuBtn=document.querySelector(".menu-btn")
const menuIcon=document.querySelector(".menu-icon")

menuBtn.addEventListener("click",()=>{
    document.querySelector(".main-sidebar").classList.toggle("hidden")
    if(menuIcon.classList.contains("fa-bars")){
        menuIcon.classList.add("fa-xmark")
        menuIcon.classList.remove("fa-bars")
    }
    else{
        menuIcon.classList.add("fa-bars")
        menuIcon.classList.remove("fa-xmark")
    }
})

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
                make:item.make,
                name:item.name,
                rating:item.rating,
                price:item.price,
                quantity:1
            })
        }
    })
}

let mainBanner=[
    "banner-1.jpg",
    "banner-2.jpg",
    "banner-3.jpg",
    "banner-4.jpg"
]

let electroBanner=[
    "banner-2.jpg",
    "banner-5.jpg",
    "banner-6.jpg",
    "banner-7.jpg",
    "banner-8.jpg",
    "banner-9.jpg",    
]


setInterval(function(){
    const bannerImg=document.querySelector(".main-banner-image")
    const bannerCount=mainBanner[Math.floor(Math.random()* mainBanner.length)];
    bannerImg.src=bannerCount;
},3500)

setInterval(function(){
    const electroImg=document.querySelector(".electro-banner-image")

    const bannerCount=electroBanner[Math.floor(Math.random() * electroBanner.length)];
    electroImg.src=bannerCount;
},3500)


const currentLink=window.location.pathname;

const activeLinkPath=document.querySelectorAll(".linkState div span a").forEach(link=>{
    if(link.href.includes(`${currentLink}`)){
        link.classList.add("active")
        link.parentNode.parentNode.classList.add("bg-gray-700")
    }
})

//Currency Converter
const f=new Intl.NumberFormat("en-IN")