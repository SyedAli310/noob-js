const showArea = document.querySelector("#show-area");
const popSound = document.getElementById("pop");

let noobsCount = 0;
// const noobShow = `<div class="rounded-lg p-2 random" >noob</div>`;

updateNoobCount();
const BgCollection = [
  "#455954",
  "#9d7463",
  "yellow",
  "#dfdbd8",
  "#A3845A",
  "#6DF0AF",
  "#9839A3",
  "#BB2020",
  "#06111C",
  "#FFEB4D",
  "#90CBFB",
  "#4B3617",
  "#D94C1A",
  "#A6341B",
  "#60371E",
];

// generate random color
function getRandomColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

function changeBg(el) {
  var randomBg = getRandomColor();
  $(el).css("background", randomBg);
}

function playPopSound() {
  popSound.play();
}

function randomPos(el) {
  var randomBg = getRandomColor();
  var operator = Math.random();
  if (operator < 0.5) {
    operator = "-";
  } else {
    operator = "+";
  }
  let degrees = operator + Math.random() * 10 + 9;
  $(el).css({
    top:
      Math.random() * ($("#show-area").height() - $(".random").height() - 30) +
      "px",
    left:
      Math.random() * ($("#show-area").width() - $(".random").width() - 30) +
      "px",
    transform: "rotate(" + degrees + "deg)",
  });

  $("#show-area").css("border", "5px solid" + randomBg);
  setTimeout(() => {
    $(".random").css({ transform: "scale(1.25) " });
  }, 750);
}

function updateNoobCount() {
  document.querySelector("#noob-count").innerHTML = noobsCount;
}
function showRandomNoob() {
  ++noobsCount;
  updateNoobCount();
  const noobShow = document.createElement("div");
  noobShow.classList.add("random");
  randomPos(noobShow);

  setTimeout(() => {
    noobShow.innerHTML = `<h3>noob!</h3>`;
    showArea.appendChild(noobShow);
    changeBg(noobShow);
  }, 100);
}

$("#appear-btn").on("click", () => {
  $("#show-area").css("display", "block");
  $("#clear-btn").css("display", "inline-block");
  $("#stop-btn").css("display", "inline-block");
  $("#appear-btn").text("Claim more");
  $(".random h3").css("animation-play-state", "running");

  let count = 250;
  let interval = setInterval(() => {
    if (count > 0) {
      showRandomNoob();
      tiltNoobs();
      if (localStorage.getItem("volume") == "on") {
        playPopSound();
      }
      count--;
    }
    // randomPos($('.random'))
    //tiltNoobs()
  }, 10);

  $("#stop-btn").on("click", () => {
    clearInterval(interval);
    setTimeout(() => {
      tiltNoobs();
    }, 1000);
    $(".random h3").css("animation-play-state", "paused");
  });
});

$("#clear-btn").on("click", () => {
  showArea.innerHTML = ``;
  noobsCount = 0;
  updateNoobCount();
});

if (localStorage.getItem("volume") == null) {
  localStorage.setItem("volume", "on");
} else {
  localStorage.setItem("volume", localStorage.getItem("volume"));
  if (localStorage.getItem("volume") == "off") {
    $("#volume-btn").val("off");
    $("#volume-btn i").toggleClass("fa-volume-up fa-volume-mute");
    $("#volume-btn i").toggleClass("text-success text-danger");
  }
}

$("#volume-btn").on("click", () => {
  //Toggle volume on/off
  val = $("#volume-btn").val();
  if (val == "on") {
    $("#volume-btn").val("off");
    localStorage.setItem("volume", "off");
    $("#volume-btn i").toggleClass("fa-volume-up fa-volume-mute");
    $("#volume-btn i").toggleClass("text-success text-danger");
  } else if (val == "off") {
    $("#volume-btn").val("on");
    localStorage.setItem("volume", "on");
    $("#volume-btn i").toggleClass("fa-volume-mute fa-volume-up");
    $("#volume-btn i").toggleClass("text-danger text-success");
  }
});

function tiltNoobs() {
  var operator = Math.random();
  if (operator < 0.5) {
    operator = "-";
  } else {
    operator = "+";
  }
  let evenNoobs = document.querySelectorAll(".random");

  for (let i = 0; i < evenNoobs.length; i++) {
    let degrees = operator + Math.random() * 10 + 9;
    evenNoobs[i].style.transform = "rotate(" + degrees + "deg)";
  }
}
