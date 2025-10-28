/*
- In React, an Error Boundary is a special component that catches JavaScript errors in its child component tree, prevents the entire app from crashing, and displays a fallback UI instead.
- it is build using the class bases component that implements either one or both of the lifecycle methods getDerivedStateFromError or componentDidCatch becomes an error boundary.
- the static method getDerivedStateFromError method is used to render a fallback UI after an error is thrown and the componentDidCatch method is used to log the error information.
- In this page you'll fine the custom implementation of it, there's also a package name react-error-boundary you can use that too.
*/

import { Component, ErrorInfo, ReactNode } from "react";
import Error404Screen from "../screens/Error404Screen/Error404Screen";

interface Props {
  children: ReactNode;
};

interface State {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State>{
  state: State = {
    hasError: false,
  };
  
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  };
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by Error Boundary ", error, errorInfo)
  }
  
  render() {
    if(this.state.hasError) {
      return (
        <Error404Screen />
      )
    }
    return this.props.children;
  }
};

export default ErrorBoundary;