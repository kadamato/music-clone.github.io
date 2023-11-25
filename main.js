const pauseButton = document.querySelector(
  ".musicPlayer__tools__top__pauseBtn"
);
const nextButton = document.querySelector(".musicPlayer__tools__top__nextBtn");
const prevButton = document.querySelector(".musicPlayer__tools__top__prevBtn");
const musicPlayerToolsAudio = document.querySelector(
  ".musicPlayer__tools__audio"
);
const musicPlayerToolsTimelineLine = document.querySelector(
  ".musicPlayer__tools__timeline__line"
);

const favouriteSongBtn = document.querySelector(
  ".musicPlayer__info__heartIcon"
);

const soundBtn = document.querySelector(".musicPlayer__sound__icon");
const soundLine = document.querySelector(".musicPlayer__sound__line");
const soundLineCurrent = document.querySelector(
  ".musicPlayer__sound__line__current"
);

let songPlaying = null;
let listSongTitle = null;

function setLayout() {
  const container = document.querySelector("#container");
  container.style.height = "calc(100vh - 8rem)";
}

function playSong() {
  // play song
  const musicPlayerToolsTopPauseBtnIcon = document.querySelector(
    ".musicPlayer__tools__top__pauseBtn__icon"
  );

  if (!songPlaying) return;

  // if paused then play

  if (musicPlayerToolsAudio.paused) {
    musicPlayerToolsAudio.play();
    musicPlayerToolsTopPauseBtnIcon.src = "/images/pause-icon-1.svg";
  }
  // if playing then pause
  else {
    musicPlayerToolsAudio.pause();
    musicPlayerToolsTopPauseBtnIcon.src = "/images/play-icon-1.svg";
  }

  // if ended then play next song

  musicPlayerToolsAudio.addEventListener("ended", function () {
    nextSong();
  });
}

function loadSong() {
  // show music player
  const musicPlayer = document.querySelector(".musicPlayer");
  musicPlayer.style.display = "flex";

  // show song info
  const musicPlayerInfoCoverImg = document.querySelector(
    ".musicPlayer__info__coverImg"
  );
  musicPlayerInfoCoverImg.src = songPlaying.coverImg;

  const musicPlayerInfoSongTitle = document.querySelector(
    ".musicPlayer__info__song__title"
  );
  musicPlayerInfoSongTitle.textContent = songPlaying.title;

  const musicPlayerToolsAudio = document.querySelector(
    ".musicPlayer__tools__audio"
  );
  musicPlayerToolsAudio.src = songPlaying.source;
}

function prevSong() {
  // de biet bai hat  dang nam o list nao
  // vidu  :  top , classical , pop ,...

  if (!listSongTitle) {
    const favouriteSongs = JSON.parse(localStorage.getItem("favouriteSongs"));

    const currentSongIndex = favouriteSongs.findIndex((song) => {
      return songPlaying.title === song.title;
    });
    songPlaying = favouriteSongs[currentSongIndex + 1];

    // neu bai hat hien tai la bai hat cuoi cung cua list thi chuyen sang bai hat dau tien cua list
    if (!songPlaying) songPlaying = favouriteSongs[0];

    loadSong();
    playSong();
    return;
  }

  const currentSongIndex = songs[listSongTitle].findIndex((song) => {
    return songPlaying.title === song.title;
  });

  songPlaying = songs[listSongTitle][currentSongIndex - 1];

  // neu bai hat hien tai la bai hat dau tien cua list thi chuyen sang bai hat cuoi cung cua list

  if (!songPlaying)
    songPlaying = songs[listSongTitle][songs[listSongTitle].length - 1];

  loadSong();
  playSong();
}

function nextSong() {
  // de biet bai hat  dang nam o list nao
  // vidu  :  top , classical , pop ,...

  if (!listSongTitle) {
    const favouriteSongs = JSON.parse(localStorage.getItem("favouriteSongs"));

    const currentSongIndex = favouriteSongs.findIndex((song) => {
      return songPlaying.title === song.title;
    });
    songPlaying = favouriteSongs[currentSongIndex + 1];

    // neu bai hat hien tai la bai hat cuoi cung cua list thi chuyen sang bai hat dau tien cua list
    if (!songPlaying) songPlaying = favouriteSongs[0];

    loadSong();
    playSong();
    return;
  }

  const currentSongIndex = songs[listSongTitle].findIndex((song) => {
    return songPlaying.title === song.title;
  });
  songPlaying = songs[listSongTitle][currentSongIndex + 1];

  // neu bai hat hien tai la bai hat cuoi cung cua list thi chuyen sang bai hat dau tien cua list
  if (!songPlaying) songPlaying = songs[listSongTitle][0];

  loadSong();
  playSong();
}

