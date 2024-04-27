// src/services/authService.ts
import axios, { AxiosResponse } from 'axios';
import { LoginCredentials, RegisterData, TokenResponse } from '../interfaces';
import { del, get, post, put } from './httpRequest';
import api from '../axios';

export const login = async (credentials: LoginCredentials): Promise<TokenResponse | undefined> => {

    try {
        const response = await post('/auth/login', credentials);
        const { user, tokens } = response;
        localStorage.setItem('user', user);
        localStorage.setItem('access_token', tokens.access.token);
        localStorage.setItem('refresh_token', tokens.refresh.token);
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const authRegister = async (data: RegisterData): Promise<TokenResponse | undefined> => {
    console.log('data: ', data);
    try {
        const response = await post('/auth/register', data);
        const { user, tokens } = response;
        localStorage.setItem('user', user);
        localStorage.setItem('access_token', tokens.access.token);
        localStorage.setItem('refresh_token', tokens.refresh.token);

        return response;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const logout = async (): Promise<TokenResponse | undefined> => {
    const refresh = localStorage.getItem('refresh_token');
    const response = await post('/auth/logout', { refreshToken: refresh });
    return response;
};

const uploadImage = async (file: File): Promise<AxiosResponse<any> | undefined> => {
    const token = localStorage.getItem('access_token');

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('https://ll6zw4n2-3000.use2.devtunnels.ms/v1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',

            },
        });
        return response.data.imageUrl;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};

export const createCategory = async (Data: any): Promise<TokenResponse | undefined> => {
    const { image } = Data;
    const formData = new FormData();
    formData.append('image', image);
    try {
        const urlCover = await uploadImage(image);
        Data.coverImage = urlCover
        Data = {
            name: Data.name,
            coverImage: Data.coverImage,
            type: Data.type.toLowerCase(),
        }
        const dataCategory = await post('/category/create', Data);
        return dataCategory;
    } catch (error) {
        console.error('Create category failed:', error);
        throw error;
    }
}

export const getCategory = async (data?: string) => {
    const params = data
    try {
        if (params) {
            const listCategories = await get('/category/?type=' + params);
            return listCategories;
        } else {
            const listCategories = await get('/category/');
            return listCategories;
        }

    } catch (error) {
        console.error('List no found', error);
        throw error;
    }
}
export const DeleteCategory = async (categoryId: string) => {
    try {
        const response = await del(`/category/${categoryId}/delete`);
        return response;
    } catch (error) {
        console.error('List no found', error);
        throw error;
    }
}


export const createThematic = async (Data: any): Promise<TokenResponse | undefined> => {
    const dataThematic = await post('/thematic/create', Data);
    return dataThematic;
}

export const getThematic = async () => {
    const listCategories = await get('/thematic/');
    return listCategories;
}

export const DeleteThematic = async (thematicId: string) => {
    const response = await del(`/thematic/${thematicId}/delete`);
    return response;

}

export const EditThematic = async (Data: any): Promise<TokenResponse | undefined> => {
    const dataThematic = await put(`/thematic/${Data._id}/update`, Data);
    return dataThematic;
}

export const EditCategory = async (Data: any): Promise<TokenResponse | undefined> => {
    const idCategory = Data?.id;
    const { image } = Data;
    const formData = new FormData();
    formData.append('image', image);
    try {
        const urlCover = await uploadImage(image);
        Data.coverImage = urlCover
        Data = {
            _id: idCategory,
            name: Data.name,
            coverImage: Data.coverImage,
            type: Data.type.toLowerCase(),
        }
        const dataCategory = await put(`/category/${idCategory}/update`, Data);
        return dataCategory;
    } catch (error) {
        console.error('Create category failed:', error);
        throw error;
    }
}


export const getThematics = async () => {
    try {
        const listThematics = await get('/content/byThematic/');
        return listThematics;
    } catch (error) {
        console.error('List no found', error);
        throw error;
    }
}

export const createContent = async (Data: any): Promise<TokenResponse | undefined> => {
    console.log('Data: ', Data);

    if (Data.file && Data.file.length > 0) {
        const { file, ...rest } = Data;
        const formData = new FormData();
        formData.append('file', file[0], file[0].name);
        for (const key in rest) {
            formData.append(key, rest[key]);
        }
        const content = await api.post('/content/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return 
    }

    const content = await post('/content/create', Data);
    return content;
}
export const me = async () => {
    try {
        const user = await get('/auth/me');
        return user;
    } catch (error) {
        console.error('User no found', error);
        throw error;
    }
}

export const getContents = async (categoryId:string,thematicId:string) => {
    try {
        const user = await get(`/content?category=${categoryId}&thematic=${thematicId}`);
        return user;
    } catch (error) {
        console.error('contents no found', error);
        throw error;
    }
}