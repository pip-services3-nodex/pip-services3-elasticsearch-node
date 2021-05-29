import { CachedLogger } from 'pip-services3-components-nodex';
export declare class LoggerFixture {
    private _logger;
    constructor(logger: CachedLogger);
    testLogLevel(): void;
    testSimpleLogging(): Promise<void>;
    testErrorLogging(): Promise<void>;
}