function getSongs() {
  for (let list in songs) {
    //content

    const content = document.querySelector("#content");

    // create list

    const listContainer = document.createElement("div");
    listContainer.classList.add("listContainer");

    const listTitle = document.createElement("h2");
    listTitle.classList.add("listTitle");
    listTitle.textContent = list;

    const listItems = document.createElement("div");
    listItems.classList.add("listItems");

    // append list to content

    listContainer.appendChild(listTitle);
    listContainer.appendChild(listItems);
    content.appendChild(listContainer);

    // create item for list
    for (let song of songs[list]) {
      const listItem = document.createElement("div");
      listItem.classList.add("listItem");

      const listItemImg = document.createElement("img");
      listItemImg.classList.add("listItemImg");
      listItemImg.src = song.coverImg;

      const listItemTitle = document.createElement("div");
      listItemTitle.classList.add("listItemTitle");
      listItemTitle.textContent = song.title;

      const listItemPlayBtn = document.createElement("div");
      listItemPlayBtn.classList.add("listItemPlayBtn");

      const listItemPlayBtnImg = document.createElement("img");
      listItemPlayBtnImg.classList.add("listItemPlayBtnImg");
      listItemPlayBtnImg.src = "/images/play-icon.svg";

      listItemPlayBtn.appendChild(listItemPlayBtnImg);

      listItem.appendChild(listItemImg);
      listItem.appendChild(listItemTitle);
      listItem.appendChild(listItemPlayBtn);

      listItems.appendChild(listItem);

      // asign event onclick for play button
      listItemPlayBtn.addEventListener("click", function () {
        songPlaying = song;
        listSongTitle = list;

        setLayout();
        loadSong();
        playSong();

        const favouriteSongs = JSON.parse(
          localStorage.getItem("favouriteSongs")
        );

        const checkSong = favouriteSongs.find((song) => {
          return songPlaying.title === song.title;
        });

        if (checkSong) return (favouriteSongBtn.src = "/images/heart-icon.svg");
        favouriteSongBtn.src = "/images/heart-icon-outline.svg";
      });
    }
  }
}

pauseButton.addEventListener("click", playSong);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

musicPlayerToolsAudio.addEventListener("timeupdate", (e) => {
  const musicPlayerToolsTimelineCurrent = document.querySelector(
    ".musicPlayer__tools__timeline__current"
  );
  const musicPlayerToolsTimelineTotal = document.querySelector(
    ".musicPlayer__tools__timeline__total"
  );
  const musicPlayerToolsTimelineLineCurrent = document.querySelector(
    ".musicPlayer__tools__timeline__line__current"
  );

  const minutes = Math.floor(e.target.duration / 60);
  const seconds = Math.floor(e.target.duration % 60);
  let timeTotal = `${minutes}:${seconds}`;

  const currentMinutes = Math.floor(e.target.currentTime / 60);
  const currentSeconds = Math.floor(e.target.currentTime % 60);
  let currentTime = `${currentMinutes}:${currentSeconds}`;

  // timeline
  const timeLine = (e.target.currentTime / e.target.duration) * 100;

  musicPlayerToolsTimelineLineCurrent.style.width = `${timeLine}%`;

  if (seconds < 10) {
    timeTotal = `${minutes}:0${seconds}`;
  }
  if (currentSeconds < 10) {
    currentTime = `${currentMinutes}:0${currentSeconds}`;
  }

  musicPlayerToolsTimelineCurrent.innerText = currentTime;
  musicPlayerToolsTimelineTotal.innerText = timeTotal;
});
musicPlayerToolsTimelineLine.addEventListener("click", (e) => {
  const position = e.offsetX;

  const totalTime = musicPlayerToolsAudio.duration;

  const specifyTime =
    (position / musicPlayerToolsTimelineLine.offsetWidth) * totalTime;

  musicPlayerToolsAudio.currentTime = specifyTime;
});

favouriteSongBtn.addEventListener("click", (e) => {
  const favouriteSongs =
    JSON.parse(localStorage.getItem("favouriteSongs")) ?? [];

  const checkSong = favouriteSongs.find((song) => {
    return songPlaying.title === song.title;
  });

  if (checkSong) {
    favouriteSongBtn.src = "/images/heart-icon-outline.svg";
    const newFavouriteSongs = favouriteSongs.filter((song) => {
      return songPlaying.title !== song.title;
    });
    localStorage.setItem("favouriteSongs", JSON.stringify(newFavouriteSongs));
  } else {
    favouriteSongBtn.src = "/images/heart-icon.svg";
    favouriteSongs.push(songPlaying);
    localStorage.setItem("favouriteSongs", JSON.stringify(favouriteSongs));
  }
  getFavouriteSongs();
});

let onVolume = true;

soundBtn.addEventListener("click", (e) => {
  onVolume = !onVolume;
  if (!onVolume) {
    e.target.src = "/images/sound-off.svg";
    musicPlayerToolsAudio.muted = true;
  } else {
    e.target.src = "/images/sound-on.svg";
    musicPlayerToolsAudio.muted = false;
  }
});

soundLine.addEventListener("click", (e) => {
  const position = e.offsetX;
  const totalWidth = soundLine.offsetWidth;

  const volume = position / totalWidth;

  musicPlayerToolsAudio.volume = volume;

  soundLineCurrent.style.width = `${volume * 100}%`;
});

getFavouriteSongs();

getSongs();
