import { Response } from 'express';

interface SuccessResponse<T> {
    message: string;
    data?: T;
}

interface PaginatedData<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

class ApiResponse {
    static success<T>(
        res: Response,
        message: string,
        data?: T,
        statusCode = 200
    ): void {
        const response: SuccessResponse<T> = { message };
        if (data !== undefined) {
            response.data = data;
        }
        res.status(statusCode).send(response);
    }

    static paginated<T>(
        res: Response,
        message: string,
        data: PaginatedData<T>,
        statusCode = 200
    ): void {
        res.status(statusCode).send({
            message,
            ...data
        });
    }
}

export default ApiResponse;
