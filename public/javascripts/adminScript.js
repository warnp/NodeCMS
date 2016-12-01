/**
 * Created by romain on 24/07/2014.
 */

var adminApp = angular.module('adminApp', []);

adminApp.controller("ArticleList", function($scope){
    $scope.articles = $.get("")
})