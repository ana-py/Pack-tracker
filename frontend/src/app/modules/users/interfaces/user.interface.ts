

export interface User {
    _id:       string;
    email:     string;
    password:  string;
    username?: string;
    name?:     string;
    role?:     string;
    token?:    string;
}
