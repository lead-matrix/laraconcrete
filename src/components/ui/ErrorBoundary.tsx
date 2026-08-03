import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI Exception caught by ErrorBoundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-6 select-none">
          <div className="max-w-md w-full bg-[#1A1A1A] border-2 border-[#F58220]/40 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-[#F58220]/10 border border-[#F58220] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-[#F58220]" />
            </div>

            <h1 className="text-2xl font-black font-display tracking-tight text-white mb-2">
              Something Went Wrong
            </h1>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              An unexpected application error occurred. Don't worry — your data is safe and our team
              has been notified.
            </p>

            {this.state.error && (
              <div className="bg-[#0A0A0A] p-3 rounded-lg border border-gray-800 text-left mb-6 font-mono text-xs text-red-400 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F58220] hover:bg-[#D66D10] text-white font-bold py-3 px-5 rounded-xl transition-all duration-200 shadow-lg cursor-pointer min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded-xl transition-all duration-200 border border-gray-700 cursor-pointer min-h-[44px]"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
