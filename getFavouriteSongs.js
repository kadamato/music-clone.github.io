function getFavouriteSongs() {
  const favouriteList = document.querySelector("#favouritesList");
  favouriteList.textContent = "";

  const favouriteSongs =
    JSON.parse(localStorage.getItem("favouriteSongs")) ?? [];

  // create item
  for (let favouriteSong of favouriteSongs) {
    const favouriteListItem = document.createElement("div");
    favouriteListItem.classList.add("favouriteItem");

    const favouriteListItemImg = document.createElement("img");
    favouriteListItemImg.classList.add("favouriteItem__img");
    favouriteListItemImg.src = favouriteSong.coverImg;

    const favouriteListItemTitle = document.createElement("div");
    favouriteListItemTitle.classList.add("favouriteItem__title");
    favouriteListItemTitle.textContent = favouriteSong.title;

    favouriteListItem.appendChild(favouriteListItemImg);
    favouriteListItem.appendChild(favouriteListItemTitle);

    favouriteList.appendChild(favouriteListItem);

    favouriteListItem.addEventListener("click", function () {
      songPlaying = favouriteSong;

      setLayout();
      loadSong();
      playSong();

      favouriteSongBtn.src = "/images/heart-icon.svg";
    });
  }
}
