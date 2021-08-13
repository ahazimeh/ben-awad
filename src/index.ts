import "reflect-metadata";
import { Post } from './entities/Post';
import { __prod__ } from './constants';
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

const main = async () => {
    
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: () => ({ em:orm.em })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.listen(4000, () => {
        console.log("server started at port 4000");
    })
    // const post = orm.em.create(Post, {title: 'my first post'})
    // await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Post, {});
    console.log(posts);
}

main().catch(err => {
    console.error(err)
});

