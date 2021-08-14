import { Session, SessionData } from 'express-session';
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";

export type MyContext {
    em:EntityManager<IDatabaseDriver<Connection>>;
    req: Request & {session:Session & Partial<SessionData>};
    res: Response;
}