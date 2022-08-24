export interface FormType {
    type: string;
    closeCallback: React.Dispatch<React.SetStateAction<boolean>>;
    submitCallback: React.Dispatch<React.SetStateAction<boolean>>;
    setEmailCallback: React.Dispatch<React.SetStateAction<string>>;
    setJwtTokenCallback: React.Dispatch<React.SetStateAction<string>>;
  }