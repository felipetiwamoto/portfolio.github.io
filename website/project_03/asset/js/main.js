(async () => {
	$("select").niceSelect();

	const convertImages = (selector, callback) => {
		const images = document.querySelectorAll(selector);

		images.forEach((image) => {
			fetch(image.src)
				.then((res) => res.text())
				.then((data) => {
					const parser = new DOMParser();
					const svg = parser.parseFromString(data, "image/svg+xml").querySelector("svg");

					if (image.id) svg.id = image.id;
					if (image.className) svg.classList = image.classList;

					image.parentNode.replaceChild(svg, image);
				})
				.then(callback)
				.catch((error) => console.error(error));
		});
	};
	convertImages(`img[src$=".svg"].svg`);
})();
