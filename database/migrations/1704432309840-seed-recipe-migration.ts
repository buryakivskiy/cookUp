import { RecipeEntity } from 'src/entities/recipe.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecipeSeeds1704432309840 implements MigrationInterface {
  private recipeEntities: RecipeEntity[] = [
    {
        id: 1,
        name: 'Борщ',
        description: 'Борщ — це кулінарний шедевр, що втілює в собі українську традицію та багатство смаку. Приготування борщу — це справжнє мистецтво, але ми поділимося з вами детальним рецептом крок за кроком...\n(залиште текст опису тут)',
        ingredients: 'Свиняча шия або кістка, буряки, картопля, цибуля, морква, капуста, томатна паста, часник, сіль, перець, лавровий лист',
        tagline: 'Неперевершено смачний борщ',
        imageUrl: 'https://example.com/borsch.jpg',
        userId: 13,
        createdAt: new Date(),
      },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository =
      queryRunner.connection.getRepository(RecipeEntity);
    await repository.insert(this.recipeEntities);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const entityIds: number[] = this.recipeEntities.map((entity) => entity.id);
    const repository =
      queryRunner.connection.getRepository(RecipeEntity);
    await repository.delete(entityIds);
  }
}