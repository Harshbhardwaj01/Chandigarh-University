export type Schema = {
  models: {
    News: {
      list: (input?: Record<string, unknown>, options?: Record<string, unknown>) => Promise<{ data: Array<Record<string, unknown>>; errors?: Array<{ message: string }> }>; 
    };
    Program: {
      list: (input?: Record<string, unknown>, options?: Record<string, unknown>) => Promise<{ data: Array<Record<string, unknown>>; errors?: Array<{ message: string }> }>;
    };
    ContactMessage: {
      create: (input: Record<string, unknown>) => Promise<{ errors?: Array<{ message: string }> }>;
    };
    Application: {
      create: (input: Record<string, unknown>) => Promise<{ errors?: Array<{ message: string }> }>;
    };
  };
};
