import { Method } from 'axios';

export const HTTP_METHODS: Record<string, Method> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const HTTP_STATUS_CODE = {
  OK: 200,
};
