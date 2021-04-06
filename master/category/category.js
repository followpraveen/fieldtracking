'use strict';

var myApp = angular.module('myApp.category', ['ngRoute']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
  $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/category', {
    templateUrl: "master/category/category.html",
    controller: 'categoryCtrl'
  });
}]);

myApp.controller('categoryCtrl', ['$scope', 'categoryService', function ($scope, categoryService) {

  ////////////////////////////////////// language section ///////////////////////////////////////////////////////

  ////////////////pagination////////////////////


  // $scope.pageSize=2;
  // $scope.pageIndex=0;
  // $scope.maxSize=6;
  // $scope.totalItemsL=0;
  // $scope.numPagesL="";
  // // $scope.pagesizeSelected="";


  $scope.cat = {
    categoryName: "",
    categoryCode: "",
    description: "",
    createdBy:
    {
      userId: usId
    }
  }

  function creatSite() {
    categoryService.creatSite($scope.cat).then(function (response) {
      console.log(response)
    })

  }
  creatSite()

}]);