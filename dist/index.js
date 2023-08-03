"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Import
require('dotenv').config({ path: './env/dev.env' });
//require('module-alias/register')
const server_1 = __importDefault(require("./server"));
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@util', __dirname + "src/api/v1/util");
moduleAlias.addAlias('@config', __dirname + "src/config");
//Declare
//PORT 
const PORT = process.env.PORT_NUMBER || 5000;
server_1.default.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Listening on port: ${PORT}`);
});
//# sourceMappingURL=index.js.map