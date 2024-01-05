import { Entity, PrimaryColumn } from 'typeorm';

@Entity('UserRecipes')
export class UserRecipesEntity {
  @PrimaryColumn()
  public readonly recipeId: number;

  @PrimaryColumn()
  public readonly userId: number;
}