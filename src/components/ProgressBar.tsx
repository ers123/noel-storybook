import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = ((current + 1) / total) * 100;

    return (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-100 z-30">
            <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
