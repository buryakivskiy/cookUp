import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public lastName: string;

  @Column({ type: 'varchar' })
  public passwordHash: string;

  @Column({ 
    type: 'timestamp with time zone', 
    default: () => 'CURRENT_TIMESTAMP', 
  })
  public readonly createdAt: Date;
}
