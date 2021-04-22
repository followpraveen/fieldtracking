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


  $scope.pageSize = 2;
  $scope.pageIndex = 0;
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

  $scope.categ = [];
  getallCat();
  function getallCat() {
    $scope.categ = [];
    categoryService.getallCat($scope.pageIndex, $scope.pageSize).then(function (response) {
      console.log(response.data.content);
      angular.forEach(response.data.content, function (value) {
        $scope.categ.push({
          categoryId: value.categoryId, categoryName: value.categoryName, categoryCode: value.categoryCode, description: value.description,
          createdDate: value.insertedDate, updatedDate: value.updatedDate, createdBy: value.createdBy.userName
        });
        $scope.totalItemsL = response.data.totalElements;
        $scope.numPagesL = response.data.totalPages;
      });
    });
  }






  $scope.closeCat = function () {
    $scope.catpop = false;
  }

  $scope.addcate = function () {
    $scope.catpop = $scope.addcatbtn = true; $scope.catedit = false
  }

  $scope.loadCat = function () {
    $scope.catpop = false
  }

}]);