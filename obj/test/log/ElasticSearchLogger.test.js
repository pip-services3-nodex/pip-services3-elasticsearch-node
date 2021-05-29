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
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const ElasticSearchLogger_1 = require("../../src/log/ElasticSearchLogger");
const LoggerFixture_1 = require("../fixtures/LoggerFixture");
let assert = require('chai').assert;
suite('ElasticSearchLogger', () => {
    let _logger;
    let _fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;
        let dateFormat = "YYYYMMDD";
        _logger = new ElasticSearchLogger_1.ElasticSearchLogger();
        _fixture = new LoggerFixture_1.LoggerFixture(_logger);
        let config = pip_services3_commons_nodex_1.ConfigParams.fromTuples('source', 'test', 'index', 'log', 'daily', true, "date_format", dateFormat, 'connection.host', host, 'connection.port', port);
        _logger.configure(config);
        yield _logger.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield _logger.close(null);
    }));
    test('Log Level', () => {
        _fixture.testLogLevel();
    });
    test('Simple Logging', () => __awaiter(void 0, void 0, void 0, function* () {
        yield _fixture.testSimpleLogging();
    }));
    test('Error Logging', () => __awaiter(void 0, void 0, void 0, function* () {
        yield _fixture.testErrorLogging();
    }));
    /**
     * We test to ensure that the date pattern does not effect the opening of the elasticsearch component
     */
    test('Date Pattern Testing - YYYY.MM.DD', () => __awaiter(void 0, void 0, void 0, function* () {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;
        let logger = new ElasticSearchLogger_1.ElasticSearchLogger();
        let dateFormat = "YYYY.MM.DD";
        let config = pip_services3_commons_nodex_1.ConfigParams.fromTuples('source', 'test', 'index', 'log', 'daily', true, "date_format", dateFormat, 'connection.host', host, 'connection.port', port);
        logger.configure(config);
        yield logger.open(null);
        // Since the currentIndex property is private, we will just check for an open connection
        assert.isTrue(logger.isOpen());
        yield logger.close(null);
    }));
    /**
     * We test to ensure that the date pattern does not effect the opening of the elasticsearch component
     */
    test('Date Pattern Testing - YYYY.M.DD', () => __awaiter(void 0, void 0, void 0, function* () {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;
        let logger = new ElasticSearchLogger_1.ElasticSearchLogger();
        let dateFormat = "YYYY.M.DD";
        let config = pip_services3_commons_nodex_1.ConfigParams.fromTuples('source', 'test', 'index', 'log', 'daily', true, "date_format", dateFormat, 'connection.host', host, 'connection.port', port);
        logger.configure(config);
        yield logger.open(null);
        // Since the currentIndex property is private, we will just check for an open connection
        assert.isTrue(logger.isOpen());
        yield logger.close(null);
    }));
});
//# sourceMappingURL=ElasticSearchLogger.test.js.map