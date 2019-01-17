const enhancer = WrappedComponent => class Progress extends WrappedComponent {
  componentDidUpdate() {
    const now = Date.now();
    let updated = false;

    Object.keys(this.paths).forEach((key) => {
      const path = this.paths[key];

      if (!path) {
        return;
      }

      updated = true;
      const pathStyle = path.style;
      pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

      if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
        pathStyle.transitionDuration = '0s, 0s';
      }
    });

    if (updated) {
      this.prevTimeStamp = Date.now();
    }
  }

  render() {
    return super.render();
  }
};

export default enhancer;
