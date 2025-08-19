import LoadingSpinner from "./LoadingSpinner";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
          <LoadingSpinner size="lg" color="white" />
        </div>
        <div className="space-y-2">
          <div className="flex space-x-1 justify-center">
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <p className="text-gray-600 font-medium">Processing...</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
