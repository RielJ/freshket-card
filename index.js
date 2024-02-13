document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const container = document.getElementById("container");

  const fetchData = async () => {
    const [placesRes, tagsRes] = await Promise.all([
      fetch(
        "https://gist.githubusercontent.com/knot-freshket/142c21c3e8e54ef36e33f5dc6cf54077/raw/94ebab16839484f06d42eb799e30d0a945ff1a1b/freshket-places.json",
      ),
      fetch(
        "https://gist.githubusercontent.com/knot-freshket/fa49e0a5c6100d50db781f28486324d2/raw/55bc966f54423dc73384b860a305e1b67e0bfd7d/freshket-tags.json",
      ),
    ]);

    const grid = document.createElement("div");
    grid.classList.add("grid");

    const [places, tags] = await Promise.all([
      placesRes.json(),
      tagsRes.json(),
    ]);

    places.forEach((place) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const relative = document.createElement("div");
      relative.classList.add("relative");

      const img = document.createElement("img");
      img.src = place.img_url;
      img.alt = place.name;
      img.classList.add("image");

      const title = document.createElement("h1");
      title.textContent = place.name;
      title.classList.add("title");

      relative.appendChild(img);
      relative.appendChild(title);

      const description = document.createElement("p");
      description.textContent = place.body;
      description.classList.add("desc");

      const tagContainer = document.createElement("div");
      tagContainer.classList.add("tags");

      place.tags.forEach((tagId) => {
        const tag = tags.find((tag) => tag.id === tagId);
        const tagElement = document.createElement("span");
        tagElement.textContent = tag.name;
        tagElement.classList.add("tag");
        tagContainer.appendChild(tagElement);
      });

      card.appendChild(relative);
      card.appendChild(description);
      card.appendChild(tagContainer);

      grid.appendChild(card);
    });

    container.appendChild(grid);
  };

  fetchData();
});
