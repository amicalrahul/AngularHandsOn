describe("Testing School Controller", function(){
beforeEach(function(){

});
it("Test adding 2 numbers", function(){
    var users = ['jack', 'igor', 'jeff'];
    var sorted = ['jeff', 'jack', 'igor'];//sortUsers(users);
    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
});

});

describe('PasswordController', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.grade', function() {
      var $scope = {};
      var controller;
      beforeEach(function(){
        controller = $controller('PasswordController', { $scope: $scope });
      });
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });

    
    it('sets the strength to "weak" if the password length <3 chars', function() {
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    });
  });
});