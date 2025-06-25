export interface LoginParams {
  email: string;
  password: string;
  recaptchaToken: string;
}

export interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
  error: string;
  recaptchaError: string;
  recaptchaValid: boolean;
  handleRecaptchaChange: (token: string | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  recaptchaRef: React.RefObject<import("react-google-recaptcha").default>;
}
