import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: 'default' | 'destructive' | 'secondary';
}

export const Button = ({
  variants = 'default',
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variants]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
