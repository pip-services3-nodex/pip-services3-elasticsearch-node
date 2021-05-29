import { ConfigParams } from 'pip-services3-commons-nodex';

import { ElasticSearchLogger } from '../../src/log/ElasticSearchLogger';
import { LoggerFixture } from '../fixtures/LoggerFixture';

let assert = require('chai').assert;

suite('ElasticSearchLogger', () => {
    let _logger: ElasticSearchLogger;
    let _fixture: LoggerFixture;

    setup(async () => {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;
        let dateFormat: string = "YYYYMMDD";

        _logger = new ElasticSearchLogger();
        _fixture = new LoggerFixture(_logger);

        let config = ConfigParams.fromTuples(
            'source', 'test',
            'index', 'log',
            'daily', true,
            "date_format", dateFormat,
            'connection.host', host,
            'connection.port', port
        );
        _logger.configure(config);

        await _logger.open(null);
    });

    teardown(async () => {
        await _logger.close(null);
    });

    test('Log Level', () => {
        _fixture.testLogLevel();
    });

    test('Simple Logging', async () => {
        await _fixture.testSimpleLogging();
    });

    test('Error Logging', async () => {
        await _fixture.testErrorLogging();
    });

    /**
     * We test to ensure that the date pattern does not effect the opening of the elasticsearch component
     */
    test('Date Pattern Testing - YYYY.MM.DD', async () => {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;

        let logger = new ElasticSearchLogger();
        let dateFormat: string = "YYYY.MM.DD";

        let config = ConfigParams.fromTuples(
            'source', 'test',
            'index', 'log',
            'daily', true,
            "date_format", dateFormat,
            'connection.host', host,
            'connection.port', port
        );
        logger.configure(config);

        await logger.open(null);

        // Since the currentIndex property is private, we will just check for an open connection
        assert.isTrue(logger.isOpen());
        await logger.close(null);
    });

    /**
     * We test to ensure that the date pattern does not effect the opening of the elasticsearch component
     */
    test('Date Pattern Testing - YYYY.M.DD', async () => {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;

        let logger = new ElasticSearchLogger();
        let dateFormat: string = "YYYY.M.DD";

        let config = ConfigParams.fromTuples(
            'source', 'test',
            'index', 'log',
            'daily', true,
            "date_format", dateFormat,
            'connection.host', host,
            'connection.port', port
        );
        logger.configure(config);

        await logger.open(null);

        // Since the currentIndex property is private, we will just check for an open connection
        assert.isTrue(logger.isOpen());
        await logger.close(null);
    });

});