import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div
      className="
        w-full max-w-md mx-auto
        flex flex-col items-center justify-center gap-4
        bg-red-500/10 backdrop-blur-md
        border border-red-400/20
        rounded-3xl
        p-8 py-12
        text-center
      "
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center">
        <FiAlertCircle className="text-3xl text-red-300" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-white font-bold text-xl">Oops!</h3>
        <p className="text-white/60 text-base leading-relaxed">{message}</p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-2 flex items-center gap-2
            px-6 py-2.5
            bg-white/10 hover:bg-white/20
            border border-white/20 hover:border-white/40
            rounded-xl
            text-white/80 hover:text-white
            text-sm font-semibold
            transition-all duration-300
            active:scale-95 cursor-pointer
          "
        >
          <FiRefreshCw className="text-base" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
