
let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let discout=document.getElementById("discout")
let category=document.getElementById("category")
let btn_create=document.getElementById("create")
let totale=document.getElementById("totale")

//function calcule : fonction pour calculer le montant totale----------------
function calcule() {

    if (price.value!='') {
        let result=(+price.value + +taxes.value + +ads.value)- +discout.value
        totale.innerHTML=result
        totale.style.backgroundColor="rgb(19, 219, 52)"

    }else{
        totale.innerHTML=""
        totale.style.backgroundColor="brown"
    }
    

}

//function stocker : pour Stoker les données----------------





//===============Creation du produit==================
//tableau pour stocker les produits dans lacale storage
    if (localStorage.product!= null) {
        dataProducts=JSON.parse(localStorage.product)
    }else{
        let dataProducts=[] 
    }

    function stocker() {
    //Creation d'un objet pour chaque produit
        let newPro={
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discout:discout.value,
            totale:totale.innerHTML,
        }
    
        dataProducts.push(newPro) // insertion
        // mettre les données dans data storage(base de navigateur)
        window.localStorage.setItem('product',JSON.stringify(dataProducts))
}
//===============fin Creation du produit==================