import { knex } from "knex";
import { NODE_ENV } from "../config";

const config = require("./knexfile")[NODE_ENV as string];

export default knex(config);
