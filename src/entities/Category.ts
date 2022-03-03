import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@Entity('categories')
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 255 })
  @Field()
  name: string;
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}
