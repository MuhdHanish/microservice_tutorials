export class CustomHTTPError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'CustomHTTPError';
        this.status = status;
    }
};
