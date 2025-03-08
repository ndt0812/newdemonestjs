import * as  crypto from 'crypto';


export function StringToMd5(text: string) {
    return crypto.createHash('md5').update('' + text).digest("hex")
}