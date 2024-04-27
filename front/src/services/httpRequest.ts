// src/services/httpRequests.ts
import api from '../axios';
import { AxiosError, AxiosResponse } from 'axios';

const handleResponse = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    const error = new Error(response.statusText);
    throw error;
  }
};

const handleError = (error: AxiosError) => {
    let errorMessage = '';
    if (error.response) {
        errorMessage = (error.response.data as any)?.message || 'Something went wrong';
    } else if (error.request) {
        errorMessage = 'No response from server';
    } else {
        errorMessage = error.message;
    }
    console.error('HTTP Error:', errorMessage);
    throw error;
};

export const get = async (path: string): Promise<any> => {
    try {
        const response = await api.get(path);
        return handleResponse(response);
    } catch (error) {
        handleError(error as AxiosError<unknown, any>);
        throw error;
    }
};

export const post = async (path: string, data?: any): Promise<any> => {
    try {
        const response = await api.post(path, data);
        return handleResponse(response);
    } catch (error) {
        handleError(error as AxiosError<unknown, any>);
        throw error;
    }
};

export const put = async (path: string, data?: any): Promise<any> => {
  try {
    const response = await api.put(path, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error as AxiosError<unknown, any>);
    throw error;
  }
};

export const del = async (path: string): Promise<any> => {
  try {
    const response = await api.delete(path);
    return handleResponse(response);
  } catch (error) {
    handleError(error as AxiosError<unknown, any>);
    throw error;
  }
};
