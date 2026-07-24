import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

function CardRoot({ children, hover = false, className = '', onClick }: CardProps) {
  const hoverClass = hover ? 'card-hover' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div className={`card ${hoverClass} ${cursorClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-display font-bold text-brand-900 ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-neutral-600 text-sm mt-1 ${className}`}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-neutral-200 ${className}`}>
      {children}
    </div>
  );
}

// Exportar como objeto compuesto
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
