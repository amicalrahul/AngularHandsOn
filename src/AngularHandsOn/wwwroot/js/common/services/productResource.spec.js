
describe("productResource", function () {

    var product = {
        "productId": "1", "productCode": "GDN-0011", "productName": "Leaf Rake", "releaseDate": "March 19, 2009",
        "description": "Leaf rake with 48-inch wooden handle.", "price": 19.95, "cost": 9.0, "starRating": 3.2,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png", "tags": ["leaf", " tool"]
    };

    beforeEach(function () {
        bard.appModule('bookapp');
        bard.inject(this, '$http', '$httpBackend', '$q', 'productResource', '$rootScope');
    });
    it("exist", function () {
        //console.log(angular.mock.dump(productResource));
        expect(productResource).to.exist;
    });
    it('should return all products on get request', function () {
        $httpBackend.expectGET('/api/home1/Products')
			.respond(200);
        productResource.get();
        expect($httpBackend.flush).not.to.throw();
    });
    it('should return product on get request by productId', function () {
        var response;
        $httpBackend.expectGET('/api/home1/Products/1')
			.respond(200, product);
        productResource.get({ productId: 1 }).$promise
			.then(function (data) {
			    response = data;
			});

        $httpBackend.flush();

        expect(angular.toJson(response).description).to.equal(angular.toJson(product).description);
    });
    it('should save product', function () {
        var expectedData = { "productId": "1", "description": "Leaf rake with 48-inch wooden handle." };

        $httpBackend.expectPOST(/./, expectedData)
			.respond(201);
        var product = new productResource({
            productId: '1',
            description: 'Leaf rake with 48-inch wooden handle.'
        });
        product.$save();

        expect($httpBackend.flush).not.to.throw();
    });
    it('should update product', function () {
        var response;
        $httpBackend.expectPUT('/api/home1/Products')
			.respond(200, product);
        var product = new productResource({
            productId: '1',
            description: 'Leaf rake with 48-inch wooden handle.'
        });
        product.$update();

        expect($httpBackend.flush).not.to.throw();
    });
});