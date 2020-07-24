// Get Array images
let imagesArray = [
  "freeimg1.jpg",
  "freeimg2.jpg",
  "freeimg3.jpg",
  "freeimg4.jpg",
];

// Select Landing page element
let landingPage = document.querySelector(".landing-page ");

// Handle Active State

function handleActive(ev) {
  // Remove active class from all Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active on Selef
  ev.target.classList.add("active");
}

// Random background option

let backgroundOption;

const selectBg = document.querySelectorAll(
  ".settings-box .setting-card .random-backgrounds span"
);

// variable to control the Interval
let bgInterval;

// function to randomizeImgs

function randomizeImgs() {
  if (backgroundOption) {
    bgInterval = setInterval(
      () => {
        randomNumber = Math.floor(Math.random() * imagesArray.length);
        landingPage.style.backgroundImage = `url(images/${imagesArray[randomNumber]})`;
      },

      3000
    );
  }
}

// check if there's local storage random background item
let localStorageBg = localStorage.getItem("bg-option");

if (localStorageBg !== null) {
  if (localStorageBg === "true") {
    backgroundOption = true;
    randomizeImgs();
  } else {
    backgroundOption = false;
  }

  selectBg.forEach((el) => {
    el.classList.remove("active");
  });
  if (localStorageBg === "true") {
    document
      .querySelector(".setting-card .random-backgrounds .yes")
      .classList.add("active");
  } else {
    document
      .querySelector(".setting-card .random-backgrounds .no")
      .classList.add("active");
  }
} else {
  backgroundOption = true;
  randomizeImgs();
}

let bulletsSpan = document.querySelectorAll(
  ".settings-box .setting-card .bullets-option span"
);

let bulletsContainer = document.querySelector(".nav-bullets ");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem == "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((bull) => {
  bull.addEventListener("click", (e) => {
    if (bull.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    handleActive(e);
  });
});

// Start Toggle Setting boxe

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// End Toggle Setting boxe

/* Start toggle colors */
const selectColors = document.querySelectorAll(
  ".settings-box .setting-card .colors-option div"
);

selectColors.forEach((div) => {
  div.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color on local Storage
    localStorage.setItem("color", e.target.dataset.color);

    handleActive(e);
  });
});

/* Check if there's Local storage color */
let mainColors = localStorage.getItem("color");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove active class from all div
  document.querySelectorAll(".settings-box  div").forEach((element) => {
    element.classList.remove("active");

    // add active on element with data-color=== local storage item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

/* End toggle colors */

/* Start toggle random background */

selectBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.bg === "yes") {
      backgroundOption = true;
      randomizeImgs();
      // set option background image on local Storage
      localStorage.setItem("bg-option", true);
    } else {
      backgroundOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("bg-option", false);
    }
  });
});

window.addEventListener("scroll", () => {
  // select skills selector

  let ourSkills = document.querySelector(".skills");
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window Height
  let windowHeight = this.innerHeight;
  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-taux span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

// create Popup with the Image

let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay Element
    let overlay = document.createElement("div");
    // Add Class to overlay
    overlay.className = "popup-overlay";
    // Append Overlay to the Body
    document.body.appendChild(overlay);

    // create the popup box
    let popupBox = document.createElement("div");
    // add class to the popup box
    popupBox.className = "popup-box";
    // test if alt attribue exist

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // create text for Heading
      imgHeading.innerHTML = img.alt;
      popupBox.appendChild(imgHeading);
    }
    // create the Image
    let popupImage = document.createElement("img");
    // set Image source
    popupImage.src = img.src;
    // Add Image to popup Box
    popupBox.appendChild(popupImage);
    // Append the Popup box to Body
    document.body.appendChild(popupBox);

    // Create the close Span
    let closeButton = document.createElement("span");
    // create the close Button text
    closeButton.innerHTML = "x";

    // Add class To close Button

    closeButton.className = "close-button";
    //add Close button to the Popup Box
    popupBox.appendChild(closeButton);
  });
});

// close popup

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // remove the current popup

    e.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove({
      behavior: "smooth",
    });
  }
});

// Select All links

const allLinks = document.querySelectorAll(".header-area ul li a");
// Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomeWhere(location) {
  location.forEach((loc) => {
    loc.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);

// Reset Button
restOption = document.querySelector(".reset-options");
restOption.onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color");
  localStorage.removeItem("bg-option");
  localStorage.removeItem("bullets-option");

  // reload window
  window.location.reload();
};

// Toggle Menu

let toggleButton = document.querySelector(".header-area .toggle-menu");
let toggleLinks = document.querySelector(".header-area ul");

toggleButton.onclick = function (e) {
  // stop Propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  toggleLinks.classList.toggle("open");
};

// Click Anywhere outside Menu and Toggle Button
document.addEventListener("click", (e) => {
  // check If Menu Is Open
  if (toggleLinks.classList.contains("open")) {
    if (e.target !== toggleButton) {
      toggleButton.classList.remove("menu-active");
      toggleLinks.classList.remove("open");
    }
  }
});

// Stop Propagation on Menu
toggleLinks.onclick = function (e) {
  e.stopPropagation();
};

// Display Scroll Top

scrollTopButton = document.querySelector("#scroll-top");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 700) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};

scrollTopButton.onclick = function () {
  //document.documentElement.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
