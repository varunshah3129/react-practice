export interface FaqItem {
    id: string | number;
    question: string;
    answer: string
}

export interface FaqProps {
    items: FaqItem[];
    title?: string;
    allowMultipleOpen?: boolean;
}