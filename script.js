const json =
	[{
		"type": "folder",
		"name": "app",
		"children": [
			{
				"type": "folder",
				"name": "css",
				"children": [
					{
						"type": "file",
						"name": "lib",
						"index": 1,
					},
					{
						"type": "file",
						"name": "about.css",
						"index": 2,
					}
				]
			},
			{
				"type": "folder",
				"name": "img",
				"children": [{
					"type": "file",
					"name": "cat",
					"index": 3,
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
								"index": 4,
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
								"index": 5,
							}
						]
					},
					{
						"type": "file",
						"name": "about.js",
						"index": 6,
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
						"index": 7,
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
						"index": 8,
					}
				]
			}
		]
	}]

const container = document.querySelector('.container');
function get_html_tree(json) {
	let html = '<ul>'
	for (const obj of json) {
		const { type, name, children ,index} = obj
		if (type == 'file')
			html += `<li class="file" onclick=openModal(${index}) data-type>${name}</li>
			<div class="modal" id="myModel${index}">
			<div class="modal__content" >
			<span class="close" onclick=closeModal(${index})>X</span>
			<p>${name}</p>
			</div>
			</div>
		 `
		else {
			html += ` <li class = "folder">${name} `
			if (children) html += `${get_html_tree(children)}</li>`
		}
	}

	return `${html}</ul>`
}

function openModal(index) {
	const modal = document.getElementById(`myModel${index}`);
	modal.classList.add('block');
}
function closeModal(index) {
	const modal = document.getElementById(`myModel${index}`);
	modal.classList.remove('block');
}

container.innerHTML = get_html_tree(json);
document.querySelector('li').onclick = e => e.target.classList.toggle('open');


