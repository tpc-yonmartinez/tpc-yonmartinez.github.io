/**
 * @function scalejs
 */

export const scalejs = () => {
	// Properties
	let body_height = 0,
			viewport_height = 0, 
			viewport_top = 0, 
			viewport_bottom = 0,
			viewport_top_preview = -1,
			elements = [],
			elements_in_view = [],
			update_interval = 10,
			interV = 0
	let property_defaults = {
		'opacity': 1,
		'translatex': 0,
		'translatey': 0,
		'translatez': 0,
		'rotatex': 0,
		'rotatey': 0,
		'rotatez': 0,
		'scale': 1,
		'scalex': 1,
		'scaley': 1,
		'scalez': 1
	}
	// Easing functions
	let easing_functions = {
		'linear': (x) => { return x },
		'easeout': (x) => { return x * x * x },
		'easein': (x) => { x = 1 - x 
											return 1 - (x * x * x) 
										},
		'easeinout': (x) => { 
									if (x < 0.5) { 
										return (4 * x * x * x) 
									} else { 
										x = 1 - x
										return 1 - (4 * x * x * x) 
									}
								}
	} 

	// Initialisation
	const init = () => {
		document.querySelectorAll('.content-center__image').forEach((elem, i) => {
			elem.classList.remove('scale_init')
		})

		// Load all elements to animate
		init_elements()

		// Get element & viewport sizes
		on_resize()

		// Recalculate heights & positions on resize and rotate
		window.addEventListener('resize', on_resize)
		window.addEventListener('orientationchange', on_resize)
		// Recalculate heights & positions when page is fully loaded + a bit just in case
		document.addEventListener("DOMContentLoaded", on_resize)

		// Start animating
		interV = setInterval(update, update_interval)

		return true
	}

	// Get list and pre-load animated elements
	const init_elements = () => {
		let scrollme_selector = document.querySelectorAll('.scrollme')
		let animateme_selector = document.querySelectorAll('.animateme')
		// For each reference element
		scrollme_selector.forEach((elem, j) => {
			let element = {}
			element.element = elem
			let effects = []

			// For each animated element
			animateme_selector.forEach((val, i) => {
				// Get effect details
				let effect = {}
				effect.element = val

				effect.when = effect.element.dataset.when
				effect.from = effect.element.dataset.from
				effect.to = effect.element.dataset.to

				if (effect.element.dataset.crop) {
					effect.crop = effect.element.dataset.crop
				} else {
					effect.crop = true
				}

				if (effect.element.dataset.easing) {
					effect.easing = easing_functions[effect.element.dataset.easing]
				} else {
					effect.easing = easing_functions['easeout']
				}

				// Get animated properties
				let properties = {}
				Object.keys(effect.element.dataset).forEach((v, i) => {
					properties[v] = !isNaN(parseFloat(effect.element.dataset[v])) ? parseFloat(effect.element.dataset[v]) : effect.element.dataset[v]
				})

				effect.properties = properties
				effects.push(effect)
			})

			element.effects = effects
			elements.push(element)
		})
	}

	// Animate stuff
	const animate = () => {
		// For each element in viewport
		elements_in_view.forEach((elm, i) => {
			if( elementIsVisibleInViewport(elm.element, true) ) {
				// For each effect 
				elm.effects.forEach((effect, e) => {
					// Get effect animation boundaries
					let start = effect.element.offsetTop - viewport_height;
					let end = effect.element.offsetTop;
					if (effect.crop) {
						if (start < 0) start = 0
						if (end > (body_height - viewport_height)) end = body_height - viewport_height
					}
					// Get scroll position of reference selector
					let scroll = (viewport_top - start) / (end - start)
					// Get relative scroll position for effect
					let from = parseFloat(effect['from'])
					let to = parseFloat(effect['to'])
					let length = to - from
					let scroll_relative = (scroll - from) / length
					// Apply easing
					let scroll_eased = effect.easing(scroll_relative)
					// Get new value for each property
					let scale = animate_value(scroll, scroll_eased, from, to, effect, 'scale')
					let scalex = animate_value(scroll, scroll_eased, from, to, effect, 'scalex')
					let scaley = animate_value(scroll, scroll_eased, from, to, effect, 'scaley')
					// Override scale values
					if ('scale' in effect.properties) {
						scalex = scale
						scaley = scale
					}

					if ((effect.element.offsetTop + 50) >= elm.top) {						
						// Update properties
						effect.element.style.opacity = 1
						effect.element.style.transform = 'scale3d( ' + scalex + ' , ' + scaley + ' , ' + 1 + ' )'
					}
				})
			}
		})
	}

	// Calculate property values
	const animate_value = (scroll, scroll_eased, from, to, effect, property) => {

		let value_default = property_defaults[property]
		// Return default value if property is not animated

		if (!(property in effect.properties)) return value_default
		let value_target = effect.properties[property]
		let forwards = (to > from) ? true : false

		// Return boundary value if outside effect boundaries
		if (scroll < from && forwards) { return value_default }
		if (scroll > to && forwards) { return value_target }

		if (scroll > from && !forwards) { return value_default }
		if (scroll < to && !forwards) { return value_target }

		// Calculate new property value
		let new_value = parseFloat(value_default) + parseFloat((scroll_eased * (value_target - value_default)))

		// Round as required
		switch (property) {
			case 'opacity': new_value = new_value.toFixed(2); break;
			case 'scale': new_value = new_value.toFixed(3); break;
			default: break;
		}

		// Done
		return new_value
	}

	const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
		const { top, left, bottom, right } = el.getBoundingClientRect();
		const { innerHeight, innerWidth } = window;
		return partiallyVisible
			? ((top > 0 && top < innerHeight) ||
					(bottom > 0 && bottom < innerHeight)) &&
					((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
			: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
	}

	// Update list of elements in view
	const update_elements_in_view = () => {
		elements_in_view = []
		let elements_length = elements?.length
		for (let i = 0; i < elements_length; i++) {
			if (elementIsVisibleInViewport(elements[i].element, true)) {
				elements_in_view.push(elements[i])
			}
		}
	}

	// Update height of animated elements
	const update_element_heights = () => {
		let elements_length = elements?.length
		for (let i = 0; i < elements_length; i++) {
			let element_height = elements[i].element.offsetHeight
			let position = elements[i].element.getBoundingClientRect()
			elements[i].height = element_height
			elements[i].top = position.top
			elements[i].bottom = position.top + element_height
		}
	}

	// Update viewport position
	const update_viewport_position = () => {
		viewport_top = window.pageYOffset
		viewport_bottom = viewport_top + viewport_height
	}

	// Update viewport parameters
	const update_viewport = () => {
		body_height = document.body.scrollHeight
		viewport_height = window.innerHeight
	}

	// Update elements
	const update = () => {
		window.requestAnimationFrame(() => {
			update_viewport_position()
			if (window.innerWidth > 768) {
				if (viewport_top_preview != viewport_top) {
					update_elements_in_view()
					animate()
				}
			}
			viewport_top_preview = viewport_top
		})
	}

	// Stuff to do on resize
	const on_resize = () => {
		// Update viewport/element data
		update_viewport()
		update_element_heights()

		// Update display
		update_viewport_position()
		update_elements_in_view()
		animate()
	}

	const animationinit = () => {
		init()
	}

	const cleanup = () => {
		clearInterval(interV)
		window.removeEventListener('resize', on_resize)
		window.removeEventListener('orientationchange', on_resize)
		document.removeEventListener("DOMContentLoaded", on_resize)
	}

	return { animationinit, cleanup }
}