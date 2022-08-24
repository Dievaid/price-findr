export interface NavProps {
    isLoggedIn: boolean;
    email: string;
    setLoginClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setRegisterClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setLogoutClicked: React.Dispatch<React.SetStateAction<boolean>>;
}