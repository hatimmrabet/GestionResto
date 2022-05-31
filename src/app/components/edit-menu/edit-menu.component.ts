import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { MenusService } from 'src/app/services/menus.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
})
export class EditMenuComponent implements OnInit {
  form: FormGroup;
  alert = { type: '', message: '' };
  products: Product[] = [];
  selectedImage: File;
  productsByCategory: Record<string, Product[]>;
  id: string;
  loading = true;
  addImage = false;

  constructor(
    private formBuilder: FormBuilder,
    private ProductService: ProductsService,
    private MenuService: MenusService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // afficher message d'alerte s'il y en a un
    if (localStorage.getItem('alert')) {
      this.alert = JSON.parse(localStorage.getItem('alert')!!);
      localStorage.removeItem('alert');
    }
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id')!!;
    });
    this.MenuService.getMenu(this.id).subscribe((res) => {
      // console.log(res);
      var products_id = res.produits.map((product) => product.id);
      this.form = this.formBuilder.group({
        name: [res.name, [Validators.required]],
        description: [res.description, [Validators.required]],
        price: [res.price, [Validators.required, Validators.min(0)]],
        image: ['',[]],
        produits: [products_id, [Validators.required]],
      });
      this.loading = false;
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
    // console.log(this.form.value);
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('image', this.selectedImage);
    formData.append('produits', this.form.value.produits);

    this.MenuService.editMenu(this.id,formData).subscribe(
      (res) => {
        console.log(res);
        // preparer message d'alerte
        this.alert.type = 'success';
        this.alert.message = res.response;
        // enregistrer en localStorage
        localStorage.setItem('alert', JSON.stringify(this.alert));
        // reload page
        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.alert.type = 'danger';
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

  changeAddImage() {
    this.addImage = !this.addImage;
  }
}
