class ewAutoImage {
  constructor(
    url: string,
    options = { scale: 16 / 9 },
    container: HTMLElement | string
  ) {
    const autoImageContainer = this.normolizeContainer(container);
    if (!autoImageContainer) {
      console.warn(``);
    }
  }
  normolizeContainer(selector: string | HTMLElement) {
    if (selector instanceof HTMLElement) {
      return selector;
    } else {
      return document.querySelector(selector);
    }
  }
}
