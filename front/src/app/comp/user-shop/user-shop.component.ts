import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { CartItemService } from 'src/app/services/cartitem.service';
import { SessionService } from 'src/app/services/session.service';
import { CartItem } from 'src/app/models/cartitem';

@Component({
  selector: 'app-user-shop',
  templateUrl: './user-shop.component.html',
  styleUrls: ['./user-shop.component.css']
})
export class UserShopComponent implements OnInit {

  allCategories: Category[] = [];
  selectedCategory: number = null;
  allProducts: Product[] = [];
  activecartid: number = null;
  cartItems: any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartItemService: CartItemService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    this.getAllProducts();

    this.sessionService.getSession().subscribe(data => {
      this.sessionService.mySessionEmitter.emit(data);
      console.log(data);
      this.activecartid = data.activecartid;
      console.log(this.activecartid);
      this.getCartItemsByCartID(this.activecartid);
    }, (err: HttpErrorResponse) => {
      console.error(err);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });

    console.log(this.activecartid);
    

    

    this.sessionService.mySessionEmitter.subscribe(data => {
      this.activecartid = data.activecartid;
    });

    this.categoryService.myCategoryEmitter.subscribe(data => {
      if (data == "update") {
        this.getAllProducts();
      }
    });

    this.productService.myProductEmitter.subscribe(data => {
      if (data == "update") {
        this.getAllProducts();
      }
    });
  }

  getAllProducts(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.allCategories = data;
      this.selectedCategory = data[0].id || null;
      this.handleChange();
    }, (err: HttpErrorResponse) => {
      console.error(err);
      if (err.error.sqlMessage) return alert(err.error.sqlMessage);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });
  }

  handleChange(): void {
    this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
      this.allProducts = data;
    }, (err: HttpErrorResponse) => {
      console.error(err);
      if (err.error.sqlMessage) return alert(err.error.sqlMessage);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });
  }

  addCartItem(product: Product): void {
    let quantity = 0;
    quantity = Number(prompt('Quantity:', '1'));
    while (quantity <= 0 || quantity % 1 != 0 || isNaN(quantity)) {
      quantity = Number(prompt('Invalid quantity. Please enter an integer:', '1'));
    };
    this.cartItemService.addCartItem({ productid: product.id, quantity: quantity, unitprice: product.price }).subscribe(data => {
      console.log(data);
      alert(data.info);
      return this.getCartItemsByCartID(this.activecartid);
    }, (err: HttpErrorResponse) => {
      console.error(err);
      if (err.error.sqlMessage) return alert(err.error.sqlMessage);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });
  }

  getCartItemsByCartID(cartid: number) {
    console.log('getCartItemsByCartID');
    this.cartItemService.getCartItemsByCartID(cartid).subscribe(data => {
      this.cartItems = data;
      this.cartItems.forEach(cartItem => {
        this.productService.getProductByID(cartItem.productid).subscribe(data => cartItem.productname = data[0].name, (err: HttpErrorResponse) => {
          console.error(err);
          if (err.error.sqlMessage) return alert(err.error.sqlMessage);
          return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
        });
      });
    }, (err: HttpErrorResponse) => {
      console.error(err);
      if (err.error.sqlMessage) return alert(err.error.sqlMessage);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });
  }

  deleteCartItem(id: number) {
    this.cartItemService.deleteCartItem(id).subscribe(data => {
      console.log(data);
      alert(data.info);
      return this.getCartItemsByCartID(this.activecartid);
    }, (err: HttpErrorResponse) => {
      console.error(err);
      if (err.error.sqlMessage) return alert(err.error.sqlMessage);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });
  }

  ngOnDestroy(): void {
    this.productService.myProductEmitter.unsubscribe();
  }

}
