var model = require("../Model/Entities");
var ObjectId = require('mongodb').ObjectID;


exports.generatesDefaultsCategories = function(){
	model.Category.find({name: "portfolio"}function(err, res){
		if(err) return;

		if(!res){
			model.Category({
				name: "portfolio"				
			})
		}
	})
}
