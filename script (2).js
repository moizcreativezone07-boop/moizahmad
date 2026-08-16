
/* =========================================
   AUDIO PLAYER JAVASCRIPT (extracted from index.html)
========================================= */

  document.querySelectorAll(".eleven-audio-player").forEach(function(player) {

    const button =
      player.querySelector(".eleven-play-btn");

    const audio =
      player.parentElement.querySelector(".eleven-audio");

    const progress =
      player.querySelector(".eleven-progress");

    const progressBar =
      player.querySelector(".eleven-progress-bar");

    const time =
      player.querySelector(".eleven-audio-time");

    const icon =
      player.querySelector(".eleven-play-btn span");


    /* ================================
       FORMAT TIME
    ================================= */

    function formatTime(seconds) {

      if (!isFinite(seconds)) {
        return "0:00";
      }

      const minutes =
        Math.floor(seconds / 60);

      const secondsRemaining =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

      return minutes + ":" + secondsRemaining;

    }


    /* ================================
       PLAY / PAUSE
    ================================= */

    button.addEventListener("click", function() {

      if (audio.paused) {

        /* Stop other audio players */

        document.querySelectorAll(".eleven-audio").forEach(function(otherAudio) {

          if (otherAudio !== audio) {
            otherAudio.pause();
          }

        });


        audio.play();

      } else {

        audio.pause();

      }

    });


    /* ================================
       PLAYING
    ================================= */

    audio.addEventListener("play", function() {

      icon.className =
        "eleven-pause-icon";

    });


    /* ================================
       PAUSED
    ================================= */

    audio.addEventListener("pause", function() {

      icon.className =
        "eleven-play-icon";

    });


    /* ================================
       PROGRESS
    ================================= */

    audio.addEventListener("timeupdate", function() {

      if (!audio.duration) {
        return;
      }


      const percentage =
        (audio.currentTime / audio.duration) * 100;


      progressBar.style.width =
        percentage + "%";


      time.textContent =
        formatTime(audio.currentTime)
        + " / "
        + formatTime(audio.duration);

    });


    /* ================================
       AUDIO LOADED
    ================================= */

    audio.addEventListener("loadedmetadata", function() {

      time.textContent =
        "0:00 / "
        + formatTime(audio.duration);

    });


    /* ================================
       CLICK PROGRESS BAR
    ================================= */

    progress.addEventListener("click", function(event) {

      if (!audio.duration) {
        return;
      }


      const rect =
        progress.getBoundingClientRect();


      const clickPosition =
        event.clientX - rect.left;


      const percentage =
        clickPosition / rect.width;


      audio.currentTime =
        percentage * audio.duration;

    });


    /* ================================
       AUDIO ENDED
    ================================= */

    audio.addEventListener("ended", function() {

      progressBar.style.width = "0%";

      time.textContent =
        "0:00 / "
        + formatTime(audio.duration);

      icon.className =
        "eleven-play-icon";

    });

  });



/* =========================================
   SEE ALL PROJECTS JAVASCRIPT (extracted from index.html)
========================================= */

  const seeAllProjectsBtn =
    document.getElementById("seeAllProjectsBtn");

  const seeAllProjectsText =
    document.getElementById("seeAllProjectsText");

  const projectsGrid =
    document.getElementById("projectsGrid");


  seeAllProjectsBtn.addEventListener("click", function () {

    projectsGrid.classList.toggle("show-all");


    if (projectsGrid.classList.contains("show-all")) {

      seeAllProjectsText.textContent =
        "Show Less";

    } else {

      seeAllProjectsText.textContent =
        "See All Projects";

      document.getElementById("projects").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });


