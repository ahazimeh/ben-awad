import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
// Using Entity Constructors enit
@ObjectType()
@Entity()
export class User  {
    @Field(() => Int)//expose for type graphql schema
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type: 'date'})
    createdAt = new Date();

    @Field(() => String)
    @Property({type: 'date', onUpdate: () =>new Date() })
    updatedAt = new Date();

    @Field()
    @Property({type: 'text', unique: true})
    username!: string;

    @Property({type: 'text'})
    password!: string;

}