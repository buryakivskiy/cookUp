import { Exclude, Expose } from 'class-transformer';
import { RecipeEntity } from 'src/entities/recipe.entity';
import { RecipeResponse } from './recipe.response';

@Exclude()
export class RecipesResponse {
  @Expose()
  public readonly recipes: RecipeResponse[];

  constructor(recipes: RecipeEntity[]) {
    this.recipes =
    recipes && recipes.map((recipe) => new RecipeResponse(recipe));
  }
}
