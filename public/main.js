const update = document.querySelector("#update-button");

update.addEventListener("click", (_) => {
	fetch("/quotes", {
		method: "put",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: "Mr. Burns",
			quote: "No, Simpson!",
		}),
	})
		.then((res) => {
			if (res.ok) return res.json();
		})
		.then((response) => {
			console.log(response);
			window.location.reload(true);
		});
});
