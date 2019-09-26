import {Request, Response} from "express";

const bodyParser = require("body-parser");

import * as express from "express"
import {connect} from "mongoose"
import dotenv from "dotenv"
import {resolve} from "path"
import {todoRouter} from "./routes/TodoRoutes";

class App {

    private express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}))
    }

    init() {
        this.initEnvVars();
        this.initDb();
        this.initRoutes();
        this.initMiddlewares();

        this.express.listen(process.env.APP_PORT || 8000, () => console.log('Listening'))
    }

    private initRoutes() {
        this.express.use('/todo', todoRouter)
    }

    private initMiddlewares() {
        this.express.use((err, req: Request, res: Response, next) => {
            if (err) {
                return res.json({
                    message: err.message
                })
            }
        })
    }

    private initEnvVars() {
        dotenv.config({
            path: resolve(__dirname, '..', '.env')
        });
    }

    private async initDb() {
        const {DB_USER, DB_PASS, DB_HOST} = process.env;
        let host = DB_HOST;

        host = host.replace('<dbuser>', DB_USER);
        host = host.replace('<dbpassword>', DB_PASS);

        try {
            await connect(host, {
                useNewUrlParser: false
            })
        } catch (e) {
            console.warn(e)
        }
    }
}

export {App}
