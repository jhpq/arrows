
package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Application extends Controller {

    public static void index() {
        render();
    }
     
    public static void productos() {
        List<Producto> l = Producto.findAll();
        renderJSON(l);
    }
  
   public static void deleteProd(Long id) {
      Producto prod = Producto.findById(id);
      if(prod != null){
          prod.delete();
          renderJSON(id);
      }
      else
        id*=-1;
        renderJSON(id);
    }
  
   public static void saveProd(){
      Gson g = new Gson();
      Producto prod  = g.fromJson(params.get("body"), Producto.class);
      prod.save();
      System.out.println("prod= " + params.get("body"));  
      int x = 8;
      renderJSON(prod);
       
    }
  
  public static void updateProd(Long id){
      Gson g = new Gson();
      Producto prod  = g.fromJson(params.get("body"), Producto.class);
    
      Producto pLocal = Producto.findById(id);
      pLocal.nombre = prod.nombre;
      pLocal.precio = prod.precio;
      pLocal.cantidad = prod.cantidad;
      pLocal.save(); 
      
      renderJSON(pLocal);
       
  }


}
