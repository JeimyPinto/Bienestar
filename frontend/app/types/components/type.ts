export interface IcoBackProps {
  role?: string;
}


export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface SectionHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}