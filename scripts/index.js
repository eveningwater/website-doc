const leftListElement = $('#app #left-list');
const rightContentElement = $('#right-content');
const headerContentElement = $('.header-content');
const dateElement = $('.header-content .date');
const logoElement = $('.header .logo');
const toTopElement = $('.to-top');
const treePanel = $('#toggleAnchorPanel');
const toggleAnchorBtn = $('#toggleAnchor');
// mobile
const leftMenu = $('#left-menu');
// 文档配置
let params = location.search;
let docKey = params.slice(params.indexOf('=') + 1);
function watchURL() {
  params = location.search || '?type=' + defaultDoc;
  docKey = params.slice(params.indexOf('=') + 1);
  if (!__DEV__) {
    if (!params || location.href.indexOf('index.html') === -1) {
      const newURL = location.origin + '/docs/index.html?type=' + defaultDoc;
      return location.replace(newURL);
    }
    if (!docDetail.hasOwnProperty(docKey)) {
      const path = location.pathname.slice(
        0,
        location.pathname.indexOf('.html') + 5
      );
      const newURL = location.origin + path + '?type=' + defaultDoc;
      return location.replace(newURL);
    }
  }
}
function createCurrentDate() {
  const date = new Date();
  return formatTime(date);
}
function setCurrentDate() {
  return setTimeout(() => {
    dateElement.textContent = createCurrentDate();
    setCurrentDate();
  }, 1000);
}

function storeDocData(defaultDocType) {
  const params = location.search || '?type=' + defaultDocType;
  const docType = params.slice(params.indexOf('=') + 1);
  localStorage.setItem('docType', docType);
}
/**
 * 缓存阅读记录
 * @param {*} defaultDocType
 * @returns
 */
function storeNav(defaultDocType) {
  return new Promise((resolve, reject) => {
    if (isMobile) {
      document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState;
        if (state === 'hidden') {
          storeDocData(defaultDocType);
        } else {
          try {
            const storeDocType = localStorage.getItem('docType');
            if (!storeDocType) {
              return;
            }
            const params = location.search || '?type=' + defaultDocType;
            const docType = params.slice(params.indexOf('=') + 1);
            ewConfirm({
              content: '是否回到上一次阅读的位置?',
              showCancel: true,
              sure: context => {
                if (docType === storeDocType) {
                  resolve({ storeDocType, context });
                } else {
                  const newURL =
                    location.origin +
                    '/index.html?type=' +
                    storeDocType.docType;
                  location.replace(newURL);
                  resolve({ storeDocType, context });
                }
              }
            });
          } catch (error) {
            reject(error);
          }
        }
      });
    }
  });
}

