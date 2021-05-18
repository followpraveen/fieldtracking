myApp.service('siteService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/ExecutiveTrackingWeb/";

    this.addSit = function (sit) {
        if (sit.siteId == 0 || sit.siteId == null) {
            return $http({
                method: "POST",
                url: URL + "site/v1/createSite",
                data: JSON.stringify(sit)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: URL + "site/v1/updateSite",
                data: JSON.stringify(sit)
            })
        }
    }

    this.getallSit = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "site/v1/getAllSitesByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }

    this.deleteSit = function (sit) {
        return $http({
            method: "DELETE",
            url: URL + "site/v1/deleteSiteBySiteId/" + sit.siteId
        })
    }
}]);