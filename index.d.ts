interface Form {
    [key: string]: string | null | undefined | number;
}
export declare function trimer<T = Form>(form: T, exception?: keyof T | {
    [index: number]: keyof T;
}): T;
declare const fftk: {
    trimer: typeof trimer;
};
export default fftk;
