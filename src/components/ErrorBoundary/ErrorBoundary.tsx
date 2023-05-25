import React, { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(): void {
    console.log('Error');
  }

  render(): ReactNode {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
