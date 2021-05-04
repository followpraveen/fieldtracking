'use strict';

var myApp = angular.module('myApp.region', ['ngRoute', 'ui.bootstrap']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/region', {
        templateUrl: "master/region/region.html",
        controller: 'regionCtrl'
    });
}]);

myApp.controller('regionCtrl', ['$scope', 'regionService', function ($scope, regionService) {


    ////////////////pagination////////////////////


    $scope.pageSize = 2;
    $scope.pageIndex = 1;
    $scope.maxSize = 6;
    $scope.totalItems = 0;
    $scope.numPages = "";
    // $scope.pagesizeSelected="";

    $scope.reason = [];
    getallRegion();
    function getallRegion() {
        $scope.reason = [];
        regionService.getallRegion($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.reason.push({
                    regionId: value.regionId, regionName: value.regionName, regionCode: value.regionCode,
                    description: value.description, location: value.location, createdDate: value.insertedDate,
                    updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
                    updatedBy: value.updatedBy.userName

                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.rags = {
        regionId: "",
        regionName: "",
        regionCode: "",
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
        getallRegion();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallRegion($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    ///////////////end of pagination///////////////////
    // $scope.rags = {
    //     createdBy: {
    //         userId: usId
    //     },
    //     updatedBy: {
    //         userId: usId
    //     },
    //     regionName: "",
    //     regionCode: "",
    //     description: "",
    //     location: "",
    // };

    $scope.editRegion = function (x) {
        $scope.rags.regionId = x.regionId;
        $scope.rags.regionName = x.regionName;
        $scope.rags.description = x.description;
        $scope.rags.regionId = x.regionId;
        $scope.rags.regionCode = x.regionCode;
        $scope.rags.location = x.location;
        console.log($scope.rags);
    }
    $scope.deleteRegion = function () {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                regionService.deleteRegion($scope.rags).then(function () {
                    $scope.pageChange();
                    Swal.fire("Deleted!");
                });
                $scope.loadRegion();
            }
        });


    }
    $scope.clearRegion = function () {
        $scope.rags.regionId = "",
            $scope.rags.regionName = "";
        $scope.rags.description = "";
        $scope.rags.regionId = "";
        $scope.rags.regionCode = "";
        $scope.rags.location = "";
        console.log($scope.rags);
    }
    $scope.addRegion = function () {
        regionService.addRegion($scope.rags).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201 || 200) {
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
            $scope.loadRegion();
        });

    }

    $scope.tabShow = true;

    $scope.closeReg = function () {
        $scope.regpop = false;
    }

    $scope.addReg = function () {
        $scope.regpop = $scope.addregbtn = true; $scope.regedit = $scope.tabShow = $scope.regdelete = false;
    }

    $scope.loadRegion = function () {
        $scope.tabShow = true; $scope.regpop = false;
    }

}]);