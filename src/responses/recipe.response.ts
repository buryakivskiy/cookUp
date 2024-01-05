import { Exclude, Expose } from 'class-transformer';
import { RecipeEntity } from 'src/entities/recipe.entity';

@Exclude()
export class RecipeResponse {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly description: string;

  @Expose()
  public readonly ingredients: string;

  @Expose()
  public readonly tagline: string;

  @Expose()
  public readonly imageUrl: string;

  @Expose()
  public readonly userId: number;

  @Expose()
  public readonly createdAt: Date;

  constructor(recipe: RecipeEntity) {
    Object.assign(this, recipe);
  }
}