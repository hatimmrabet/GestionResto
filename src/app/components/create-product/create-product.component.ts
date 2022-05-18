import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ThisReceiver } from '@angular/compiler';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categorie } from 'src/app/models/Categorie.model';
import { IngredientsService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  form: FormGroup;
  alert = { type: '', message: '' };

  categories: string[];
  filteredCategories: Observable<string[]>;

  ingredients: string[] = [];
  allIngred: string[] = [];
  filteredIngred: Observable<string[]>;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoIngredients') matAutoIngredients: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private ProductsService: ProductsService,
    private categoriesService: CategoriesService,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      ingredients: ['', []],
    });

    // recuperer les categories
    this.categoriesService.getCategories().subscribe(
      (res) => {
        // console.log(res);
        this.categories = res.map((categorie) => categorie.name);

        // activer le filtrage des inputs
        this.filteredCategories = this.form.get('categorie')!!.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(this.categories, value))
        );
      }
    );

    // recuperer les ingredients
    this.ingredientsService.getIngredients().subscribe(
      (res) => {
        // console.log(res);
        this.allIngred = res.map((ingredient) => ingredient.name);

        this.filteredIngred = this.form.get('ingredients')!!.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) =>
              fruit ? this._filter(this.allIngred, fruit) : this.allIngred.slice()
            )
          );
      }
    );
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    this.form.value.ingredients = this.ingredients;
    console.log(this.form.value);
    this.ProductsService.createProduct(this.form.value).subscribe(
      (res) => {
        console.log(res);
        this.alert.type = 'success';
        this.alert.message = 'Product created successfully';
      },
      (err) => {
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
    this.fruitInput.nativeElement.value = '';
    this.form.get('ingredients')!!.setValue(null);
  }

  private _filter(list: string[], value: string): string[] {
    return list.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }
}
