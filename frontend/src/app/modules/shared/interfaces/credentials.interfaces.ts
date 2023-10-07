export interface UserData{
    _id: string;
    username:string;
    email: string;
    name: string;
}

export interface LoginResponse{
    token: string;
    user: UserData;
    role: string;
}