document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
const temp = document.querySelector('#shareBoxTemplate');

function onMouseDown() {
	document.getSelection().removeAllRanges();
	const shareBox = document.querySelector('#shareBox');
	if (shareBox !== null) shareBox.remove();
}

function onMouseUp() {
	let sel = document.getSelection(),
	    txt = sel.toString();
	if (txt !== "") {
		let range = sel.getRangeAt(0);
		if (range.startContainer.parentElement.parentElement.localName === "article" || range.startContainer.parentElement.localName === "article") {
			document.body.insertBefore(document.importNode(temp.content, true), temp);
			const rect = range.getBoundingClientRect();
			const shareBox = document.querySelector('#shareBox');
			shareBox.style.top = `calc(${rect.top}px - 38px)`;
			shareBox.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 30px)`;
			const shareBtn = shareBox.querySelector('button');
			shareBtn['shareTxt'] = txt;
			shareBtn.addEventListener('mousedown', onShareClick, true);
		}
	}
}

function onShareClick() {
	window.open(`https://twitter.com/intent/tweet?text=${this.shareTxt}`);
	this.remove();
	document.getSelection().removeAllRanges();
}