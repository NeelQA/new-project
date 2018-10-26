declare module "debug" {
    type ILogger = (message: string) => void;

    function createLogger(namespace: string): ILogger;
    namespace createLogger { }

    export = createLogger;
}
