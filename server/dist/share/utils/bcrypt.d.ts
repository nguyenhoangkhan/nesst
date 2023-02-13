export declare const hashPassword: (rawPassword: string, saltRounds?: number) => Promise<string>;
export declare const isCorrectPassword: (rawPassword: string, hash: string) => boolean;
