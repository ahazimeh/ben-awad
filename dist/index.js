"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = express_1.default();
    app.get('/', (req, res) => {
        res.send('hello');
    });
    app.listen(4000, () => {
        console.log("server started at port 4000");
    });
    const posts = await orm.em.find(Post_1.Post, {});
    console.log(posts);
};
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map