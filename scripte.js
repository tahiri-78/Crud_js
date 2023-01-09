
let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let discout=document.getElementById("discout")
let category=document.getElementById("category")
let btn_create=document.getElementById("create")
let totale=document.getElementById("totale")
let count=document.getElementById("count")

let type_d="create"

let recherche_Mod=""

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

//===============Creation du produit==================
//tableau pour stocker les produits ==>vers lacale storage
      let dataProducts=[]  // declaration du tableau pour stockage
      let id_changer // ce variable est utilisé pour la modification d'un element
      let dataTrouve=[]; //table à remplir en cas de rechere se trove dans la fonction showData_trouve
      



    if (localStorage.product!= null) { // si local starage est non vide
        dataProducts=JSON.parse(localStorage.product) // pour récuper les donées du local starage il faut rendre les données à l'etat initial 
    }

    showData(); //affiche les données au moment de chargement

function stocker() {  // fonction permet de socker les données dans la base
    if (type_d == "create") { // si l'attribue class= create ==> ajouter element dans la base
        let newPro={
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discout:discout.value,
            totale:totale.innerHTML,
            category:category.value,
            count:count.value, 
        }

        if (count.value > 1) { // tester;sinon risque d'ajouter le vide dans la base
            for (let i = 0; i < count.value; i++) {
              dataProducts.push(newPro); // insertion de tout les prods  
            }
            
        }else{
           dataProducts.push(newPro); // insertion d'un seul prd 
        }  
           window.localStorage.setItem('product',JSON.stringify(dataProducts)) // pour mettre les données dans locale starage il faut les mettre en "json.stringify"
        } 

        if (type_d == "modif") { // si l'attribue class= create ==> Modifier element dans la base selon la fonction 
           changer_donne(id_changer)  
        } 

    clearData();
    showData(); 
}

//===============fonction : vider les champs aprés chaque ajout ou modification==================
function clearData() {
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discout.value=''
    category.value=''
    totale.innerHTML=''
    count.value=''
    title.focus(); // rendre le focus au debut
}
//===============fonction  : afficher les données stockés==================
function showData() {
     let tabl=document.getElementById("tbody")
     let donnes='' //variabe pour stocker les donner avant affichage (on peut les mettre direct dans tbdoy)"
    for (let i = 0; i < dataProducts.length; i++) {
      
        donnes+=`
        <tr">
        <td id="id_p">${i+1}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discout}</td>
        <td>${dataProducts[i].totale}</td>
        <td>${dataProducts[i].category}</td>
        <td><button onclick="update_item(${i})"  id="update">updat</button></td>
        <td><button onclick="delete_item(${i})" id="delete">delete</button></td> 
     </tr>`
        
    }
        tabl.innerHTML=donnes
        
}



function delete_item(id) { //fonction permet de supprimer un element de la base
  
    dataProducts.splice(id,1) //supprimer d'abord de la table
    // en fin mettre à jour les données dans storage
    window.localStorage.setItem('product',JSON.stringify(dataProducts)) // pour mettre les données dans locale starage il faut les mettre en "json.stringify"
    showData(); //affiche les données au moment de chargement ensuite affiche les donées
}


function update_item(id) {

    // btn_create.setAttribute("class", "modif");
    btn_create.innerHTML="Modifier"
    type_d="modif";
    //recuperer les données et les affichés dans le form
    title.value=dataProducts[id].title
    price.value=dataProducts[id].price
    taxes.value=dataProducts[id].taxes
    ads.value=dataProducts[id].ads
    discout.value=dataProducts[id].discout
    count.value=dataProducts[id].count
    category.value=dataProducts[id].category
    totale.innerHTML=dataProducts[id].totale
    id_changer=id
    // title.focus(); // rendre le focus au debut
    scroll({
        top:0,
        behavior:'smooth'
    })
   
}

function changer_donne(id) {
     //chercher l'element à changer avec id
    for (let i = 0; i < dataProducts.length; i++) {
        if (i==id) {
            dataProducts[i].title=title.value
            dataProducts[i].price=price.value
            dataProducts[i].taxes=taxes.value
            dataProducts[i].ads=ads.value
            dataProducts[i].discout=discout.value
            dataProducts[i].totale=totale.innerHTML
            dataProducts[i].category=category.value
            dataProducts[i].count=count.value   
        } 
    }

   localStorage.setItem('product',JSON.stringify(dataProducts))
   showData(); 
   clearData()
    // btn_create.setAttribute("class", "create"); //attribuer le nom create à l'attribue class
    type_d="create"
    btn_create.innerHTML="Create" ;//changer le nom du button 
    
}
function changeMod(id){

    if (id=="searchTitle") {
        recherche_Mod="searchTitle"
    }else{
        recherche_Mod="searchCategory"
    }
}

function Recherche(value) {
    dataTrouve=[]
    if(value!=null && value!=""){
        //value=String.prototype.toLocaleLowerCase(value)
        for (let i = 0; i < dataProducts.length; i++) {
            if (recherche_Mod=="searchTitle") {
                if (dataProducts[i].title.toLowerCase().includes(value.toLowerCase())) {
                   
                    dataTrouve.push(dataProducts[i]);
                    showData_trouve();
                }
            }
            
            if (recherche_Mod=="searchCategory") {
                if (dataProducts[i].category.toLowerCase().includes(value.toLowerCase())) {
                    dataTrouve.push(dataProducts[i]);
                    showData_trouve();
                }
            }
   


        }
    }else{
        showData();
    }
    
}

function showData_trouve() {  //affiche les données recherchés
    let tabl=document.getElementById("tbody")
    let donnes='' //variabe pour stocker les donner avant affichage (on peut les mettre direct dans tbdoy)"
    
   for (let i = 0; i < dataTrouve.length; i++) {
     
       donnes+=`
       <tr">
       <td id="id_p">${i+1}</td>
       <td>${dataTrouve[i].title}</td>
       <td>${dataTrouve[i].price}</td>
       <td>${dataTrouve[i].taxes}</td>
       <td>${dataTrouve[i].ads}</td>
       <td>${dataTrouve[i].discout}</td>
       <td>${dataTrouve[i].totale}</td>
       <td>${dataTrouve[i].category}</td>
       <td><button onclick="update_item(${i})"  id="update">updat</button></td>
       <td><button onclick="delete_item(${i})" id="delete">delete</button></td> 
    </tr>`
       
   }
       tabl.innerHTML=donnes
       
}