function renderNavList(data) {
  // console.log(data);
  const container = create('ul');
  let containerHTML = '';
  if (!data.length) return;
  data.forEach(nav => {
    containerHTML += `<li>
            <a href="javascript:void 0;" data-url=${JSON.stringify(
              nav
            )}>${nav}</a>
            <div class="tooltip">
                <div class="arrow"></div>
                ${nav}
            </div>
        </li>`;
  });
  container.innerHTML = containerHTML;
  leftListElement.appendChild(container);
  onHandlerNav(leftListElement, data);
  storeNav(defaultDoc, rightContentElement.scrollTop).then(
    ({ storeDocType, context }) => {
      const { icon, title, subTitle } = docDetail[storeDocType];
      setLogo(icon);
      setBrowserIcon(icon);
      setDocTitle(title, subTitle);
      setBrowserTitle(title, subTitle);
      const chapter = localStorage.getItem('chapter') || defaultChapter;
      requestContent(data[chapter], data).then(() => {
        const currentScrollTop = +localStorage.getItem('scrollTop') || 0;
        scrollTop(rightContentElement, currentScrollTop, 500);
        context.close();
      });
    }
  );
  requestContent(data[defaultChapter], data);
  localStorage.setItem('chapter', defaultChapter);
  createPopper(leftListElement, 'li', 'right', 'fixed', [
    {
      name: 'offset',
      options: {
        offset: [10, -5]
      }
    }
  ]);
}
function createPopper(
  parent,
  childTag,
  placement,
  position = 'fixed',
  modifiers = []
) {
  let show = (tooltip, popperInstance, modifiers = []) => {
    tooltip.style.display = 'block';
    popperInstance.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: true }].concat(modifiers)
    });
    popperInstance.update();
  };
  let hide = (tooltip, popperInstance, modifiers = []) => {
    tooltip.style.display = 'none';
    popperInstance.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: false }].concat(modifiers)
    });
  };
  let createPopperHandler = (btn, tooltip) => {
    const popperInstance = Popper.createPopper(btn, tooltip, {
      placement: placement,
      strategy: position,
      modifiers: modifiers
    });
    hide(tooltip, popperInstance);
    return popperInstance;
  };
  const buttons = parent.querySelectorAll(childTag),
    tooltips = parent.querySelectorAll('.tooltip');
  buttons.forEach((btn, index) => {
    const popperInstance = createPopperHandler(btn, tooltips[index]);
    on(btn, 'mouseenter', () => {
      show(tooltips[index], popperInstance, modifiers);
    });
    on(btn, 'mouseleave', () => {
      hide(tooltips[index], popperInstance, modifiers);
    });
  });
}
function onHandlerNav(el, navList) {
  on(el, 'click', e => {
    if (e.target.tagName.toLowerCase() === 'a') {
      const url = e.target.getAttribute('data-url');
      if (getLeftMenuStatus() && hasClass(leftListElement, 'show')) {
        leftListElement.classList.remove('show');
      }
      const chapter = navList.indexOf(url) !== -1 ? navList.indexOf(url) : 0;
      localStorage.setItem('chapter', chapter);
      requestContent(url, navList);
    }
  });
}
function requestContent(contentURL, navList) {
  rightContentElement.innerHTML = this.createLoading();
  const loading = rightContentElement.querySelector('.loading-container');
  setLoading(loading, 'block');
  return new Promise((resolve, reject) => {
    requestGet(
      './docs/' + docDetail[docKey].content.detail + '/' + contentURL + '.md'
    )
      .then(res => {
        if (res.status === 200) {
          setLoading(loading, 'none');
          rightContentElement.innerHTML = markedTemplate(res.data);
          // 图片预览
          $$('.image-container img').forEach(item => {
            on(item, 'click', () => new ewViewer(item));
          });
          // 回到顶部
          toTop(toTopElement, rightContentElement);
          // 设置索引
          const h1Element = $('.right-content h1');
          h1Element.textContent =
            new NumberToChinese(navList.indexOf(contentURL) + 1).toLower() +
            '、' +
            h1Element.textContent;
          createAnchor(normalizeNavData(rightContentElement)).then(panel => {
            createPopper(panel, '.anchor-item', 'left', 'fixed', [
              {
                name: 'offset',
                options: {
                  offset: [5, 5]
                }
              }
            ]);
          });
          const iframeElements = $$('.right-content iframe');
          setIframeHeight(iframeElements);
          const tableElements = $$('.right-content table');
          if (tableElements.length) {
            tableElements.forEach(table => {
              table.insertAdjacentHTML(
                'afterend',
                `<div class="table-wrapper"><table>${table.innerHTML}</table></div>`
              );
              setTimeout(() => {
                if (table.parentElement) {
                  // remove origin node
                  table.parentElement.removeChild(table);
                }
              }, 0);
            });
          }
          const chapterButtons = $$('.right-content .link-btn');
          chapterButtons.forEach(btn =>
            on(btn, 'click', e => {
              const url = e.target.getAttribute('data-to');
              requestContent(url, navList);
            })
          );

          const codeElements = $$('pre');
          if (codeElements && codeElements.length) {
            codeElements.forEach(code => {
              if (!hasClass(code.parentElement, 'ew-code-compiler')) {
                code.appendChild(createElement(fullscreen));
              }
            });
            const addCursor = el => {
              if (hasClass(el, 'code-fullscreen')) {
                el.style.cursor = 'pointer';
              } else {
                el.style.cursor = '';
              }
            };

            codeElements.forEach(code => {
              addCursor(code);
              on(code, 'click', e => {
                if (hasClass(code, 'code-fullscreen')) {
                  code.classList.remove('code-fullscreen');
                } else {
                  if (
                    ['svg', 'path'].includes(e.target.tagName.toLowerCase())
                  ) {
                    code.classList.toggle('code-fullscreen');
                  }
                }
                addCursor(code);
              });
            });
          }
          const hoverInfoElements = $$('.right-content .hover-info');
          if (hoverInfoElements) {
            hoverInfoElements.forEach(item => {
              const tooltipContent = item.getAttribute('data-title');

              const hoverInfoTooltip = createElement(
                `<div class="hover-info-tooltip tooltip"><div class="arrow"></div>${nomalizeTooltipContent(
                  tooltipContent
                )}</div>`
              );
              item.appendChild(hoverInfoTooltip);
            });
            createPopper(
              rightContentElement,
              '.hover-info',
              'bottom',
              'absolute',
              [
                {
                  name: 'offset',
                  options: {
                    offset: [5, 5]
                  }
                }
              ]
            );
          }
          const allLinks = $$('.right-content a');
          if (allLinks) {
            allLinks.forEach(link => link.setAttribute('target', '_blank'));
          }
          const allCodeCompilerElements = $$(
            '.right-content .ew-code-compiler'
          );
          if (allCodeCompilerElements) {
            allCodeCompilerElements.forEach(item => createSandbox(item));
          }
          if ($('#drawIframe')) {
            initPiKaQiu();
          }
          const allCode = $$('.right-content pre code');
          if (allCode) {
            allCode.forEach(code => {
              if (code.hasAttribute('data-lang')) {
                const lang = code.getAttribute('data-lang');
                const text = code.textContent;
                code.innerHTML = hljs.highlightAuto(text, [lang]).value;
              }
            });
          }
          resolve();
        }
      })
      .catch(error => {
        $message.error('请求文档失败,可能文档正在编写中...!');
        reject(error);
      });
  });
}
function createAnchor(data) {
  return new Promise((resolve, reject) => {
    let container = '';
    data.forEach(item => {
      container += `
                <div class="anchor-item anchor-item-${item.level}" data-to=${
        item.id
      }>
                    ${item.label.replace('<', '&lt;').replace('>', '&gt;')}
                    <div class="tooltip">
                        <div class="arrow"></div>
                        ${item.label.replace('<', '&lt;').replace('>', '&gt;')}
                    </div>
                </div>
            `;
    });
    treePanel.innerHTML = container;
    const children = treePanel.children;
    toArray(children).forEach(item => {
      on(item, 'click', () => {
        const currentId = item.getAttribute('data-to');
        const toElement = $('#' + currentId);
        scrollTop(rightContentElement, toElement.offsetTop, 500);
      });
    });
    resolve(treePanel);
  });
}
function getPanelStatus() {
  return getStyle(treePanel, null, 'visibility') === 'hidden';
}
function getLeftMenuStatus() {
  return getStyle(leftMenu, null, 'display') === 'block';
}
function setVisiblePanel(status) {
  return (treePanel.style.visibility = status ? 'visible' : 'hidden');
}
function normalizeNavData(parentElement) {
  const navData = [];
  const children = toArray(parentElement.children).filter(el =>
    el.tagName.toLowerCase().match(/h[1-6]/)
  );
  children.forEach(el => {
    navData.push({
      label: el.textContent,
      level: el.tagName.slice(-1) - 0,
      id: el.getAttribute('id')
    });
  });
  return navData;
}
function setLogo(url) {
  const image = logoElement.querySelector('img');
  image.setAttribute('src', url);
  on(logoElement, 'click', () => new ewViewer(image));
}
function setDocTitle(title, subTitle) {
  const titleElement = $('.header-content h3');
  titleElement.textContent = title;
  if (subTitle) {
    const subTitleElement = create('h5');
    subTitleElement.textContent = subTitle;
    headerContentElement.insertBefore(
      subTitleElement,
      titleElement.nextSibling
    );
  }
}
function setBrowserIcon(url) {
  return $('#icon-element').setAttribute('href', url);
}
function setBrowserTitle(title, subTitle) {
  return (document.title = subTitle ? title + subTitle : title);
}
function setIframeHeight(elements) {
  elements.forEach(item => {
    on(item, 'load', () => {
      const outerHeight =
        item.contentWindow.document.querySelector('html').scrollHeight + 34;
      item.style.height = outerHeight + 'px';
    });
  });
}
function onHandleLeftMenu() {
  if (getLeftMenuStatus()) {
    on(leftMenu, 'click', () => {
      if (!leftListElement.children.length) return;
      if (hasClass(leftListElement, 'show')) {
        leftListElement.classList.remove('show');
      } else {
        leftListElement.classList.add('show');
      }
    });
  }
}
window.onload = function () {
  setCurrentDate();
  watchURL();
  if (!__DEV__) {
    on(window, 'hashchange', watchURL);
  }
  const { icon, title, subTitle, content } = docDetail[docKey];
  requestGet('./docs/' + content.nav).then(res => {
    if (res.status === 200) renderNavList(res.data);
  });
  setLogo(icon);
  setBrowserIcon(icon);
  setDocTitle(title, subTitle);
  setBrowserTitle(title, subTitle);
  on(toggleAnchorBtn, 'click', e => {
    setVisiblePanel(getPanelStatus());
  });
  baseClickOutSide(treePanel, false, () => {
    if (!getPanelStatus()) {
      setVisiblePanel(false);
    }
  });
  onHandleLeftMenu();
  on(window, 'resize', () => onHandleLeftMenu());
  on(rightContentElement, 'click', () => {
    if (getLeftMenuStatus() && hasClass(leftListElement, 'show')) {
      leftListElement.classList.remove('show');
    }
  });
  on(rightContentElement, 'scroll', () => {
    localStorage.setItem('scrollTop', rightContentElement.scrollTop);
  });
};
