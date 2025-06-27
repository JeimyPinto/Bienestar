export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
export interface IcoBackProps {
  href?: string;
  className?: string;
}
export interface SectionHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}
export interface SuccessMessageProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}
export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  setCurrentPage: (page: number) => void;
}
