import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Keyingi render siklida xatolik bo'lganligi haqida state yangilash
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Xatolik haqida log yozish
    console.error("Xatolik yuz berdi:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Xatolik bo'lganda ko'rsatiladigan UI
      return (
        <div className="error-boundary">
          <h2>Kechirasiz, nimadadir xatolik yuz berdi.</h2>
          <button onClick={() => window.location.reload()}>
            Qayta yuklash
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
