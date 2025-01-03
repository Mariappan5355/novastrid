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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const login_service_1 = require("../services/login.service");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, login_service_1.register)(req.body);
        res.status(response === null || response === void 0 ? void 0 : response.statusCode).send(response);
    }
    catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, login_service_1.login)(req.body);
        res.status(response === null || response === void 0 ? void 0 : response.statusCode).send(response);
    }
    catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
