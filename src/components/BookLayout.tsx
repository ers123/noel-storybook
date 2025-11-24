import React from 'react';

interface BookLayoutProps {
    children: React.ReactNode;
}

const BookLayout: React.FC<BookLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="relative w-full max-w-7xl h-[92vh] sm:h-[88vh] md:h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row backdrop-blur-xl border border-white/20">
                {children}
            </div>
        </div>
    );
};

export default BookLayout;
