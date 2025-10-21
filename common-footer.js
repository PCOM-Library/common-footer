

const springshareSites = {
	'libguides': {site_id: '4408', footer_id:'s-lib-footer-public'},
	'libcal': {site_id: '19957', footer_id: 's-lc-public-footer'},
'libanswers': {site_id: '20029',footer_id: 's-la-public-footer'}
}


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
	// grab the commont footer
	try {
		let response = await fetch('https://d3s1hlfjjwhvha.cloudfront.net/springshare/common-footer/common-footer.html');

		// check that we got a 2## result
		if (!response.ok)
			throw new Error(`HTTP error! Status: ${response.status}`);

		let common_footer = await response.text();
		applyCommonFooter(common_footer)

	} catch(err) {
			console.error('Error fetching common_footer.html');
			console.error(err);
	};
}

async function applyCommonFooter(html) {
	let default_footer = document.getElementById('default-footer');
	if(!default_footer) return;

	// inset the common footer
	default_footer.insertAdjacentHTML('afterend', html);

	// hide the springshare footer
	let domain = window.location.hostname.replace('.pcom.edu','');
	let site = springshareSites[domain];
	document.getElementById('site.footer_id').remove();
	
	// change the login URL
	let login = document.querySelector('#springshare-footer a');
	login.href = login.href + site.site_id;

	// hide default footer
	default_footer.remove();
}

window.addEventListener('DOMContentLoaded', function(evt) {
	try {
		footerObserver.disconnect();
	} catch(e) {
		console.error('Attempted to disconnect non-existent footerObserver');
	}
});