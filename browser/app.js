var app = angular.module('stackathon', [])

app.controller('StackCtrl', function($scope, StackFactory){
    $scope.logTenIn = function(){
        StackFactory.logTenIn()
        .then(function(sucess){
            console.log('Successfully Logged Ten In');
        }).catch(console.error.bind(console));

    }
    

})


app.factory('StackFactory', function($http){
    return {
        logTenIn: function(){
            return $http.post('/logTenIn');
        }
    }
})