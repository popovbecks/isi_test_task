export interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    type: number,
    password: string;
    id: number;
    isSelected?: boolean;
}