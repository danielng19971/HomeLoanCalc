"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Import
require('dotenv').config({ path: './env/dev.env' });
const server_1 = __importDefault(require("./server"));
//PORT 
const PORT = process.env.PORT_NUMBER || 5000;
server_1.default.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
//# sourceMappingURL=index.js.map