import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React, { ErrorInfo } from "react";

interface Props extends WithRouterProps {}

type State = {
  hasError: boolean;
};

class ErrorBoundaryComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRouterChange = () => {
    this.setState({
      hasError: false,
    });
  };

  componentDidMount() {
    this.props.router.events.on("routeChangeComplete", this.handleRouterChange);
  }

  componentWillUnmount() {
    this.props.router.events.off(
      "routeChangeComplete",
      this.handleRouterChange
    );
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return <div>Error</div>
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryComponent);
