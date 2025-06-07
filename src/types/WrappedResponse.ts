export interface WrappedResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors: string[] | null;
    timestamp: string;
}