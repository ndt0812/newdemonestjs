import { ValidationOptions } from "class-validator";

export interface ResponseData<T = any> {
    status: boolean,
    message?: string | { [key: string]: string } | any,
    code?: number,
    data?: T,
    total?: number,
    token?: string,
    tokenExpires?: Date | null
};

export class ComboData {
    constructor(partial: Partial<ComboData>) {
        Object.assign(this, partial);
    }

    Text: string

    Value: string | number

    Extra?: any | {
        [key: string]: any
    }
}


