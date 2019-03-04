export interface Client {
    fname: string;
    lname: string;
    email: string;
    id: string; // PK
    password: string;
    city: string;
    street: string;
    admin: boolean;
    activecartid: number;
}