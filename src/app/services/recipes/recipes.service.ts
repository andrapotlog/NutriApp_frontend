import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeModel } from './recipes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {}

  getRecipes(uid: number, meal: string): Observable<RecipeModel[]> {
    const options = {
      params: {
        uid: uid,
        meal: meal,
      },
    };

    return this.http.get<RecipeModel[]>(
      'http://localhost:8000/getRecipes',
      options
    );
  }
}
