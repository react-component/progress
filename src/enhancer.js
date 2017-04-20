const enhancer = WrappedComponent => class Progress extends WrappedComponent {
  componentDidUpdate() {
    const now = Date.now();
    this.path.style.transitionDuration = '0.3s, 0.3s';
    if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
      this.path.style.transitionDuration = '0s, 0s';
    }
    this.prevTimeStamp = Date.now();
  }

  render() {
    return super.render();
  }
};

export default enhancer;
