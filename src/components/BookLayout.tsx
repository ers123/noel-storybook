import React from 'react';

interface BookLayoutProps {
    children: React.ReactNode;
}

const BookLayout: React.FC<BookLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 md:p-4 lg:p-6">
            <div className="relative w-full max-w-5xl h-[96vh] md:h-[90vh] bg-white rounded-xl md:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row border border-gray-200/40">
                {children}
            </div>
        </div>
    );
};

export default BookLayout;
