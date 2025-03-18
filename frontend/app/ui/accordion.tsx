import React, { useState } from 'react';

const Accordion: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="w-full text-left text-xl font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
            </button>
            {isOpen && <p className="mt-2 text-lg">{content}</p>}
        </div>
    );
};

export default Accordion;