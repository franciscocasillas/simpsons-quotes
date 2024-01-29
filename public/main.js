const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");

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

deleteButton.addEventListener("click", (_) => {
	fetch("/quotes", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: "Mr. Burns",
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
