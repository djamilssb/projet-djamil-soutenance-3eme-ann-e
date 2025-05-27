export const isUsernameValid = (value: string): boolean => {
    const hasUsernameRegex: RegExp = /^[a-zA-Z0-9_]{3,25}$/;
    return hasUsernameRegex.test(value);
};

export const isEmailValid = (value: string): boolean => {
    const hasEmailRegex: RegExp = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return hasEmailRegex.test(value);
};

export const isPasswordValid = (value: string): boolean => {
    const hasPasswordRegex: RegExp = /^.{12}$/;
    return hasPasswordRegex.test(value);
};

export const isPhoneValid = (value: string): boolean => {
    const hasPhoneRegex: RegExp = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    return hasPhoneRegex.test(value);
};