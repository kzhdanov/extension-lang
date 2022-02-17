const snfIframePath = '#snfiller iframe';
const contentId = 'content';

export const getSignNowIframe = (iframePath = snfIframePath) => {
  return window.document.querySelector(iframePath)
}

export const getContent = (snfFrame) => {
  return snfFrame.contentWindow.document.getElementById(contentId)
}
