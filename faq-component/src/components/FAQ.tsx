import  { useState } from 'react';
import type { FaqItem, FaqProps } from "../types/faq";
import { FaqItem as FaqItemComponent } from './FAQItem';


export const FAQ = ({ items, title, allowMultipleOpen = false}: FaqProps) => {

    const [openItems, setOpenItems] = useState<Set<string | number>> (new Set());

    const handleToggle = (id: string | number) => {
        setOpenItems((prev) => {
            const newSet = new Set(prev);

            if(newSet.has(id)) {
                newSet.delete(id);
            }
            else {
                if(!allowMultipleOpen) {
                    newSet.clear();
                }
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="faq-container">
            {title && <h2 className="title">{title}</h2>}

            <div className="faq-list">
                {items.map((item) => (
                    <FaqItemComponent 
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems.has(item.id)}
                        onToggle={() => handleToggle(item.id)}
                    />
                ))}
            </div>

        </div>
    )
}