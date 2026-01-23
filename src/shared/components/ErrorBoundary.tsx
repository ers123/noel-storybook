import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component (Issue #8)
 *
 * Catches React errors and prevents white screen of death
 * Shows user-friendly error message instead of crashing
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Store error info in state
    this.setState({
      error,
      errorInfo
    });

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😕</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600">
                Don't worry, your progress is saved. Let's try to fix this!
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 bg-gray-100 p-4 rounded-lg overflow-auto max-h-48">
                <div className="text-xs font-mono text-gray-700">
                  <div className="font-bold mb-2">Error:</div>
                  <div className="mb-3">{this.state.error.message}</div>
                  {this.state.errorInfo && (
                    <>
                      <div className="font-bold mb-2">Component Stack:</div>
                      <pre className="whitespace-pre-wrap text-[10px]">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  // Clear all app data except API key
                  const apiKey = localStorage.getItem('gemini_api_key');
                  localStorage.clear();
                  if (apiKey) {
                    localStorage.setItem('gemini_api_key', apiKey);
                  }
                  window.location.href = '/';
                }}
                className="w-full py-3 px-6 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-all"
              >
                Clear Data & Restart
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>If the problem continues, try clearing your browser cache.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
