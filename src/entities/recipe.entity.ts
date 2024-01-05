import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  public name: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'varchar' })
  public ingredients: string;

  @Column({ type: 'varchar' })
  public tagline: string;

  @Column({ type: 'varchar' })
  public imageUrl: string;

  @PrimaryColumn()
  public readonly userId: number;

  @Column({ 
    type: 'timestamp with time zone', 
    default: () => 'CURRENT_TIMESTAMP', 
  })
  public readonly createdAt: Date;
}