"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
class App {
    constructor() {
        this.app = express_1.default();
        this.setConfig();
        router_1.default(this.app);
    }
    setConfig() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map