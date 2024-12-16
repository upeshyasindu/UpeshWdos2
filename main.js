let shop = document.getElementById("shop");

let shopItemsData = [{
    id:"a",
    name:"Paracetamol 500mg",
    price: 60.00,
    img: "images/cat1.1.jpeg"
},{
    id:"ab",
    name:"Aspirin",
    price: 80.00,
    img: "images/cat1.2.jpeg"
},{
    id:"abc",
    name:"Motrin",
    price: 100.00,
    img: "images/cat1.3.jpeg"
},{
    id:"abcd",
    name:"Tylenol",
    price: 120.00,
    img: "images/cat1.4.jpeg"
},{
    id:"abcde",
    name:"Demerol",
    price: 140.00,
    img: "images/cat1.5.jpeg"
},{
    id:"abcdef",
    name:"Naprosyn",
    price: 160.00,
    img: "images/cat1.6.jpeg"
},{
    id:"abcdefg",
    name:"ibuprofen",
    price: 180.00,
    img: "images/cat1.7.jpeg"
    
}];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop = () => {
    return (shop.innerHTML=shopItemsData.map((x)=>{
        let {id, name, price, img} = x;
        let search = basket.find((x)=>x.id ===id) || [];
        return `
    <div id=product-id-${id} class="pharmacy-box1">
               <IMG src= ${img}> 
                <h5>${name}</h5>
                <div class="favourite">
                    <a href="#"></a><i class="fa-solid fa-star"></i></a>


                </div>
                <h3>Rs.${price}</h3>
                
                <div class="wrapper">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id=${id} class="quantity"> ${search.item === undefined? 0: search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
                         
            </div>
    
    `;
    
    }).join(""));
}
generateshop();

let increment = (id) => {
    let selectedItem = id;
    
    let search = basket.find((x)=> x.id ===selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
        
    }

    else {
        search.item += 1;
    }

    localStorage.setItem("data", JSON.stringify(basket));
    

    
    update(selectedItem.id);
};


let decrement = (id) => {
    let selectedItem = id;
    
    let search = basket.find((x)=> x.id ===selectedItem.id);

    if (search===undefined) return;

    else if (search.item === 0) return;
    
    else {
        search.item -= 1;
    }
    
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    
   
    localStorage.setItem("data", JSON.stringify(basket));
    
};

let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation =()=>{
    let carticon = document.getElementById("cartamount1");
    console.log(basket.map((x)=>x.item).reduce((x,y) =>x+y,0));

    carticon.innerHTML = basket.map((x) => x.item).reduce((x,y) =>x+y,0);
    
    
};
calculation();











