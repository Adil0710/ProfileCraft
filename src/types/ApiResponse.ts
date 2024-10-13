export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    siteVisible?: boolean;
    data?: T; // Generic data field to hold response data
    error?: string; // Optional field for error messages
  }
  