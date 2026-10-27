export const PRELOADER_MIN_SHOW = 1400;
export const PRELOADER_SAFETY = 10000;
export const PRELOADER_EXIT = 900;
/** Событие на window, когда шторка начала уезжать — по нему Lenis снова включается. */
export const PRELOADER_DONE_EVENT = "faktura:preloader-done";

/**
 * Инлайн-скрипт в <head>: ставит `js` и включает прелоадер до первой отрисовки на каждой полной
 * загрузке страницы (переходы внутри сайта его не показывают — layout не перемонтируется).
 * При prefers-reduced-motion прелоадера нет. Страховка: через 10с снимает его сам,
 * даже если бандл не загрузился.
 */
export const preloaderScript = `(function(){var h=document.documentElement;h.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;}catch(e){}h.classList.add('is-loading');setTimeout(function(){h.classList.remove('is-loading')},${PRELOADER_SAFETY});})();`;
