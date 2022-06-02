import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/Categorie.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
})
export class AllCategoriesComponent implements OnInit {

  newCat: Categorie = new Categorie();
  categories: Categorie[] = [];
  alert: { type: string; message: string } = { type: '', message: '' };

  constructor(private categorieService: CategoriesService) {}

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      });
  }

  createCategory(categorie: Categorie) {
    this.categorieService.createCategory(categorie).subscribe(
      (categorie: Categorie) => {
        // console.log(categorie);
        this.categories.push(categorie);
        this.alert = { type: 'success', message: 'Categorie created' };
        this.newCat = new Categorie();
      },
      (error) => {
        this.alert = { type: 'danger', message: error.error.response };
      }
    );
  }

  editCategory(Categorie: Categorie) {
    // console.log(Categorie);
    this.categorieService.updateCategory(Categorie).subscribe(
      (res) => {
      this.alert = {
        type: 'success',
        message: res.response,
      };
    });
  }

  deleteCategory(categorie: Categorie) {
    this.categorieService.deleteCategory(categorie).subscribe(
      (res) => {
        this.categories = this.categories.filter((ing) => ing !== categorie);
        this.alert = { type: 'success', message: res.response };
      },
      (error) => {
        this.alert = { type: 'danger', message: error.error.response };
        // console.log(error);
      }
    );
  }
}
