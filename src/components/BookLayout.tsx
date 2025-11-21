import React from 'react';

interface BookLayoutProps {
    children: React.ReactNode;
}

const BookLayout: React.FC<BookLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 bg-[#2c2420] bg-opacity-95 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]">
            <div className="relative w-full max-w-6xl aspect-[3/4] md:aspect-[16/10] bg-[#fdf6e3] rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-[#e6dcc3]">
                {/* Book Spine Effect (Desktop Center) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-[#e6dcc3]/50 to-transparent z-20 pointer-events-none mix-blend-multiply"></div>

                {/* Page Shadow (Left) */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none"></div>

                {/* Page Shadow (Right) */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent z-10 pointer-events-none"></div>

                {children}
            </div>
        </div>
    );
};

export default BookLayout;
