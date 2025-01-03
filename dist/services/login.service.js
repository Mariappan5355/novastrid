"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../database/connection");
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = data;
        const hashedPsaaword = yield bcrypt_1.default.hash(password, 10);
        const query = "INSERT INTO users (userName, email, password) values (?, ?, ?)";
        const [result] = yield connection_1.db.query(query, [userName, email, hashedPsaaword]);
        return { statusCode: 201, messsage: 'user regitered successfully' };
    }
    catch (error) {
        return { statusCode: 400, messsage: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error' };
    }
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = data;
        const query = "SELECT * from users where email= ?";
        const values = connection_1.db.query(query, [email], (error, result) => {
            if (error || (Array.isArray(result) && !result.length))
                return { statusCode: 400, messsage: error === null || error === void 0 ? void 0 : error.message };
            const user = result[0];
            const isValidPassword = bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return { statusCode: 400, messsage: 'Invalid password' };
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'secreatKey');
            return { statusCode: 20, messsage: 'user loggedin  successfully', token };
        });
    }
    catch (error) {
        return { statusCode: 400, messsage: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error' };
    }
});
exports.login = login;
