// Types for Security Code Input component

export interface SecurityCodeInputProps {
  codeLength?: number;           // Number of digits (default: 4)
  maxAttempts?: number;          // Maximum attempts allowed (default: 4)
  onSubmit: (code: string) => boolean | Promise<boolean>;  // Validation function
  onMaxAttemptsReached?: () => void;  // Callback when max attempts reached
  className?: string;            // Optional CSS class
}

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};
