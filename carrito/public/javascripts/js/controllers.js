'use strict';

/* Controllers */




var Ctrl2 = function ($scope, $http, testService, mySharedService, $resource)
{

	$scope.total = 0;
	$scope.iva = 0;
	$scope.gtotal = 0;
	$scope.items = 0;
	$scope.flete = 100;
	$scope.desc=0;
	$scope.mensaje="";
	$scope.productos = [];
  
  /*-------------------------------------------------------------------------*/
  var Productos = $resource('/productos/:id', 
                            {id: '@id'},
                            {
                              del: {method: 'delete', isArray: false},
                              upd: {method: 'put', isArray: false}
                            }
                           );
  
  /*-------------------------agregar-------------------------------*/
  
  
 $scope.prod = new Productos();
  
  
 $scope.agregar = function(){
    
       $scope.prod.$save(function(){
       $scope.prod = new Productos();
      });
    
      
  } 
/*-------------------------------update---------------------------*/
  
  
   $scope.actualizar = function(p){
    p.$upd(function(){
      console.log(p);
       $scope.p = new Productos();
      });
  }

/*------------------------------delete---------------------------*/  
  
  
  $scope.borrar = function(p, i){
   
    p.$del(function(){
     $scope.productos.splice(i, 1)
    
    });
  
  }
  
 
  
  

/*  $http.get("http://squaryshiz-24830.sae1.actionbox.io:9000/productos").success(function(data)
		{
      
			$scope.productos = data;
			
			//$scope.contar();
			//$scope.n=data.length;
			//console.log($scope.productos.length);
			$scope.totalizar();
      mySharedService.prepForBroadcast($scope.productos.length);
			
		});*/
  
  
//Cargar Productos
  Productos.query(function(data){
    $scope.productos = data;
    mySharedService.prepForBroadcast($scope.productos.length);
    $scope.totalizar();
    //console.log("Productos del server");
    //console.log(data);
  });



$scope.totalizar = function() {
	     $scope.total = 0;
	     $scope.subtotal = 0;
	     $scope.iva=0;
	     $scope.flete=0;
	     $scope.cantTotal = 0;
	     $scope.descTotal=0;


	    
	     angular.forEach($scope.productos, function(producto) {

	     $scope.subtotal += producto.importe  = producto.cantidad * producto.precio;
	     $scope.iva += producto.iva = producto.importe * .16;
	     $scope.total += producto.importe * 1.16;
	     $scope.cantTotal+= producto.cantidad;

	     if(producto.cantidad == 0){
	  
	     		 producto.selected = true
	  	  }
	     else {
	     		producto.selected= false;
 		  }


		//DESCUENTO

	    if(producto.cantidad > 10){

	     	producto.descuento = producto.importe * .05;
	     	$scope.total = $scope.total - producto.descuento;
  		}
	     else {
	     	producto.descuento = 0;	
		}

	   
	     	//FLETE
	     if($scope.cantTotal > 0 && $scope.cantTotal <= 10){
	     	$scope.flete = 100;
	     }
	     else if($scope.cantTotal>=11 && $scope.cantTotal <= 20){
	     	$scope.flete = 200;
			
	     }
	     else if($scope.cantTotal >= 21 && $scope.cantTotal <= 30){
	     	$scope.flete = 300;
			
	     }
	     else if($scope.cantTotal>=31){
	     	$scope.flete = 400;
	     }
	     else{
	     	$scope.flete = 0;
	     	
	     }
	     	
	    	//DESCUENTO TOTAL

	    if($scope.productos.length >= 10 ){
	    	
	    	$scope.descTotal = ($scope.total * .05).toFixed(2);	    	
	    	
	    }	
	    
		else {
	    	$scope.descTotal = 0;
		}
         //Mensaje de advertencia
    if ($scope.cantTotal < 5) {

    	$scope.mensaje="Nota: No se hacen envios en menos de 5 productos";
    }

    else $scope.mensaje="";


	    });
		$scope.total = $scope.total + $scope.flete;
		$scope.total = ($scope.total - $scope.descTotal).toFixed(2);
		$scope.registros = $scope.productos.length;
}

  $scope.msg = function()
  {
    mySharedService.prepForBroadcast($scope.productos.length);

    console.log("New msg");
  }
  
//LLAMAR A TOTALIZAR
  $scope.totalizar();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//AÑADIR NUEVO ELEMENTO A LA LISTA
	$scope.add = function(){
    /*$scope.prod.precio = $scope.prod.precioI ; 
    $scope.prod.cantidad = $scope.prod.cantidadI;
    $scope.prod.nombre = $scope.prod.nombreI ;*/
    if( $scope.prod.precio > 0 && $scope.prod.cantidad > 0 && $scope.prod.nombre != null){
      
    
		$scope.prod.selected = false;
		$scope.prod.importe = $scope.prod.cantidad * $scope.prod.precio
		$scope.productos.push($scope.prod);
    $scope.agregar(); 
    $scope.totalizar(); 
    mySharedService.prepForBroadcast($scope.productos.length);  
    
		$scope.prod.importe =0;
	  $scope.prod.cantidad = 0;
	  $scope.prod.precio = 0;
      }    
  
	}
 
$scope.update = function() {
		var oldTodos = $scope.productos;
		$scope.productos = [];
    
    angular.forEach(oldTodos, function(prod) {
      if (!prod.selected) {
        $scope.actualizar(prod);
        $scope.productos.push(prod);
       
      }
      else{
        $scope.borrar(prod);
      }
	  });

		$scope.totalizar();
    mySharedService.prepForBroadcast($scope.productos.length); 
   };}



var shoping = function($scope, mySharedService)
{
  $scope.$on('handleBroadcast', function() {
        $scope.msg = mySharedService.msg;
    }); 

}

angular.module('myApp.controllers', ['ngResource']).
controller('MyCtrl1', [function() { }]).controller('MyCtrl2', Ctrl2).controller('shoping', shoping);