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

  ////////////////////////////////////// catsuage section ///////////////////////////////////////////////////////

  ////////////////pagination////////////////////


  $scope.pageSize = 2;
  $scope.pageIndex = 0;
  $scope.maxSize = 6;
  $scope.totalItemsC = 0;
  $scope.numPagesC = "";
  // $scope.pagesizeSelected="";


  $scope.cats = {
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
        $scope.totalItemsC = response.data.totalElements;
        $scope.numPagesC = response.data.totalPages;
      });
    });
  }

  $scope.changePageSize = function () {
    $scope.pageIndex = 0;
    getallCat();
  }

  $scope.pageChange = function () {
    $scope.pageIndex = $scope.pageIndex - 1;
    getallCat($scope.pageIndex, $scope.pageSize);
    $scope.pageIndex = $scope.pageIndex + 1;
  }


  ///////////////end of pagination///////////////////
  $scope.cats = {
    createdBy: {
      userId: usId
    },
    updatedBy: {
      userId: usId
    },
    description: "",
    categoryCode: "",
    categoryName: "",
    categoryId: ""
  };

  $scope.editcats = function (x) {
    $scope.cats.categoryName = x.categoryName;
    $scope.cats.description = x.description;
    $scope.cats.categoryId = x.categoryId;
    $scope.cats.categoryCode = x.categoryCode;
    console.log($scope.cats);
  }
  $scope.deleteLang = function () {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        appService.deleteLang($scope.lang).then(function () {
          $scope.pageChange();
          Swal.fire("Deleted!");
        });
        $scope.loadLanguage();
      }
    });


  }
  $scope.clearcats = function () {
    $scope.cats.categoryName = "";
    $scope.cats.description = "";
    $scope.cats.categoryId = "";
    $scope.cats.categoryCode = "";
    console.log($scope.cats);
  }
  $scope.addcats = function () {
    appService.addcats($scope.cats).then(function (response) {
      $scope.pageChange();
      if (response.data.responseCode == 201) {
        swal("Done!", "", "success");
      }
      else {
        swal("Failed!", "", "warning");
      }
      $scope.loadCategory();
    });

  }




  $scope.closeCat = function () {
    $scope.catpop = false;
  }

  $scope.addcat = function () {
    $scope.catpop = $scope.addcatbtn = true; $scope.catedit = $scope.tabShow = catdelete = false;
  }

  $scope.loadCategory = function () {
    $scope.tabShow = true; $scope.catpop = false;
  }

}]);