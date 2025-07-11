import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

interface NotiProps {
  message: string;
  dismissTime?: number;
  onClose?: () => void;
}

const Noti = ({ message, dismissTime = 7000, onClose }: NotiProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, dismissTime);

    return () => clearTimeout(timer);
  }, [dismissTime]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed top-16 left-0 right-0 z-50 mx-4 sm:mx-6 lg:mx-8 transition-all duration-300 transform ${
          isExiting
            ? "translate-y-[-100%] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-2xl border border-red-400/30 backdrop-blur-sm">
            {/* Decorative pattern overlay */}
            <div
              className="absolute inset-0 opacity-20 rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            {/* Content */}
            <div className="relative flex items-center justify-between p-4 sm:p-5">
              <div className="flex items-center gap-3 flex-1 pr-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200 group"
                aria-label="Close notification"
              >
                <X className="w-5 h-5 text-white group-hover:text-red-100 transition-colors" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-800/30 rounded-b-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 ease-linear rounded-b-lg shrink-animation"
                style={{
                  animationDuration: `${dismissTime}ms`,
                  animationPlayState: isExiting ? "paused" : "running",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shrink-animation {
          animation: shrink linear;
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  );
};

export default Noti;
