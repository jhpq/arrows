package models;
 
import java.util.*;
import javax.persistence.*; 
import play.db.jpa.*;
 
@Entity
public class Producto extends Model {
 
    public String nombre;
    public Double precio;
    public int    cantidad;
    
    public Producto(String n, double p, int c) {
        nombre = n;
        precio = p;
      cantidad = c;
    }
 
}