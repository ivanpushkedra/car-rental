"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["showGallery"],{

/***/ "./assets/js/_lightbox.js":
/*!********************************!*\
  !*** ./assets/js/_lightbox.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bs5_lightbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bs5-lightbox */ "./node_modules/bs5-lightbox/src/index.js");




console.log("I am loaded lightbox", bs5_lightbox__WEBPACK_IMPORTED_MODULE_3__["default"]);
var options = {
  keyboard: true
};
document.querySelectorAll('.parking-data-toggle-lightbox').forEach(function (el) {
  return el.addEventListener('click', function (e) {
    e.preventDefault();
    consol.elog('el', el);
    var lightbox = new bs5_lightbox__WEBPACK_IMPORTED_MODULE_3__["default"](el, options);
    lightbox.show();
  });
});

/***/ }),

/***/ "./node_modules/bs5-lightbox/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/bs5-lightbox/src/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/**
 * Lightbox for Bootstrap 5
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */


const bootstrap = {
	Modal: bootstrap__WEBPACK_IMPORTED_MODULE_0__.Modal,
	Carousel: bootstrap__WEBPACK_IMPORTED_MODULE_0__.Carousel
};
class Lightbox {
	constructor(el, options = {}) {
		this.hash = this.randomHash();
		this.settings = Object.assign(Object.assign(Object.assign({}, bootstrap.Modal.Default), bootstrap.Carousel.Default), {
			interval: false,
			target: '[data-toggle="lightbox"]',
			gallery: '',
			size: 'xl',
			constrain: true
		});
		this.settings = Object.assign(Object.assign({}, this.settings), options);
		this.modalOptions = (() => this.setOptionsFromSettings(bootstrap.Modal.Default))();
		this.carouselOptions = (() => this.setOptionsFromSettings(bootstrap.Carousel.Default))();
		if (typeof el === 'string') {
			this.settings.target = el;
			el = document.querySelector(this.settings.target);
		}
		this.el = el;
		this.type = el.dataset.type || '';

		this.src = this.getSrc(el);
		this.sources = this.getGalleryItems();
		this.createCarousel();
		this.createModal();
	}
	show() {
		document.body.appendChild(this.modalElement);
		this.modal.show();
	}
	hide() {
		this.modal.hide();
	}
	setOptionsFromSettings(obj) {
		return Object.keys(obj).reduce((p, c) => Object.assign(p, { [c]: this.settings[c] }), {});
	}
	getSrc(el) {
		let src = el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';
		if (el.dataset.type === 'html') {
			return src;
		}
		if (!/\:\/\//.test(src)) {
			src = window.location.origin + src;
		}
		const url = new URL(src);
		if (el.dataset.footer || el.dataset.caption) {
			url.searchParams.set('caption', el.dataset.footer || el.dataset.caption);
		}
		return url.toString();
	}
	getGalleryItems() {
		let galleryTarget;
		if (this.settings.gallery) {
			if (Array.isArray(this.settings.gallery)) {
				return this.settings.gallery;
			}
			galleryTarget = this.settings.gallery;
		} else if (this.el.dataset.gallery) {
			galleryTarget = this.el.dataset.gallery;
		}
		const gallery = galleryTarget
			? [...new Set(Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`), (v) => `${v.dataset.type ? v.dataset.type : ''}${this.getSrc(v)}`))]
			: [`${this.type ? this.type : ''}${this.src}`];
		return gallery;
	}
	getYoutubeId(src) {
		if (!src) return false;
		const matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
		return matches && matches[2].length === 11 ? matches[2] : false;
	}
	getYoutubeLink(src) {
		const youtubeId = this.getYoutubeId(src);
		if (!youtubeId) {
			return false;
		}

		const arr = src.split('?');
		let params = arr.length > 1 ? '?' + arr[1] : '';
		
		return `https://www.youtube.com/embed/${youtubeId}${params}`;
	}
	getInstagramEmbed(src) {
		if (/instagram/.test(src)) {
			src += /\/embed$/.test(src) ? '' : '/embed';
			return `<iframe src="${src}" class="start-50 translate-middle-x" style="max-width: 500px" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
		}
	}
	isEmbed(src) {
		const regex = new RegExp('(' + Lightbox.allowedEmbedTypes.join('|') + ')');
		const isEmbed = regex.test(src);
		const isImg = /\.(png|jpe?g|gif|svg|webp)/i.test(src) || this.el.dataset.type === 'image';

		return isEmbed || !isImg;
	}
	createCarousel() {
		const template = document.createElement('template');
		const types = Lightbox.allowedMediaTypes.join('|');
		const slidesHtml = this.sources
			.map((src, i) => {
				src = src.replace(/\/$/, '');
				const regex = new RegExp(`^(${types})`, 'i');
				const isHtml = /^html/.test(src);
				const isForcedImage = /^image/.test(src);

				if (regex.test(src)) {
					src = src.replace(regex, '');
				}
				const imgClasses = this.settings.constrain ? 'mw-100 mh-100 h-auto w-auto m-auto top-0 end-0 bottom-0 start-0' : 'h-100 w-100';
				const params = new URLSearchParams(src.split('?')[1]);
				let caption = '';
				let url = src;
				if (params.get('caption')) {
					try {
						url = new URL(src);
						url.searchParams.delete('caption');
						url = url.toString();
					} catch (e) {
						url = src;
					}
					caption = `<p class="lightbox-caption m-0 p-2 text-center text-white small"><em>${params.get('caption')}</em></p>`;
				}
				let inner = `<img src="${url}" class="d-block ${imgClasses} img-fluid" style="z-index: 1; object-fit: contain;" />`;
				let attributes = '';
				const instagramEmbed = this.getInstagramEmbed(src);
				const youtubeLink = this.getYoutubeLink(src);
				if (this.isEmbed(src) && !isForcedImage) {
					if (youtubeLink) {
						src = youtubeLink;
						attributes = 'title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"';
					}
					inner = instagramEmbed || `<iframe src="${src}" ${attributes} allowfullscreen></iframe>`;
				}
				if (isHtml) {
					inner = src;
				}
				const spinner = `<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem height: 3rem" role="status"></div></div>`;
				return `
				<div class="carousel-item ${!i ? 'active' : ''}" style="min-height: 100px">
					${spinner}
					<div class="ratio ratio-16x9" style="background-color: #000;">${inner}</div>
					${caption}
				</div>`;
			})
			.join('');
		const controlsHtml =
			this.sources.length < 2
				? ''
				: `
			<button id="#lightboxCarousel-${this.hash}-prev" class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button id="#lightboxCarousel-${this.hash}-next" class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>`;
		let classes = 'lightbox-carousel carousel slide';
		if (this.settings.size === 'fullscreen') {
			classes += ' position-absolute w-100 translate-middle top-50 start-50';
		}
		const html = `
			<div id="lightboxCarousel-${this.hash}" class="${classes}" data-bs-ride="carousel" data-bs-interval="${this.carouselOptions.interval}">
				<div class="carousel-inner">
					${slidesHtml}
				</div>
				${controlsHtml}
			</div>`;
		template.innerHTML = html.trim();
		this.carouselElement = template.content.firstChild;
		const carouselOptions = Object.assign(Object.assign({}, this.carouselOptions), { keyboard: false });
		this.carousel = new bootstrap.Carousel(this.carouselElement, carouselOptions);
		const elSrc = this.type && this.type !== 'image' ? this.type + this.src : this.src;
		this.carousel.to(this.findGalleryItemIndex(this.sources, elSrc));
		if (this.carouselOptions.keyboard === true) {
			document.addEventListener('keydown', (e) => {
				if (e.code === 'ArrowLeft') {
					const prev = document.getElementById(`#lightboxCarousel-${this.hash}-prev`);
					if (prev) {
						prev.click();
					}
					return false;
				}
				if (e.code === 'ArrowRight') {
					const next = document.getElementById(`#lightboxCarousel-${this.hash}-next`);
					if (next) {
						next.click();
					}
					return false;
				}
			});
		}
		return this.carousel;
	}
	findGalleryItemIndex(haystack, needle) {
		let index = 0;
		for (const item of haystack) {
			if (item.includes(needle)) {
				return index;
			}
			index++;
		}
		return 0;
	}
	createModal() {
		const template = document.createElement('template');
		const btnInner =
			'<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>';
		const html = `
			<div class="modal lightbox fade" id="lightboxModal-${this.hash}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-${this.settings.size}">
					<div class="modal-content border-0 bg-transparent">
						<div class="modal-body p-0">
							<button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2; background: none;">${btnInner}</button>
						</div>
					</div>
				</div>
			</div>`;
		template.innerHTML = html.trim();
		this.modalElement = template.content.firstChild;
		this.modalElement.querySelector('.modal-body').appendChild(this.carouselElement);
		this.modalElement.addEventListener('hidden.bs.modal', () => this.modalElement.remove());
		this.modalElement.querySelector('[data-bs-dismiss]').addEventListener('click', () => this.modal.hide());
		this.modal = new bootstrap.Modal(this.modalElement, this.modalOptions);
		return this.modal;
	}
	randomHash(length = 8) {
		return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
	}
}
Lightbox.allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'];
Lightbox.allowedMediaTypes = [...Lightbox.allowedEmbedTypes, 'image', 'html'];
Lightbox.defaultSelector = '[data-toggle="lightbox"]';
Lightbox.initialize = function (e) {
	e.preventDefault();
	const lightbox = new Lightbox(this);
	lightbox.show();
};
document.querySelectorAll(Lightbox.defaultSelector).forEach((el) => el.addEventListener('click', Lightbox.initialize));
if (typeof window !== 'undefined' && window.bootstrap) {
	window.bootstrap.Lightbox = Lightbox;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lightbox);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_bootstrap_dist_js_bootstrap_esm_js","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_obj-7bb33f"], () => (__webpack_exec__("./assets/js/_lightbox.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0Esd0RBQXdELDJCQUEyQixpQkFBaUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFVBQVU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFVBQVU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSxVQUFVO0FBQ2pGO0FBQ0Esd0RBQXdELFVBQVU7QUFDbEUsMkRBQTJELG1CQUFtQjtBQUM5RTtBQUNBO0FBQ0EsK0lBQStJLGlCQUFpQixJQUFJLFNBQVM7QUFDN0s7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsUUFBUSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL19saWdodGJveC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnM1LWxpZ2h0Ym94L3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlnaHRib3ggZnJvbSAnYnM1LWxpZ2h0Ym94JztcblxuY29uc29sZS5sb2coXCJJIGFtIGxvYWRlZCBsaWdodGJveFwiLCBMaWdodGJveCk7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGtleWJvYXJkOiB0cnVlXG59O1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFya2luZy1kYXRhLXRvZ2dsZS1saWdodGJveCcpLmZvckVhY2goKGVsKSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0Y29uc29sLmVsb2coJ2VsJywgZWwpO1xuICAgICAgICBjb25zdCBsaWdodGJveCA9IG5ldyBMaWdodGJveChlbCwgb3B0aW9ucyk7XG4gICAgICAgIGxpZ2h0Ym94LnNob3coKTtcbn0pKTtcbiIsIi8qKlxuICogTGlnaHRib3ggZm9yIEJvb3RzdHJhcCA1XG4gKlxuICogQGZpbGUgQ3JlYXRlcyBhIG1vZGFsIHdpdGggYSBsaWdodGJveCBjYXJvdXNlbC5cbiAqIEBtb2R1bGUgYnM1LWxpZ2h0Ym94XG4gKi9cblxuaW1wb3J0IHsgTW9kYWwsIENhcm91c2VsIH0gZnJvbSAnYm9vdHN0cmFwJztcbmNvbnN0IGJvb3RzdHJhcCA9IHtcblx0TW9kYWwsXG5cdENhcm91c2VsXG59O1xuY2xhc3MgTGlnaHRib3gge1xuXHRjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5oYXNoID0gdGhpcy5yYW5kb21IYXNoKCk7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBib290c3RyYXAuTW9kYWwuRGVmYXVsdCksIGJvb3RzdHJhcC5DYXJvdXNlbC5EZWZhdWx0KSwge1xuXHRcdFx0aW50ZXJ2YWw6IGZhbHNlLFxuXHRcdFx0dGFyZ2V0OiAnW2RhdGEtdG9nZ2xlPVwibGlnaHRib3hcIl0nLFxuXHRcdFx0Z2FsbGVyeTogJycsXG5cdFx0XHRzaXplOiAneGwnLFxuXHRcdFx0Y29uc3RyYWluOiB0cnVlXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZXR0aW5ncyksIG9wdGlvbnMpO1xuXHRcdHRoaXMubW9kYWxPcHRpb25zID0gKCgpID0+IHRoaXMuc2V0T3B0aW9uc0Zyb21TZXR0aW5ncyhib290c3RyYXAuTW9kYWwuRGVmYXVsdCkpKCk7XG5cdFx0dGhpcy5jYXJvdXNlbE9wdGlvbnMgPSAoKCkgPT4gdGhpcy5zZXRPcHRpb25zRnJvbVNldHRpbmdzKGJvb3RzdHJhcC5DYXJvdXNlbC5EZWZhdWx0KSkoKTtcblx0XHRpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncy50YXJnZXQgPSBlbDtcblx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLnRhcmdldCk7XG5cdFx0fVxuXHRcdHRoaXMuZWwgPSBlbDtcblx0XHR0aGlzLnR5cGUgPSBlbC5kYXRhc2V0LnR5cGUgfHwgJyc7XG5cblx0XHR0aGlzLnNyYyA9IHRoaXMuZ2V0U3JjKGVsKTtcblx0XHR0aGlzLnNvdXJjZXMgPSB0aGlzLmdldEdhbGxlcnlJdGVtcygpO1xuXHRcdHRoaXMuY3JlYXRlQ2Fyb3VzZWwoKTtcblx0XHR0aGlzLmNyZWF0ZU1vZGFsKCk7XG5cdH1cblx0c2hvdygpIHtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWxFbGVtZW50KTtcblx0XHR0aGlzLm1vZGFsLnNob3coKTtcblx0fVxuXHRoaWRlKCkge1xuXHRcdHRoaXMubW9kYWwuaGlkZSgpO1xuXHR9XG5cdHNldE9wdGlvbnNGcm9tU2V0dGluZ3Mob2JqKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChwLCBjKSA9PiBPYmplY3QuYXNzaWduKHAsIHsgW2NdOiB0aGlzLnNldHRpbmdzW2NdIH0pLCB7fSk7XG5cdH1cblx0Z2V0U3JjKGVsKSB7XG5cdFx0bGV0IHNyYyA9IGVsLmRhdGFzZXQuc3JjIHx8IGVsLmRhdGFzZXQucmVtb3RlIHx8IGVsLmhyZWYgfHwgJ2h0dHA6Ly92aWEucGxhY2Vob2xkZXIuY29tLzE2MDB4OTAwJztcblx0XHRpZiAoZWwuZGF0YXNldC50eXBlID09PSAnaHRtbCcpIHtcblx0XHRcdHJldHVybiBzcmM7XG5cdFx0fVxuXHRcdGlmICghL1xcOlxcL1xcLy8udGVzdChzcmMpKSB7XG5cdFx0XHRzcmMgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgc3JjO1xuXHRcdH1cblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKHNyYyk7XG5cdFx0aWYgKGVsLmRhdGFzZXQuZm9vdGVyIHx8IGVsLmRhdGFzZXQuY2FwdGlvbikge1xuXHRcdFx0dXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2NhcHRpb24nLCBlbC5kYXRhc2V0LmZvb3RlciB8fCBlbC5kYXRhc2V0LmNhcHRpb24pO1xuXHRcdH1cblx0XHRyZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG5cdH1cblx0Z2V0R2FsbGVyeUl0ZW1zKCkge1xuXHRcdGxldCBnYWxsZXJ5VGFyZ2V0O1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmdhbGxlcnkpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2V0dGluZ3MuZ2FsbGVyeSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MuZ2FsbGVyeTtcblx0XHRcdH1cblx0XHRcdGdhbGxlcnlUYXJnZXQgPSB0aGlzLnNldHRpbmdzLmdhbGxlcnk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmVsLmRhdGFzZXQuZ2FsbGVyeSkge1xuXHRcdFx0Z2FsbGVyeVRhcmdldCA9IHRoaXMuZWwuZGF0YXNldC5nYWxsZXJ5O1xuXHRcdH1cblx0XHRjb25zdCBnYWxsZXJ5ID0gZ2FsbGVyeVRhcmdldFxuXHRcdFx0PyBbLi4ubmV3IFNldChBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWdhbGxlcnk9XCIke2dhbGxlcnlUYXJnZXR9XCJdYCksICh2KSA9PiBgJHt2LmRhdGFzZXQudHlwZSA/IHYuZGF0YXNldC50eXBlIDogJyd9JHt0aGlzLmdldFNyYyh2KX1gKSldXG5cdFx0XHQ6IFtgJHt0aGlzLnR5cGUgPyB0aGlzLnR5cGUgOiAnJ30ke3RoaXMuc3JjfWBdO1xuXHRcdHJldHVybiBnYWxsZXJ5O1xuXHR9XG5cdGdldFlvdXR1YmVJZChzcmMpIHtcblx0XHRpZiAoIXNyYykgcmV0dXJuIGZhbHNlO1xuXHRcdGNvbnN0IG1hdGNoZXMgPSBzcmMubWF0Y2goL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXwmdj0pKFteIyY/XSopLiovKTtcblx0XHRyZXR1cm4gbWF0Y2hlcyAmJiBtYXRjaGVzWzJdLmxlbmd0aCA9PT0gMTEgPyBtYXRjaGVzWzJdIDogZmFsc2U7XG5cdH1cblx0Z2V0WW91dHViZUxpbmsoc3JjKSB7XG5cdFx0Y29uc3QgeW91dHViZUlkID0gdGhpcy5nZXRZb3V0dWJlSWQoc3JjKTtcblx0XHRpZiAoIXlvdXR1YmVJZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFyciA9IHNyYy5zcGxpdCgnPycpO1xuXHRcdGxldCBwYXJhbXMgPSBhcnIubGVuZ3RoID4gMSA/ICc/JyArIGFyclsxXSA6ICcnO1xuXHRcdFxuXHRcdHJldHVybiBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt5b3V0dWJlSWR9JHtwYXJhbXN9YDtcblx0fVxuXHRnZXRJbnN0YWdyYW1FbWJlZChzcmMpIHtcblx0XHRpZiAoL2luc3RhZ3JhbS8udGVzdChzcmMpKSB7XG5cdFx0XHRzcmMgKz0gL1xcL2VtYmVkJC8udGVzdChzcmMpID8gJycgOiAnL2VtYmVkJztcblx0XHRcdHJldHVybiBgPGlmcmFtZSBzcmM9XCIke3NyY31cIiBjbGFzcz1cInN0YXJ0LTUwIHRyYW5zbGF0ZS1taWRkbGUteFwiIHN0eWxlPVwibWF4LXdpZHRoOiA1MDBweFwiIGZyYW1lYm9yZGVyPVwiMFwiIHNjcm9sbGluZz1cIm5vXCIgYWxsb3d0cmFuc3BhcmVuY3k9XCJ0cnVlXCI+PC9pZnJhbWU+YDtcblx0XHR9XG5cdH1cblx0aXNFbWJlZChzcmMpIHtcblx0XHRjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJygnICsgTGlnaHRib3guYWxsb3dlZEVtYmVkVHlwZXMuam9pbignfCcpICsgJyknKTtcblx0XHRjb25zdCBpc0VtYmVkID0gcmVnZXgudGVzdChzcmMpO1xuXHRcdGNvbnN0IGlzSW1nID0gL1xcLihwbmd8anBlP2d8Z2lmfHN2Z3x3ZWJwKS9pLnRlc3Qoc3JjKSB8fCB0aGlzLmVsLmRhdGFzZXQudHlwZSA9PT0gJ2ltYWdlJztcblxuXHRcdHJldHVybiBpc0VtYmVkIHx8ICFpc0ltZztcblx0fVxuXHRjcmVhdGVDYXJvdXNlbCgpIHtcblx0XHRjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG5cdFx0Y29uc3QgdHlwZXMgPSBMaWdodGJveC5hbGxvd2VkTWVkaWFUeXBlcy5qb2luKCd8Jyk7XG5cdFx0Y29uc3Qgc2xpZGVzSHRtbCA9IHRoaXMuc291cmNlc1xuXHRcdFx0Lm1hcCgoc3JjLCBpKSA9PiB7XG5cdFx0XHRcdHNyYyA9IHNyYy5yZXBsYWNlKC9cXC8kLywgJycpO1xuXHRcdFx0XHRjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYF4oJHt0eXBlc30pYCwgJ2knKTtcblx0XHRcdFx0Y29uc3QgaXNIdG1sID0gL15odG1sLy50ZXN0KHNyYyk7XG5cdFx0XHRcdGNvbnN0IGlzRm9yY2VkSW1hZ2UgPSAvXmltYWdlLy50ZXN0KHNyYyk7XG5cblx0XHRcdFx0aWYgKHJlZ2V4LnRlc3Qoc3JjKSkge1xuXHRcdFx0XHRcdHNyYyA9IHNyYy5yZXBsYWNlKHJlZ2V4LCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgaW1nQ2xhc3NlcyA9IHRoaXMuc2V0dGluZ3MuY29uc3RyYWluID8gJ213LTEwMCBtaC0xMDAgaC1hdXRvIHctYXV0byBtLWF1dG8gdG9wLTAgZW5kLTAgYm90dG9tLTAgc3RhcnQtMCcgOiAnaC0xMDAgdy0xMDAnO1xuXHRcdFx0XHRjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHNyYy5zcGxpdCgnPycpWzFdKTtcblx0XHRcdFx0bGV0IGNhcHRpb24gPSAnJztcblx0XHRcdFx0bGV0IHVybCA9IHNyYztcblx0XHRcdFx0aWYgKHBhcmFtcy5nZXQoJ2NhcHRpb24nKSkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR1cmwgPSBuZXcgVVJMKHNyYyk7XG5cdFx0XHRcdFx0XHR1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnY2FwdGlvbicpO1xuXHRcdFx0XHRcdFx0dXJsID0gdXJsLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0dXJsID0gc3JjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXB0aW9uID0gYDxwIGNsYXNzPVwibGlnaHRib3gtY2FwdGlvbiBtLTAgcC0yIHRleHQtY2VudGVyIHRleHQtd2hpdGUgc21hbGxcIj48ZW0+JHtwYXJhbXMuZ2V0KCdjYXB0aW9uJyl9PC9lbT48L3A+YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgaW5uZXIgPSBgPGltZyBzcmM9XCIke3VybH1cIiBjbGFzcz1cImQtYmxvY2sgJHtpbWdDbGFzc2VzfSBpbWctZmx1aWRcIiBzdHlsZT1cInotaW5kZXg6IDE7IG9iamVjdC1maXQ6IGNvbnRhaW47XCIgLz5gO1xuXHRcdFx0XHRsZXQgYXR0cmlidXRlcyA9ICcnO1xuXHRcdFx0XHRjb25zdCBpbnN0YWdyYW1FbWJlZCA9IHRoaXMuZ2V0SW5zdGFncmFtRW1iZWQoc3JjKTtcblx0XHRcdFx0Y29uc3QgeW91dHViZUxpbmsgPSB0aGlzLmdldFlvdXR1YmVMaW5rKHNyYyk7XG5cdFx0XHRcdGlmICh0aGlzLmlzRW1iZWQoc3JjKSAmJiAhaXNGb3JjZWRJbWFnZSkge1xuXHRcdFx0XHRcdGlmICh5b3V0dWJlTGluaykge1xuXHRcdFx0XHRcdFx0c3JjID0geW91dHViZUxpbms7XG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzID0gJ3RpdGxlPVwiWW91VHViZSB2aWRlbyBwbGF5ZXJcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvdz1cImFjY2VsZXJvbWV0ZXIgYXV0b3BsYXkgY2xpcGJvYXJkLXdyaXRlIGVuY3J5cHRlZC1tZWRpYSBneXJvc2NvcGUgcGljdHVyZS1pbi1waWN0dXJlXCInO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbm5lciA9IGluc3RhZ3JhbUVtYmVkIHx8IGA8aWZyYW1lIHNyYz1cIiR7c3JjfVwiICR7YXR0cmlidXRlc30gYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPmA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzSHRtbCkge1xuXHRcdFx0XHRcdGlubmVyID0gc3JjO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IHNwaW5uZXIgPSBgPGRpdiBjbGFzcz1cInBvc2l0aW9uLWFic29sdXRlIHRvcC01MCBzdGFydC01MCB0cmFuc2xhdGUtbWlkZGxlIHRleHQtd2hpdGVcIj48ZGl2IGNsYXNzPVwic3Bpbm5lci1ib3JkZXJcIiBzdHlsZT1cIndpZHRoOiAzcmVtIGhlaWdodDogM3JlbVwiIHJvbGU9XCJzdGF0dXNcIj48L2Rpdj48L2Rpdj5gO1xuXHRcdFx0XHRyZXR1cm4gYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaXRlbSAkeyFpID8gJ2FjdGl2ZScgOiAnJ31cIiBzdHlsZT1cIm1pbi1oZWlnaHQ6IDEwMHB4XCI+XG5cdFx0XHRcdFx0JHtzcGlubmVyfVxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyYXRpbyByYXRpby0xNng5XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1wiPiR7aW5uZXJ9PC9kaXY+XG5cdFx0XHRcdFx0JHtjYXB0aW9ufVxuXHRcdFx0XHQ8L2Rpdj5gO1xuXHRcdFx0fSlcblx0XHRcdC5qb2luKCcnKTtcblx0XHRjb25zdCBjb250cm9sc0h0bWwgPVxuXHRcdFx0dGhpcy5zb3VyY2VzLmxlbmd0aCA8IDJcblx0XHRcdFx0PyAnJ1xuXHRcdFx0XHQ6IGBcblx0XHRcdDxidXR0b24gaWQ9XCIjbGlnaHRib3hDYXJvdXNlbC0ke3RoaXMuaGFzaH0tcHJldlwiIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbCBjYXJvdXNlbC1jb250cm9sLXByZXYgaC03NSBtLWF1dG9cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1icy10YXJnZXQ9XCIjbGlnaHRib3hDYXJvdXNlbC0ke3RoaXMuaGFzaH1cIiBkYXRhLWJzLXNsaWRlPVwicHJldlwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPlByZXZpb3VzPC9zcGFuPlxuXHRcdFx0PC9idXR0b24+XG5cdFx0XHQ8YnV0dG9uIGlkPVwiI2xpZ2h0Ym94Q2Fyb3VzZWwtJHt0aGlzLmhhc2h9LW5leHRcIiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wgY2Fyb3VzZWwtY29udHJvbC1uZXh0IGgtNzUgbS1hdXRvXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYnMtdGFyZ2V0PVwiI2xpZ2h0Ym94Q2Fyb3VzZWwtJHt0aGlzLmhhc2h9XCIgZGF0YS1icy1zbGlkZT1cIm5leHRcIj5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj5OZXh0PC9zcGFuPlxuXHRcdFx0PC9idXR0b24+YDtcblx0XHRsZXQgY2xhc3NlcyA9ICdsaWdodGJveC1jYXJvdXNlbCBjYXJvdXNlbCBzbGlkZSc7XG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Muc2l6ZSA9PT0gJ2Z1bGxzY3JlZW4nKSB7XG5cdFx0XHRjbGFzc2VzICs9ICcgcG9zaXRpb24tYWJzb2x1dGUgdy0xMDAgdHJhbnNsYXRlLW1pZGRsZSB0b3AtNTAgc3RhcnQtNTAnO1xuXHRcdH1cblx0XHRjb25zdCBodG1sID0gYFxuXHRcdFx0PGRpdiBpZD1cImxpZ2h0Ym94Q2Fyb3VzZWwtJHt0aGlzLmhhc2h9XCIgY2xhc3M9XCIke2NsYXNzZXN9XCIgZGF0YS1icy1yaWRlPVwiY2Fyb3VzZWxcIiBkYXRhLWJzLWludGVydmFsPVwiJHt0aGlzLmNhcm91c2VsT3B0aW9ucy5pbnRlcnZhbH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcm91c2VsLWlubmVyXCI+XG5cdFx0XHRcdFx0JHtzbGlkZXNIdG1sfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0JHtjb250cm9sc0h0bWx9XG5cdFx0XHQ8L2Rpdj5gO1xuXHRcdHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuXHRcdHRoaXMuY2Fyb3VzZWxFbGVtZW50ID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuXHRcdGNvbnN0IGNhcm91c2VsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jYXJvdXNlbE9wdGlvbnMpLCB7IGtleWJvYXJkOiBmYWxzZSB9KTtcblx0XHR0aGlzLmNhcm91c2VsID0gbmV3IGJvb3RzdHJhcC5DYXJvdXNlbCh0aGlzLmNhcm91c2VsRWxlbWVudCwgY2Fyb3VzZWxPcHRpb25zKTtcblx0XHRjb25zdCBlbFNyYyA9IHRoaXMudHlwZSAmJiB0aGlzLnR5cGUgIT09ICdpbWFnZScgPyB0aGlzLnR5cGUgKyB0aGlzLnNyYyA6IHRoaXMuc3JjO1xuXHRcdHRoaXMuY2Fyb3VzZWwudG8odGhpcy5maW5kR2FsbGVyeUl0ZW1JbmRleCh0aGlzLnNvdXJjZXMsIGVsU3JjKSk7XG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxPcHRpb25zLmtleWJvYXJkID09PSB0cnVlKSB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcblx0XHRcdFx0aWYgKGUuY29kZSA9PT0gJ0Fycm93TGVmdCcpIHtcblx0XHRcdFx0XHRjb25zdCBwcmV2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCNsaWdodGJveENhcm91c2VsLSR7dGhpcy5oYXNofS1wcmV2YCk7XG5cdFx0XHRcdFx0aWYgKHByZXYpIHtcblx0XHRcdFx0XHRcdHByZXYuY2xpY2soKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlLmNvZGUgPT09ICdBcnJvd1JpZ2h0Jykge1xuXHRcdFx0XHRcdGNvbnN0IG5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgI2xpZ2h0Ym94Q2Fyb3VzZWwtJHt0aGlzLmhhc2h9LW5leHRgKTtcblx0XHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdFx0bmV4dC5jbGljaygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jYXJvdXNlbDtcblx0fVxuXHRmaW5kR2FsbGVyeUl0ZW1JbmRleChoYXlzdGFjaywgbmVlZGxlKSB7XG5cdFx0bGV0IGluZGV4ID0gMDtcblx0XHRmb3IgKGNvbnN0IGl0ZW0gb2YgaGF5c3RhY2spIHtcblx0XHRcdGlmIChpdGVtLmluY2x1ZGVzKG5lZWRsZSkpIHtcblx0XHRcdFx0cmV0dXJuIGluZGV4O1xuXHRcdFx0fVxuXHRcdFx0aW5kZXgrKztcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH1cblx0Y3JlYXRlTW9kYWwoKSB7XG5cdFx0Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuXHRcdGNvbnN0IGJ0bklubmVyID1cblx0XHRcdCc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAtNXB4O1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwiI2ZmZlwiPjxwYXRoIGQ9XCJNLjI5My4yOTNhMSAxIDAgMDExLjQxNCAwTDggNi41ODYgMTQuMjkzLjI5M2ExIDEgMCAxMTEuNDE0IDEuNDE0TDkuNDE0IDhsNi4yOTMgNi4yOTNhMSAxIDAgMDEtMS40MTQgMS40MTRMOCA5LjQxNGwtNi4yOTMgNi4yOTNhMSAxIDAgMDEtMS40MTQtMS40MTRMNi41ODYgOCAuMjkzIDEuNzA3YTEgMSAwIDAxMC0xLjQxNHpcIi8+PC9zdmc+Jztcblx0XHRjb25zdCBodG1sID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsIGxpZ2h0Ym94IGZhZGVcIiBpZD1cImxpZ2h0Ym94TW9kYWwtJHt0aGlzLmhhc2h9XCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZCBtb2RhbC0ke3RoaXMuc2V0dGluZ3Muc2l6ZX1cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudCBib3JkZXItMCBiZy10cmFuc3BhcmVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgcC0wXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWNsb3NlIHBvc2l0aW9uLWFic29sdXRlIHRvcC0wIGVuZC0wIHAtM1wiIGRhdGEtYnMtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgc3R5bGU9XCJ6LWluZGV4OiAyOyBiYWNrZ3JvdW5kOiBub25lO1wiPiR7YnRuSW5uZXJ9PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5gO1xuXHRcdHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuXHRcdHRoaXMubW9kYWxFbGVtZW50ID0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkO1xuXHRcdHRoaXMubW9kYWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5JykuYXBwZW5kQ2hpbGQodGhpcy5jYXJvdXNlbEVsZW1lbnQpO1xuXHRcdHRoaXMubW9kYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMubW9kYWxFbGVtZW50LnJlbW92ZSgpKTtcblx0XHR0aGlzLm1vZGFsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1icy1kaXNtaXNzXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5tb2RhbC5oaWRlKCkpO1xuXHRcdHRoaXMubW9kYWwgPSBuZXcgYm9vdHN0cmFwLk1vZGFsKHRoaXMubW9kYWxFbGVtZW50LCB0aGlzLm1vZGFsT3B0aW9ucyk7XG5cdFx0cmV0dXJuIHRoaXMubW9kYWw7XG5cdH1cblx0cmFuZG9tSGFzaChsZW5ndGggPSA4KSB7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGggfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzYpLnRvU3RyaW5nKDM2KSkuam9pbignJyk7XG5cdH1cbn1cbkxpZ2h0Ym94LmFsbG93ZWRFbWJlZFR5cGVzID0gWydlbWJlZCcsICd5b3V0dWJlJywgJ3ZpbWVvJywgJ2luc3RhZ3JhbScsICd1cmwnXTtcbkxpZ2h0Ym94LmFsbG93ZWRNZWRpYVR5cGVzID0gWy4uLkxpZ2h0Ym94LmFsbG93ZWRFbWJlZFR5cGVzLCAnaW1hZ2UnLCAnaHRtbCddO1xuTGlnaHRib3guZGVmYXVsdFNlbGVjdG9yID0gJ1tkYXRhLXRvZ2dsZT1cImxpZ2h0Ym94XCJdJztcbkxpZ2h0Ym94LmluaXRpYWxpemUgPSBmdW5jdGlvbiAoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdGNvbnN0IGxpZ2h0Ym94ID0gbmV3IExpZ2h0Ym94KHRoaXMpO1xuXHRsaWdodGJveC5zaG93KCk7XG59O1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChMaWdodGJveC5kZWZhdWx0U2VsZWN0b3IpLmZvckVhY2goKGVsKSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIExpZ2h0Ym94LmluaXRpYWxpemUpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYm9vdHN0cmFwKSB7XG5cdHdpbmRvdy5ib290c3RyYXAuTGlnaHRib3ggPSBMaWdodGJveDtcbn1cbmV4cG9ydCBkZWZhdWx0IExpZ2h0Ym94O1xuIl0sIm5hbWVzIjpbIkxpZ2h0Ym94IiwiY29uc29sZSIsImxvZyIsIm9wdGlvbnMiLCJrZXlib2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25zb2wiLCJlbG9nIiwibGlnaHRib3giLCJzaG93Il0sInNvdXJjZVJvb3QiOiIifQ==