'use strict';

var myApp=angular.module('myApp.category', ['ngRoute']);
// var tkn=localStorage.getItem("token");
// var usId=localStorage.getItem("userId");
// console.log(tkn);
// myApp.run(function($http) {
//     $http.defaults.headers.common.Authorization=tkn;
// });

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/category', {
      templateUrl:"master/category/category.html",
      controller: 'categoryCtrl'
    });
  }]);
  
  myApp.controller('categoryCtrl', ['$scope',function($scope) {
  window.alert('hi')
  }])