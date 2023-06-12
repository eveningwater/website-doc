const isMobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
const eventType = isMobile
  ? ['touchstart', 'touchmove', 'touchend']
  : ['mousedown', 'mousemove', 'mouseup'];
function create(tagName) {
  return document.createElement(tagName);
}
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
function toArray(value) {
  return Array.prototype.slice.call(value);
}
function getStyle(el, selector = null, prop) {
  return window.getComputedStyle(el, selector).getPropertyValue(prop);
}
function hasClass(el, className) {
  return el.classList.contains(className);
}
function addRule(selector, value) {
  return document.styleSheets[0].addRule(selector, value);
}
function isFunction(v) {
  return typeof v === 'function';
}
function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
function createLoading() {
  return `<div class="loading-container">
        <div class="loading-content">
            <div class="loading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <p>文档正在请求中，请耐心等待......</p>
        </div>
    </div>`;
}
function setLoading(loading, status) {
  return (loading.style.display = status);
}
function requestGet(url) {
  return axios.get(url);
}
function markedTemplate(template) {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return marked(template);
}
const cubic = (base, index) => Math.pow(base, index);
const easeInOutCubic = value =>
  value < 0.5 ? cubic(value * 2, 3) / 2 : 1 - cubic((1 - value) * 2, 3) / 2;
const scrollTop = (element, top, time = 500) => {
  const beginTime = Date.now();
  const begin = 0,
    end = top;
  const currentTop = element.scrollTop;
  if (element.scrollTop === top) return;
  const handler = () => {
    const progress = (Date.now() - beginTime) / time;
    if (progress < 1) {
      element.scrollTop = begin * (1 - easeInOutCubic(progress)) + currentTop;
      requestAnimationFrame(handler);
    } else {
      element.scrollTop = end;
    }
  };
  requestAnimationFrame(handler);
};
function getRect(element) {
  return element.getBoundingClientRect();
}
function on(element, type, handler, useCapture = false) {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
}
function off(element, type, handler, useCapture = false) {
  if (element && type && handler) {
    element.removeEventListener(type, handler, useCapture);
  }
}
function baseClickOutSide(element, isUnbind = true, callback) {
  const mouseHandler = event => {
    const target = event.target;
    if (!target) return;
    const targetRect = getRect(target);
    const rect = getRect(element);
    if (
      targetRect.x >= rect.x &&
      targetRect.y >= rect.y &&
      targetRect.width <= rect.width &&
      targetRect.height <= rect.height
    )
      return;
    if (isFunction(callback)) callback(target, targetRect);
    if (isUnbind) {
      // 延迟解除绑定
      setTimeout(() => {
        off(document, eventType[0], mouseHandler);
      }, 0);
    }
  };
  on(document, eventType[0], mouseHandler);
}
function createElement(str) {
  const element = create('div');
  element.innerHTML = str;
  return element.firstElementChild;
}
function createSandbox(el) {
  const html = el.innerHTML;
  el.innerHTML = '';
  const height = getStyle(el, null, 'min-height');
  const iframe = create('iframe');
  iframe.setAttribute('srcdoc', html);
  if (parseInt(height) > 0) {
    iframe.style.height = height;
  }
  el.appendChild(iframe);
}
function nomalizeTooltipContent(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
