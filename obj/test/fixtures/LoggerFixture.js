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
exports.LoggerFixture = void 0;
let assert = require('chai').assert;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
class LoggerFixture {
    constructor(logger) {
        this._logger = logger;
    }
    testLogLevel() {
        assert.isTrue(this._logger.getLevel() >= pip_services3_components_nodex_1.LogLevel.None);
        assert.isTrue(this._logger.getLevel() <= pip_services3_components_nodex_1.LogLevel.Trace);
    }
    testSimpleLogging() {
        return __awaiter(this, void 0, void 0, function* () {
            this._logger.setLevel(pip_services3_components_nodex_1.LogLevel.Trace);
            this._logger.fatal(null, null, "Fatal error message");
            this._logger.error(null, null, "Error message");
            this._logger.warn(null, "Warning message");
            this._logger.info(null, "Information message");
            this._logger.debug(null, "Debug message");
            this._logger.trace(null, "Trace message");
            this._logger.dump();
            yield new Promise((resolve, reject) => { setTimeout(resolve, 1000); });
        });
    }
    testErrorLogging() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Raise an exception
                throw new Error();
            }
            catch (ex) {
                this._logger.fatal("123", ex, "Fatal error");
                this._logger.error("123", ex, "Recoverable error");
                assert.isNotNull(ex);
            }
            this._logger.dump();
            yield new Promise((resolve, reject) => { setTimeout(resolve, 1000); });
        });
    }
}
exports.LoggerFixture = LoggerFixture;
//# sourceMappingURL=LoggerFixture.js.map