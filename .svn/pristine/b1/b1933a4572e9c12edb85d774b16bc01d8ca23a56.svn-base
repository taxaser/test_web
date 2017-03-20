var Category = require('../../../models/category');
exports.categories = function(){
    return new Promise(function(resolve){
        Category.fetch(function(err,categories){
            var categories_arry = [];
            categories.forEach(function(file){
                if(file.level==1){
                    for(var i =0;i<categories.length;i++){
                        var cat = categories[i];
                        if(cat['level']==2 && String(file._id)==String(cat['parent_id'])){
                            file['categories'].push(cat);
                        }
                    }
                    categories_arry.push(file);
                    //console.log(categories_arry)
                }
            });
            resolve(categories_arry);
        })
    })

};