export interface IEmail {
    email: string;
}

export interface ILogin extends IEmail {
    password: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}


