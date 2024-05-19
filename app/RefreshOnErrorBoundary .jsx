import React from 'react';

class RefreshOnErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error('Error caught by Error Boundary: ', error, errorInfo);
	}

	componentDidUpdate() {
		if (this.state.hasError) {
			window.location.reload();
		}
	}

	render() {
		if (this.state.hasError) {
			return null; // 새로고침 전에 아무것도 렌더링하지 않음
		}

		return this.props.children;
	}
}

export default RefreshOnErrorBoundary;
