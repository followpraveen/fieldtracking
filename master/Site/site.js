'use strict';

var myApp = angular.module('myApp.site', ['ngRoute', 'ui.bootstrap']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/site', {
        templateUrl: "master/site/site.html",
        controller: 'siteCtrl'
    });
}]);

myApp.controller('siteCtrl', ['$scope', 'siteService', function ($scope, siteService) {


    ////////////////pagination////////////////////


    $scope.pageSize = 2;
    $scope.pageIndex = 0;
    $scope.maxSize = 6;
    $scope.totalItems = 0;
    $scope.numPages = "";
    // $scope.pagesizeSelected="";

    $scope.site = [];
    getallSit();
    function getallSit() {
        $scope.site = [];
        siteService.getallSit($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.site.push({
                    siteId: value.siteId, siteName: value.siteName, siteCode: value.siteCode,
                    description: value.description, location: value.location, createdDate: value.insertedDate,
                    updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
                    // updatedBy: value.updatedBy.userName
                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.sit = {
        siteId: "",
        siteName: "",
        siteCode: "",
        description: "",
        location: "",
        createdBy:
        {
            userId: usId
        },
        updatedBy: {
            userId: usId
        }
    };

    $scope.changePageSize = function () {
        $scope.pageIndex = 0;
        getallSit();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallSit($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    ///////////////end of pagination///////////////////
    // $scope.sit = {
    //     createdBy: {
    //         userId: usId
    //     },
    //     updatedBy: {
    //         userId: usId
    //     },
    //     description: "",
    //     // categoryCode: "",
    //     siteName: "",
    //     siteId: ""
    // };

    $scope.editSit = function (x) {
        $scope.sit.siteId = x.siteId;
        $scope.sit.siteName = x.siteName;
        $scope.sit.siteCode = x.siteCode;
        $scope.sit.description = x.description;
        $scope.sit.location = x.location;
        console.log($scope.sit);
    }
    $scope.deleteSit = function () {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                siteService.deleteSit($scope.sit).then(function () {
                    $scope.pageChange();
                    Swal.fire("Deleted!");
                });
                $scope.loadSit();
            }
        });


    }
    $scope.clearSit = function () {
        $scope.sit.siteName = "";
        $scope.sit.siteCode = "";
        $scope.sit.description = "";
        $scope.sit.siteId = "";
        $scope.sit.location = "";
        console.log($scope.sit);
    }
    $scope.addSit = function () {
        siteService.addSit($scope.sit).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Done!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else {
                swal("Failed!", "", "warning");
            }
            $scope.loadSit();
        });

    }

    $scope.siteShow = true;

    $scope.closeSitz = function () {
        $scope.sitepop = false;
    }

    $scope.addSitz = function () {
        $scope.sitepop = $scope.addsitebtn = true; $scope.siteedit = $scope.siteShow = $scope.sitedelete = false;
    }

    $scope.loadSit = function () {
        $scope.siteShow = true; $scope.sitepop = false;
    }

}]);