/* Sqyl 个人主页 · 交互
   1) 导航高亮（scrollspy）
   2) 区块进入视口时淡入（尊重系统减弱动效设置） */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 导航高亮 ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var idMap = {};
  navLinks.forEach(function (a) {
    idMap[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && idMap[en.target.id]) {
          navLinks.forEach(function (a) { a.classList.remove('active'); });
          idMap[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---- 进入视口淡入 ---- */
  var reveals = document.querySelectorAll('.reveal');

  if (!reduced && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });

    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 标题按钮点击展开 / 收起（卡片其余区域不触发） ---- */
  function setOpen(root, open) {
    root.classList.toggle('open', open);
    var btn = root.querySelector('.exp-toggle');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.exp-toggle');
    if (!toggle) return;
    var root = toggle.closest('.exp-item');
    if (root) setOpen(root, !root.classList.contains('open'));
  });

  /* ---- 照片滚屏轮播 ---- */
  document.querySelectorAll('.carousel').forEach(function (c) {
    var wrap = c.closest('.car-wrap');
    var dots = wrap ? Array.prototype.slice.call(wrap.querySelectorAll('.car-dots button')) : [];
    var prev = wrap ? wrap.querySelector('.car-prev') : null;
    var next = wrap ? wrap.querySelector('.car-next') : null;

    function step() {
      var f = c.querySelector('figure');
      return f ? f.getBoundingClientRect().width + 10 : c.clientWidth * 0.85;
    }

    function update() {
      var i = Math.round(c.scrollLeft / step());
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    }

    c.addEventListener('scroll', function () {
      window.requestAnimationFrame(update);
    }, { passive: true });

    if (prev) prev.addEventListener('click', function () { c.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { c.scrollBy({ left: step(), behavior: 'smooth' }); });
    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { c.scrollTo({ left: k * step(), behavior: 'smooth' }); });
    });

    update();
  });
})();
