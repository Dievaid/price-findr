const PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";

export const passwordValidation = (password: string) => {
    let matchedPassword = String(password).match(PASSWORD_REGEX)?.toString();
    return matchedPassword !== password;
}