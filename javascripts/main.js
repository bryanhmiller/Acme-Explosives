$(document).ready(function(){

    var category = [];
    var types = [];
    var products = [];
    var categoryId;
    var categoryName;

    // function makeDropDown() {
    //     var dropDownString;
    //     var currentCategory;
    //     for (j = 0; j < category.length; j++) {
    //         currentCategory = category[j];
    //         dropDownString += `<li>`;
    //         dropDownString += `<a href="#" id="${currentCategory.id}">${currentCategory.name}</a>`;
    //         dropDownString += `</li>`;
    //     }
    //     $("#dropdown").append(dropDownString);
    // }


    $("#firework").on("click", categorySelect);
    $("#demolition").on("click", categorySelect);
    // $(".dropdown-menu").on("click", "li", writeDOM);   


    function categorySelect() {
        categoryName = this.innerHTML;
        for (k = 0; k < category.length; k++) {
            if ("Fireworks" === this.innerHTML) {
                categoryId = 0;
            } else {
                categoryId = 1;
            }
        console.log("categoryId", categoryId);            
        }
        writeDOM();   
    }

    function writeDOM(){
        var domString = "";
        for(var i=0; i < types.length; i++){
            if (categoryId === types[i].category) {
                domString += `<h1>${categoryName}</h1>`;
                domString += `<h3>${types[i].name}</h3>`;
                for (l = 0; l < products.length; l++) {
                    console.log(products[l]);
                    // if (type[i].id == products[l].fairy_sparklers.type) {
                    //     domString += `<h4>${products[l].name}`;
                    // }
                }    
            }
        }
        $("#promises").append(domString);
    }




    var categoriesJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/categories.json").done(function(data1){
                resolve(data1.categories);
            }).fail(function(error1){
                reject(error1);
            })
        })
    };

    var typesJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/types.json").done(function(data2){
                resolve(data2.types);
            }).fail(function(error2){
                reject(error2);
            })
        })
    };

    var productsJSON = function(){
        return new Promise(function(resolve, reject){
            $.ajax("./db/products.json").done(function(data3){
                resolve(data3.products);
            }).fail(function(error3){
                reject(error3);
            })
        })
    };




    // this is the most ideal method
    categoriesJSON().then(function(jsonData1){
        // console.log(jsonData1);
        category = jsonData1;
        // console.log("category", category);
        return typesJSON();
    }).then(function(jsonData2){
        // console.log(jsonData2);
        // jsonData2.forEach(function(type){
        //     types.push(type);
        // })
        types = jsonData2;
        // console.log("type", types);
        return productsJSON();
    }).then(function(jsonData3){
        // console.log("jsonData2", jsonData2);
        // console.log(jsonData3);
        // jsonData3.forEach(function(product){
        //     products.push(product);
        // })
        products = jsonData3;
        // console.log("product",  products);
        // writeDOM();
    });
});
    //this method works the best for this solution
//     Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()])
//         .then(function(resultz){
//             console.log("resultz", resultz);
//             resultz.forEach(function(ajaxCalls){
//                 ajaxCalls.forEach(function(dino){
//                     dinosaurs.push(dino);
//                 })
//             })
//             writeDOM();
//         })