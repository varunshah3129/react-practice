interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

export const FaqItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (

        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question"
                    onClick={onToggle}
                    aria-expanded={isOpen}
            >
                <span className="faq-question-text">{question}</span>
                <span className="faq-icon">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="faq-answer">
                    <p>{answer}</p>
                </div>
            )}

        </div>
    )
}