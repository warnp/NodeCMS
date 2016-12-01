/**
 * Created by romain on 23/08/2014.
 */
angular.module('firstPageApp.controllers',[]).
    controller('articlesController', function($scope, warpAPIService){
        $scope.articleList = [];

        warpAPIService.getArticles().success(function(response){
            $scope.articleList = response;
        })
            .error(function(data,status, headers, config){
                console.log("Erreur de chargement des données de la première page "+status);
                console.log("Erreur header "+headers);
            });
    });





angular.module('adminPageApp.controllers', []).
    controller('articlesController',function($scope, warpAPIService){
        $scope.articleFilter = null;
        $scope.articleList = [];

        warpAPIService.getArticles().success(function(response){
            $scope.articleList = response;
        })
            .error(function(data,status, headers, config){
                console.log("Erreur de chargement des données de la première page "+status);
                console.log("Erreur header "+headers);
            });
    });