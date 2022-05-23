import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { MenusService } from 'src/app/services/menus.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss'],
})
export class CreateMenuComponent implements OnInit {
  form: FormGroup;
  alert = { type: '', message: '' };
  products: Product[] = [];
  selectedImage: File;
  productsByCategory: Record<string, Product[]>;

  constructor(
    private formBuilder: FormBuilder,
    private ProductService: ProductsService,
    private MenuService: MenusService
  ) {}

  ngOnInit(): void {
    // afficher message d'alerte s'il y en a un
    if (localStorage.getItem('alert')) {
      this.alert = JSON.parse(localStorage.getItem('alert')!!);
      localStorage.removeItem('alert');
    }

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]],
      produits: ['', [Validators.required]],
    });

    // get products by categories
    this.ProductService.getProductsGroupByCategories().subscribe((res) => {
      this.productsByCategory = res;
      // console.log(this.productsByCategory);
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    console.log(this.form.value);
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('image', this.selectedImage);
    formData.append('produits', this.form.value.produits);

    this.MenuService.createMenu(formData).subscribe(
      (res) => {
        // console.log(res);
        // preparer message d'alerte
        this.alert.type = 'success';
        this.alert.message = 'Menu created successfully';
        // enregistrer en localStorage
        localStorage.setItem('alert', JSON.stringify(this.alert));
        // reload page
        window.location.reload();
      },
      (err) => {
        this.alert.type = 'danger';
        console.log(err);
        this.alert.message = err.error.response;
        // enregistrer en localStorage
        localStorage.setItem('alert', JSON.stringify(this.alert));
      }
    );
  }

  selectFile(event: any): void {
    this.selectedImage = event.target.files[0];
    // console.log(this.selectedImage);
  }
}
