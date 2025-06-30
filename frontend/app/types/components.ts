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

// Tipos para componentes del Header
export interface MobileLoginButtonProps {
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

export interface LogoutButtonProps {
  onClick: () => void;
}

export interface LoginButtonProps {
  onClick?: () => void;
}

export interface MobileNavItemProps {
  href: string;
  icon: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface MobileUserDashboardProps {
  user: User | null;
  onClick?: () => void;
}

export interface MobileLogoutButtonProps {
  onClick: () => void;
}

// Tipo de usuario para los componentes (compatible con useAuth)
export interface User {
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: string;
  email?: string;
  image?: string | null;
}