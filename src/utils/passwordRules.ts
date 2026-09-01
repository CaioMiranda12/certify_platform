export interface PasswordRule {
  label: string;
  valid: boolean;
}

export function getPasswordRules(password: string): PasswordRule[] {
  return [
    {
      label: "Mínimo 8 caracteres",
      valid: password.length >= 8,
    },
    {
      label: "1 número",
      valid: /\d/.test(password),
    },
    {
      label: "Letras maiúscula",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Letra minúscula",
      valid: /[a-z]/.test(password),
    },
    {
      label: "1 caractere especial",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
}
