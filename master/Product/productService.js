myApp.service('productService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/ExecutiveTrackingWeb/";

    this.addProduct = function (pro) {
        if (pro.productId == "" || pro.productId == null) {
            return $http({
                method: "POST",
                url: URL + "product/v1/createProduct",
                data: JSON.stringify(pro)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: URL + "product/v1/updateProduct",
                data: JSON.stringify(pro)
            })
        }
    }

    this.getallProduct = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "product/v1/getAllProductsByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }

    this.deleteProduct = function (x) {
        return $http({
            method: "DELETE",
            url: URL + "product/v1/deleteProductByProductId/" + x
        })
    }
}]);