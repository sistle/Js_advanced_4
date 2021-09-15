const json =
	[{
		"type": "folder",
		"name": "app",
		"main": 1,
		"children": [
			{
				"type": "folder",
				"name": "css",
				"children": [
					{
						"type": "file",
						"name": "lib",
						"index": 1,
					}
				]
			},
			{
				"type": "folder",
				"name": "img",
				"children": [{
					"type": "file",
					"name": "cat",
					"index": 2,
				}]
			},
			{
				"type": "folder",
				"name": "js",
				"children": [
					{
						"type": "folder",
						"name": "config",
						"children": [
							{
								"type": "file",
								"name": "language.en.js",
								"index": 3,
							}
						]
					},
					{
						"type": "folder",
						"name": "lib",
						"children": [
							{
								"type": "file",
								"name": "brain.js",
								"index": 4,
							}
						]
					},
					{
						"type": "file",
						"name": "about.js",
						"index": 5,
					}
				]
			},
			{
				"type": "folder",
				"name": "views",
				"children": [
					{
						"type": "file",
						"name": "about.html",
						"index": 6,
					}
				]
			},
			{
				"type": "folder",
				"name": "index.html",
				"children": [
					{
						"type": "file",
						"name": "style.css",
						"index": 7,
					}
				]
			}
		]
	}];


const container = document.querySelector('.container');

function printRecursion(json) {

	let root = '<ul >';

	for (const obj of json) {

		const { type, name, children, index, main } = obj;
		if (type === 'file') {
			root += `<li class='file'  data-click="click" id="${index}"onclick=openModal(${index})  data-type="file"  tabindex=0>${name} </li>
			<div class="modal" id="a${index}" >
			<div class="modal__content" >
			<span class="close" onclick=closeModal(${index})>X</span>
			<p>${name}</p>
			</div>
			</div>`;
		}

		else {
			root += `<li class = "folder " data-click="click" tabindex=0>${name}`;
			if (children) root += `${printRecursion(children)}</li>`;
		}

	}

	return `${root}</ul>`;

}
container.innerHTML = printRecursion(json);

function hideShow(el) {
	el.classList.toggle('open');
}

function innerElements(el) {
	el.nextElementSibling;
}

function openModal(index) {
	const modal = document.getElementById(`a${index}`);
	modal.classList.add('block');
}
function closeModal(index) {
	const modal = document.getElementById(`a${index}`);
	modal.classList.remove('block');
}

function events() {
	const list = document.querySelector('li');
	let firstEl = document.querySelector('li:first-child');

	list.onclick = e => hideShow(e.target);

	firstEl.focus();

	window.addEventListener('keydown', (event) => {

		let a = document.querySelectorAll('li');

		if (event.key === 'ArrowDown') {

			function dos(el) {
				el = event.target.nextElementSibling;
				if (event.target.firstElementChild.firstElementChild) {
					let inner = event.target.firstElementChild.firstElementChild;
					inner.focus()
				}
				el = event.target.nextElementSibling;
				if (!(event.target.nextElementSibling)) el = event.target.parentNode.parentNode;
				if (event.target.children && event.target.classList.contains('open')) dos(el.firstChild)
				return el.focus();
			}
			dos(event.target);
		}

		if (event.key === 'Enter') {
			if (event.target.classList.contains('file')) {
				
				const modal = document.getElementById(`a${event.target.id}`);
				modal.classList.toggle('block');
			
			} else
				hideShow(event.target);
		}

		if (event.key === 'ArrowUp') {
			let prev = event.target.previousElementSibling;
			if (!(event.target.previousElementSibling)) prev =  event.target.parentNode.parentNode;
			prev.focus();
		}
	});
}gi
events();