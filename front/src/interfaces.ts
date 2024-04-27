import { FC } from 'react'

export interface IRoute {
    key: string
    title: string
    path: string
    enabled: boolean
    component: FC<object>
}
export interface TokenResponse {
    user: User;
    token: string;
}


export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface User {
    role: string;
    isEmailVerified: boolean;
    name: string;
    email: string;
    id: string;
}

export interface DataToken {
    token: string;
    expires: string;
}

export interface TokenResp {
    user: User;
    tokens: {
        access: DataToken;
        refresh: DataToken;
    };
}

export interface typeCategory {
    type: string;
    coverImage: string;
    name: string;
    id: string;
}

export enum MediaType {
    Images = "Images",
    Videos = "Videos",
    Documents = "Documents",
}
export enum Roles {
    creador = "creador",
    lector = "lector",
}

export interface Permissions {
    images: boolean;
    videos: boolean;
    documents: boolean;
}

export interface typePermissions {
    id?: string
    name: string;
    permissions: Permissions;
}


