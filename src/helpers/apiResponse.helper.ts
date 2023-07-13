// Berfungsi untuk menangani response api

export interface APIResponse {
  statusCode: number;
  statusMessage: string;
  data?: any;
  pagination?: Record<string, any>;
}

export const apiResponse = (
  code: number,
  message: string,
  data?: any,
  pagination?: Record<string, any>
) => {
  if ((data as any) === null) {
    return {
      statusCode: code,
      statusMessage: message,
    };
  } else {
    return {
      statusCode: code,
      statusMessage: message,
      data: data,
      pagination: pagination,
    };
  }
};
