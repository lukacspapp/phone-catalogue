import {
  type Phone,
  type PaginatedResponse,
  type PhoneFilters,
  PhoneSchema,
  PaginatedResponseSchema,
  ApiResponseSchema,
} from '@/types/phone';
import { z } from 'zod';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiRequest = async <T>(
  endpoint: string,
  schema: z.ZodSchema<{ success: boolean; data: T; timestamp: string }>,
  options?: RequestInit
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log(`🚀 API Request: ${options?.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    const validatedData = schema.parse(rawData);
    return validatedData.data;

  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

export const phoneApi = {
  getPhones: async (filters: PhoneFilters = {}): Promise<PaginatedResponse> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return apiRequest(
      `/api/phones?${params}`,
      ApiResponseSchema(PaginatedResponseSchema)
    );
  },

  getPhone: async (id: number): Promise<Phone> => {
    return apiRequest(
      `/api/phones/${id}`,
      ApiResponseSchema(PhoneSchema)
    );
  },

  healthCheck: async () => {
    const url = `${API_BASE_URL}/health`;
    const response = await fetch(url);
    return response.json();
  },
};
