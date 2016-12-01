/**
 * Created by romain on 23/08/2014.
 */
var indexService = angular.module('firstPageApp.services',[]);

//indexService.factory('Articles', ['$resource',
//function($resource){
//    return $resource('api/getAllArticles', {},{
//        query: {method:'GET',
//        isArray: true
//        }});
//
//}]);

indexService.factory('warpAPIService', function($http){
    var warpAPI = {};
    console.log("Before api query");
    warpAPI.getArticles = function(){
        return $http.get('api/getAllArticles').success(function (data) {
            $scope.articleList = data;
        })
    };
    return warpAPI;
});

angular.module('adminPageApp.services',[]).factory('warpAPIService', function($http){
    var warpAPI = {};
    warpAPI.getArticles = function(){
        return $http.get('api/getAllArticles').success(function (data) {
            $scope.articleList = data;
        })
    };
    return warpAPI;
});