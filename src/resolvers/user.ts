import { User } from './../entities/User';
import { MyContext } from './../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string

    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable:true})
    user?: User
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Ctx() ctx: MyContext
    ) {
        const hashedPassword = await argon2.hash(options.password)
        const user = ctx.em.create(User, {username: options.username, password: hashedPassword})
        await ctx.em.persistAndFlush(user);
        return user;
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<UserResponse> {
        const user = await ctx.em.findOne(User, {username: options.username});
        if(!user)
        return {
            errors: [{
                field: 'username',
                message: 'that username ddoesnt exit'
            }]
        }
        const valid = await argon2.verify(user.password,options.password)
        if(!valid) {
            return {
                errors: [
                    {
                        field:"password",
                        message:"incorrect"
                    }
                ]
            }
        }
        return {user} ;
    }
}