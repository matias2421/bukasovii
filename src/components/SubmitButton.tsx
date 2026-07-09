"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

// Botón de formulario con feedback de envío: se deshabilita mientras la
// acción corre y muestra un spinner en el botón que fue presionado.
export default function SubmitButton({
  children,
  pendingText,
  className,
  formAction,
  onClick,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { pending } = useFormStatus();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!pending) setClicked(false);
  }, [pending]);

  const showSpinner = pending && clicked;

  return (
    <button
      disabled={pending}
      formAction={formAction}
      onClick={(e) => {
        setClicked(true);
        onClick?.(e);
      }}
      className={className}
    >
      {showSpinner ? (
        <span className="inline-flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 animate-spin"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M12 3a9 9 0 1 1-9 9" />
          </svg>
          {pendingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
