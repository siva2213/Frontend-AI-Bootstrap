/**
 * API Service Template
 * 
 * Follows: docs/rules/api-integration.md
 * - Type-safe requests and responses
 * - Error handling
 * - Consistent service pattern
 */

import { apiClient } from '@services/api/client';
import { PaginatedResponse } from '@services/api/types';

// Define types
export interface Entity {
  id: string;
  name: string;
  // Add other properties
}

export interface CreateEntityRequest {
  name: string;
  // Add other required fields
}

export interface UpdateEntityRequest {
  name?: string;
  // Add other optional fields
}

export interface EntityListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Service implementation
export const entityService = {
  /**
   * Get all entities with pagination
   */
  getEntities: async (params?: EntityListParams): Promise<PaginatedResponse<Entity>> => {
    return apiClient.get<PaginatedResponse<Entity>>('/entities', { params });
  },

  /**
   * Get entity by ID
   */
  getEntityById: async (id: string): Promise<Entity> => {
    return apiClient.get<Entity>(`/entities/${id}`);
  },

  /**
   * Create new entity
   */
  createEntity: async (data: CreateEntityRequest): Promise<Entity> => {
    return apiClient.post<Entity>('/entities', data);
  },

  /**
   * Update entity
   */
  updateEntity: async (id: string, data: UpdateEntityRequest): Promise<Entity> => {
    return apiClient.put<Entity>(`/entities/${id}`, data);
  },

  /**
   * Delete entity
   */
  deleteEntity: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/entities/${id}`);
  },
};

