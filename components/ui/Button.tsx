import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    disabled, 
    type = "button", 
    variant = 'default',
    ...props 
  }, ref) => {
    const variantStyles = {
      default: `
        w-auto
        rounded-full
        bg-black
        border-transparent
        px-5
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-white
        font-semibold
        hover:opacity-75
        transition
      `,
      outline: `
        w-auto
        rounded-full
        bg-transparent
        border-2
        border-black
        px-5
        py-3
        text-black
        font-semibold
        hover:bg-black
        hover:text-white
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
      `,
      ghost: `
        w-auto
        rounded-full
        bg-transparent
        text-gray-600
        hover:bg-gray-100
        px-5
        py-3
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
      `
    };

    return (
      <button
        className={cn(
          variantStyles[variant],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
