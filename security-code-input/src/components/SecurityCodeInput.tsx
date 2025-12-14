import { useEffect, useRef, useState } from "react"
import './SecurityCodeInput.css';


export const SecurityCodeInput = () => {
    const [digits, setDigits]  = useState<string[]>(['', '', '', '']);
    const [attempts, setAttempts] = useState(0);
    const MAX_ATTEMPTS = 4;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if(value && !/^[0-9]$/.test(value)) {
            return;
        }

        const newDigits = [...digits];

        newDigits[index] = value;
        setDigits(newDigits);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();

            const newDigits = [...digits];
            newDigits[index - 1] = '';
            setDigits(newDigits);
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedText = e.clipboardData.getData('text');

        if (/^\d{4}$/.test(pastedText)) {
            const newDigits = pastedText.split('');
            setDigits(newDigits);
            inputRefs.current[3]?.focus();
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const code = digits.join('');
        submitCode(code);
    }

    const submitCode = (code: string) => {
        const validCode = '6179';
        
        // Increment attempts
        setAttempts(prev => prev + 1);
        
        if (code === validCode) {
            alert('Code is valid! ✅');
            // Reset the form and attempts
            setDigits(['', '', '', '']);
            setAttempts(0);
            inputRefs.current[0]?.focus();
        } else {
            // Check if max attempts reached
            if (attempts + 1 >= MAX_ATTEMPTS) {
                alert('Maximum attempts reached! Please reset. ❌');
                // Don't clear inputs, just disable them
            } else {
                alert(`Invalid code. ${MAX_ATTEMPTS - (attempts + 1)} attempts remaining. ❌`);
                // Clear all inputs
                setDigits(['', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        }
    };

    const handleReset = () => {
        setDigits(['', '', '', '']);
        setAttempts(0);
        inputRefs.current[0]?.focus();
    };

    // Add this before return statement (with isAllFilled)
    const isMaxAttemptsReached = attempts >= MAX_ATTEMPTS;

    // Check if all 4 inputs are filled
    const isAllFilled = digits.every(digit => digit !== '');

    return (
        <div className="security-code-container">
            <form onSubmit={handleSubmit}>
                <div className="code-inputs">
                    {digits.map((digit, index) => (
                        <input 
                            key={index}
                            type='text'
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange = {(e) => handleChange(index, e.target.value)}
                            onKeyDown = {(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="code-input"
                            disabled={isMaxAttemptsReached}
                            aria-label={`Digit ${index + 1}`}
                        />
                    ))}
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={!isAllFilled || isMaxAttemptsReached}
                >
                    Submit
                </button>
                <button 
                    type="button" 
                    onClick={handleReset}
                    className="reset-button"
                >
                    Reset
                </button>

            </form>

        </div>
    )
}