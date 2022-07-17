const inBrowser = typeof window !== 'undefined';

const defaultRoot = inBrowser ? window : undefined;

type ScrollElement = HTMLElement | Window;

const overflowStylePatterns = ['scroll', 'auto'];

const isElement = (node: HTMLElement) => {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
};

export const getScrollParent = (el: HTMLElement, root: ScrollElement | undefined = defaultRoot) => {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowStylePatterns.includes(overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentNode as HTMLElement;
  }

  return root;
};

export const getScrollTop = (element: Window | Element) => {
  const top = 'scrollTop' in element ? element.scrollTop : element.scrollY;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
};

export const sleep = (time: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, time);
  });
