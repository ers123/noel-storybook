import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = ((current + 1) / total) * 100;

    return (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-30">
            <div
                className="h-full bg-gray-700 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
