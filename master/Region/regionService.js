myApp.service('regionService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/ExecutiveTrackingWeb/";

    this.addRegion = function (rags) {
        if (rags.regionId == "" || rags.regionId == null) {
            return $http({
                method: "POST",
                url: URL + "region/v1/createRegion",
                data: JSON.stringify(rags)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: URL + "region/v1/updateRegion",
                data: JSON.stringify(rags)
            })
        }
    }

    this.getallRegion = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "region/v1/getAllRegionsByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }
    this.deleteRegion = function (rags) {
        return $http({
            method: "DELETE",
            url: URL + "region/v1/deleteRegionByRegionId/" + rags.regionId
        })
    }
}]);