import Lightbox from 'bs5-lightbox';

console.log("I am loaded lightbox", Lightbox);

const options = {
        keyboard: true
};

document.querySelectorAll('.parking-data-toggle-lightbox').forEach((el) => el.addEventListener('click', (e) => {
        e.preventDefault();
	consol.elog('el', el);
        const lightbox = new Lightbox(el, options);
        lightbox.show();
}));
