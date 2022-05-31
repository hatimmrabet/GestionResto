import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  id: string;
  sub: any;
  loading = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  form: FormGroup;
  alert = { type: '', message: '' };
  addImage = false;

  categories: string[];
  filteredCategories: Observable<string[]>;

  ingredients: string[] = [];
  allIngred: string[] = [];
  filteredIngred: Observable<string[]>;

  // l'image selectionné
  selectedImage: File;

  @ViewChild('ingreInput') ingreInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoIngredients') matAutoIngredients: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private ProductsService: ProductsService,
    private categoriesService: CategoriesService,
    private ingredientsService: IngredientsService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // afficher message d'alerte s'il y en a un
    if (localStorage.getItem('alert')) {
      this.alert = JSON.parse(localStorage.getItem('alert')!!);
      localStorage.removeItem('alert');
    }
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id')!!;
    });

    this.ProductsService.getProduct(this.id).subscribe(
      (res) => {
        res.ingredients.forEach((ingredient) => {
          this.ingredients.push(ingredient.name);
        });
        this.form = this.formBuilder.group({
          name: [res.name, Validators.required],
          description: [res.description, Validators.required],
          price: [res.price, Validators.required],
          categorie: [res.categorie.name, Validators.required],
          ingredients: ['',[]],
          image: ['',[]],
        });
        // this.ingredients = res.ingredients;
        // this.selectedImage = res.image;
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );

    // recuperer les categories
    this.categoriesService.getCategories().subscribe((res) => {
      // console.log(res);
      this.categories = res.map((categorie) => categorie.name);

      // activer le filtrage des inputs
      this.filteredCategories = this.form.get('categorie')!!.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(this.categories, value))
      );
    });

    // recuperer les ingredients
    this.ingredientsService.getIngredients().subscribe((res) => {
      // console.log(res);
      this.allIngred = res.map((ingredient) => ingredient.name);

      this.filteredIngred = this.form.get('ingredients')!!.valueChanges.pipe(
        startWith(null),
        map((ingre: string | null) =>
          ingre ? this._filter(this.allIngred, ingre) : this.allIngred.slice()
        )
      );
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    this.form.value.ingredients = this.ingredients;
    // console.log(this.form.value);
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('image', this.selectedImage);
    formData.append('categorie', this.form.value.categorie);
    formData.append('ingredients', this.form.value.ingredients);

    console.log(this.selectedImage)
    console.log(formData.get('image'));
    // console.log(formData.getAll);

    this.ProductsService.editProduct(this.id, formData).subscribe(
      (res: any) => {
        // console.log(res);
        // preparer message d'alerte
        this.alert.type = 'success';
        this.alert.message = res.response;
        // enregistrer en localStorage
        localStorage.setItem('alert', JSON.stringify(this.alert));
        // reload page
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        this.alert.type = 'danger';
        this.alert.message = err.error.message;
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      const isOptionSelected = this.matAutoIngredients.options.some(
        (option) => option.selected
      );
      if (!isOptionSelected) {
        this.ingredients.push(value.trim());
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.form.get('ingredients')!!.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.ingredients.indexOf(fruit);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.ingreInput.nativeElement.value = '';
    this.form.get('ingredients')!!.setValue(null);
  }

  private _filter(list: string[], value: string): string[] {
    return list.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
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
