import React from 'react';

interface BookLayoutProps {
    children: React.ReactNode;
}

const BookLayout: React.FC<BookLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center" style={{ padding: 'clamp(0.5rem, 2vw, 2rem)' }}>
            <div
                className="relative w-full max-w-7xl bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row backdrop-blur-xl border border-white/20"
                style={{
                    height: 'clamp(90vh, 95vh, 96vh)',
                    borderRadius: 'clamp(0.75rem, 2vw, 1.5rem)'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default BookLayout;
