//Esteban Morales
//G00294816
//Prof.Raquel Lugo
//COMP2025

//Se llama el modulo de angular y se le da nombre de Bagua.
angular.module('Bagua', ['ui.router' , 'ngResource'])

//Esta es la configuracion de la aplicacion. Controla las rutas y la paginas que puede llamar la data.
.config(Config)

//Esto son los servicios para conectarse a la data. La data esta en JSON en los public files.
.factory('NotiLista', NotiLista)
.factory('AnimalPics', AnimalPics)
.factory('ListaBlog', ListaBlog)
.factory('ListaVideo', ListaVideo)

//Este es el controlador de la aplicacion. Controla todos los funcionamientos de la data utilizada de los servicios. 
.controller('inicioController', inicioController)

////////////////////////Esta es la funcion de la configuracion de angular//////////////////////////////////////////
Config.$inject = ['$urlRouterProvider', '$stateProvider', '$sceDelegateProvider', '$resourceProvider'];
function Config($urlRouterProvider, $stateProvider, $sceDelegateProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;

    //La lista de paginas que se pueden acceder desde afuera del servidor. 
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://www*.youtube.com/**'
    ]);
    //Las rutas de la pagina. 
    $stateProvider
    .state('tabs', {
        url: '/tab',
        abstract:true,
        templateUrl:'Views/tabs.html'
    })
    .state('tabs.inicio', {
            url: '/inicio',
            views: {
                'tab-view':{
                templateUrl: 'Views/inicio.html',
                controller: 'inicioController',
                controllerAs:'inicio'
                }
               }
    })
        .state('tabs.blog', {
        url: '/blog',
        views: {
            'tab-view': {
                templateUrl: 'Views/blog.html',
                controller: 'inicioController',
                controllerAs: 'inicio'
            }
        }
    })
        .state('tabs.formulario', {
        url: '/formulario',
        views: {
            'tab-view': {
                templateUrl: 'Views/formulario.html',
                controller: 'inicioController',
                controllerAs: 'inicio'

            }
        }
    })
        .state('tabs.acerca', {
        url: '/acerca',
        views: {
            'tab-view': {
                templateUrl: 'Views/acerca.html',
                controller: 'inicioController',
                controllerAs:'inicio'
            }
        }
    })
        .state('tabs.videos', {
        url: '/videos',
        views: {
            'tab-view': {
                templateUrl: 'Views/videos.html',
                controller: 'inicioController',
                controllerAs:'inicio'
            }
        }
    })
    ;
    $urlRouterProvider.otherwise('/tab/inicio')
}


//////////////////////////////////////////////////////////////////
//La funcion de los servicios. Cada uno de estos se conecta a diferentes archivos .JSON para recuperar la data. 
AnimalPics.$inject = ['$resource'];
function AnimalPics($resource) {    //Fotos se van a editar en la computadora. Hay que bajarlas y editarlas para que todos sean igual de height y width
    return $resource('files/animalPics.json', null, {
        getAnimal: { method: 'GET', isArray: true }
    });
}

NotiLista.$inject = ['$resource'];
function NotiLista($resource) {
    return $resource('files/noticias.json', null, {
        getNoticias: { method: 'GET', isArray: true }
    });
}

ListaBlog.$inject = ['$resource'];
function ListaBlog($resource) {
    return $resource('files/blog.json', null, {
        getBlog: { method: 'GET', isArray:true }
    });
}

ListaVideo.$inject = ['$resource'];
function ListaVideo($resource) {
    return $resource('files/videos.json', null, {
        getVideos: { method: 'GET', isArray: true }
    });
}

/////////////////////////////////////////////////////////////////
//controla la data a utilizar en la aplicacion. 
inicioController.$inject = ['NotiLista', 'AnimalPics', 'ListaBlog', 'ListaVideo', '$stateParams'];
function inicioController(NotiLista, AnimalPics, ListaBlog, ListaVideo, $stateParams) {
    //llama al servicio en donde esta la data de las noticias y lo pone en una variable notiLista
    //en la pagina despliega la variable notiLista
    var scope = this;
    scope.notiLista = NotiLista.getNoticias();
    scope.animalPics = AnimalPics.getAnimal();
    scope.listaBlog = ListaBlog.getBlog();
    scope.listaVideo = ListaVideo.getVideos();
    scope.videoIndex = -1;
    scope.GetVideoIndex = GetVideoIndex;

    ///////////////////////////////////////////////////////
    //Esta es la funcion para validar del formulario de registro del formulario.html
    scope.Validar = function () {
        //TODO:
        alert('Se registro');
    };
;
    /////////////////////////////////////////////
    //Funcion para recuperar el index utilizado en la lista de videos. Esto hace posible utilizar el index elegido en la lista de videos.
    function GetVideoIndex(index) {
        scope.videoIndex = index;
    };

    $('#video').on('hidden.bs.modal', function (e) {
        var url = $('#videoIframe').attr('src');
        
        $('#videoIframe').attr('src', '');
        
        $('#videoIframe').attr('src', url);
    });
}

//Uso personal, manera larga de recuperar informacion

//$http({
//    method: 'GET',
//    url: 'files/blog.json'
//}).then(function successCallback(response) {
//    // this callback will be called asynchronously
//    // when the response is available
//    scope.listaBlog = response.data;
//}, function errorCallback(response) {
//    // called asynchronously if an error occurs
//    // or server returns response with an error status.
//    console.log('fallo');
//});
