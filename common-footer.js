const footerObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			if(added_node.nodeType != 1)
				continue;
			if(added_node.querySelector('#default-footer') == null)
				continue;
			loadCommonFooter();
		}
	});
});
// Start Observer
footerObserver.observe(document.body, { subtree: true, childList: true });

async function loadCommonFooter() {
	let default_footer = document.getElementById('default-footer');
	let footer = default_footer.closest('footer');

	// grab the commont footer
	try {
		let response = await fetch('https://d3s1hlfjjwhvha.cloudfront.net/springshare/common-footer/common-footer.html');

		// check that we got a 2## result
		if (!response.ok)
			throw new Error(`HTTP error! Status: ${response.status}`);

		let common_footer = await response.text();
		default_footer.insertAdjacentHTML('afterend', common_footer);

		// hide default footer or mark it
		default_footer.remove();

		
	} catch(err) {
			console.error('Error fetching common_footer.html');
			console.error(err);
	};
}

window.addEventListener('DOMContentLoaded', function(evt) {
	try {
		footerObserver.disconnect();
	} catch(e) {
		console.error('Attempted to disconnect non-existent footerObserver');
	}
});