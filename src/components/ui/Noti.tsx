import { useState, useEffect } from 'react';

const Noti = ({ message, dismissTime = 100000, onClose }:any) => {
    const [isVisible, setIsVisible] = useState(true);

    // Auto-dismiss timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            const removeTimer = setTimeout(() => {
                onClose && onClose();
            }, 300);
            return () => clearTimeout(removeTimer);
        }, dismissTime);

        return () => clearTimeout(timer);
    }, [dismissTime, onClose]);

    const handleDismiss = () => {
        setIsVisible(false);
        // Call onClose prop after a slight delay to allow for animations
        const removeTimer = setTimeout(() => {
            onClose && onClose();
        }, 300); // Adjust this delay to match your exit animation duration
        return () => clearTimeout(removeTimer);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-16 w-full text-center text-white bg-red-600 bg-opacity-90 px-4 rounded shadow-lg z-50 py-1">
            <button
                className="text-black hover:text-gray-700 rounded-full focus:outline-none absolute right-2 top-5"
                aria-label="Close"
                onClick={handleDismiss}
            >
                {/* Close Icon (using a simple SVG for demonstration) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <p className="text-lg flex-grow">{message}</p>
        </div>
    );
};

export default Noti;