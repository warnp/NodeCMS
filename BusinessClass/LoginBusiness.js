/**
 * Created by romain on 15/08/2014.
 */

var model = require("../Model/Entities");
var MD5 = require("MD5");

exports.Login = function(login, callback){
    var userModel = model.User;

    var saltPwd = MD5(model.Salt + login.pwd);
//    console.log(login.ident);
//    console.log("Clear pwd : "+ model.Salt +login.pwd);
//    console.log("Salt : "+saltPwd);


    userModel.findOne({ident: login.ident, pwd: saltPwd},function(err, us){

        if(us != null) {
            console.log("Connected!");
//            console.log(us);
            callback(true);
        }
        else
        {
            console.log("User not found");
            console.log(err);
            callback(false);
        }
    });

}