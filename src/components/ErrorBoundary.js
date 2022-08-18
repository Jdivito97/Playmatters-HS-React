import React, { Component } from 'react';
import { BiError } from 'react-icons/bi';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo); // eslint-disable-line no-console
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          <BiError /> ERROR <BiError />
        </h1>
      );
    }

    return this.props.children;
  }
}
