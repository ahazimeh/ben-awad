import { Post } from './entities/Post';
import { __prod__ } from './constants';
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";

const main = async () => {
    
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express();
    app.get('/', (req, res) => {
        res.send('hello');
    })
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

