import { User, Service } from '.';

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
export interface MobileLoginButtonProps {
  onClick?: () => void;
}
export interface LoginButtonProps {
  onClick?: () => void;
}
export interface LogoutButtonProps {
  onClick: () => void;
}
export interface MobileLoginButtonProps {
  onClick?: () => void;
}
export interface MobileLogoutButtonProps {
  onClick: () => void;
}
export interface MobileNavItemProps {
  href: string;
  icon: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export interface ScrollTopButtonProps {
  show: boolean;
  onClick: () => void;
}
export interface MobileUserDashboardProps {
  user: User | null;
  onClick?: () => void;
}
export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export interface UserDashboardLinkProps {
  user: User | null;
  onClick?: () => void;
}
export interface ServicesDisplaySectionProps {
  services: Service[];
  loading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
}
export interface ActiveSessionMessageProps {
  onLogout: () => void;
}
export interface ActionButtonsProps {
  user: User | null;
}
export interface ActionCard {
  title: string;
  description: string;
  path: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
  requiredRoles: string[];
}
export interface RoleDisplayConfig {
  title: string;
  emoji: string;
  gradient: string;
  color: string;
  description: string;
}
export interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "azul-claro" | "azul-oscuro" | "verde-corporativo" | "coral" | "cian";
}