"use strict";

// Clipboard copy function
const copyToClipboard = function (text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        showToast("Email copied to clipboard!");
      })
      .catch(function () {
        showToast("Failed to copy email.");
      });
  } else {
    // Fallback for older browsers
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showToast("Email copied to clipboard!");
  }
};

// Toastify show function
const showToast = function (message) {
  Toastify({
    text: message,
    duration: 1500,
    gravity: "top",
    position: "center",
    backgroundColor: "#007bff",
  }).showToast();
};

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event to all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter variables
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    let selectedCategory = this.innerText.toLowerCase(); // Convert text to lowercase

    filterItems.forEach((item) => {
      let itemCategory = item.dataset.category.toLowerCase(); // Convert data-category to lowercase

      if (selectedCategory === "all" || itemCategory === selectedCategory) {
        item.classList.add("active"); // Show item
      } else {
        item.classList.remove("active"); // Hide item
      }
    });
  });
});

// Add event to all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  const savedPage = localStorage.getItem("activePage");
  if (savedPage) {
    // Remove "active" class from all pages and nav links
    navigationLinks.forEach((link) => link.classList.remove("active"));
    pages.forEach((page) => page.classList.remove("active"));

    // Activate the correct page
    navigationLinks.forEach((link) => {
      if (link.innerHTML.toLowerCase() === savedPage) {
        link.classList.add("active");
      }
    });

    pages.forEach((page) => {
      if (page.dataset.page === savedPage) {
        page.classList.add("active");
      }
    });
  }
  // Add event listener to form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(form);

    // Send form data to send_email.php using fetch API
    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form submitted successfully.");
          form.reset(); // Optionally reset the form after successful submission
        } else {
          throw new Error("Form submission failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "There was an error submitting the form. Please try again later."
        );
      });
  });

  // Enable submit button when all required fields are filled
  form.addEventListener("input", function () {
    const inputs = form.querySelectorAll("[data-form-input]");
    let isValid = true;
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
      }
    });
    formBtn.disabled = !isValid;
  });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Remove active class from all links and pages
    navigationLinks.forEach((link) => link.classList.remove("active"));
    pages.forEach((page) => page.classList.remove("active"));

    // Add active class to the clicked link
    this.classList.add("active");

    // Find the matching page and add active class to it
    const selectedPage = this.innerHTML.toLowerCase();
    pages.forEach((page) => {
      if (page.dataset.page === selectedPage) {
        page.classList.add("active");
      }
    });

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });
}

// Clipboard copy functionality for email
const copyEmailBtn = document.querySelector("[data-copy-email-btn]");

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", function () {
    copyToClipboard("claretelloydiee@gmail.com");
  });
}

// Load the last visited page from localStorage

// Save the active page when clicked
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const selectedPage = this.innerHTML.toLowerCase();
    localStorage.setItem("activePage", selectedPage);
  });
});
function checkScreenSize() {
  const avatarBox = document.querySelector(".avatar-box");
  if (!avatarBox) return;
  if (window.innerWidth < 580) {
    avatarBox.classList.add("hidden"); // Hides the avatar
  } else {
    avatarBox.classList.remove("hidden"); // Shows the avatar again
  }
}

// Run on page load
checkScreenSize();

// Run when window resizes
window.addEventListener("resize", checkScreenSize);
function enterFullscreen() {
  let viewer = document.getElementById("viewer");
  if (viewer.requestFullscreen) {
    viewer.requestFullscreen();
  } else if (viewer.webkitRequestFullscreen) {
    viewer.webkitRequestFullscreen(); // Safari
  } else if (viewer.msRequestFullscreen) {
    viewer.msRequestFullscreen(); // Internet Explorer
  }

  const list = document.querySelector(".testimonials-list");
  const items = document.querySelectorAll(".testimonials-item");
  let index = 0;

  function scrollNext() {
    const cardWidth = items[0].offsetWidth;
    const gap = 15; // based on your CSS

    const scrollTo = (cardWidth + gap) * index;
    list.scrollTo({ left: scrollTo, behavior: "smooth" });

    index++;
    if (index >= items.length) index = 0;
  }

  setInterval(scrollNext, 3000);
}
