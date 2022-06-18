const mediaQueries = window.matchMedia("(max-width:768px)");

navbarMenu();
faq();
orderProduct();
testimonials();

function navbarMenu() {
  const navToggle = document.querySelector(".nav-toggle");

  navToggle.addEventListener("click", function () {
    const headerLogo = document.querySelector(".logo");
    const navMenu = document.querySelector("nav");
    const navToggleIcon = document.querySelector(".nav-toggle span");
    const showNav = navMenu.classList.toggle("show-nav-mobile");

    headerLogo.classList.toggle("show-nav-mobile");
    if (showNav) {
      navToggleIcon.classList.replace("icon-stackbar", "icon-crossbar");
    } else {
      navToggleIcon.classList.replace("icon-crossbar", "icon-stackbar");
    }
  });

  activeMenu();
}

function activeMenu() {
  const navMenuItems = document.querySelectorAll("nav ul li a");

  for (const item of navMenuItems) {
    item.addEventListener("click", function () {
      for (const item of navMenuItems) {
        item.classList.remove("active");
      }
      item.classList.add("active");
    });
  }
}

function faq() {
  const faqQuestions = document.querySelectorAll("#faq .faq-question");
  const faqAnswers = document.querySelectorAll("#faq .faq-answer");
  const moreButtons = document.querySelectorAll("#faq .faq-question .more");

  for (let i = 0; i < moreButtons.length; i++) {
    moreButtons[i].addEventListener("click", function () {
      faqQuestions[i].classList.toggle("show-answer");
      faqAnswers[i].classList.toggle("show-answer");
    });
  }
}

function orderProduct() {
  const orderProductPrevious = document.querySelector(
    "#order-products .previous"
  );
  const orderProductNext = document.querySelector("#order-products .next");
  const orderProductItems = document.querySelectorAll(
    "#order-products .product-slider .product-slider-item"
  );

  const sliderOrderProduct = {
    previousNav: orderProductPrevious,
    nextNav: orderProductNext,
    items: orderProductItems,
    itemShow: 3,
    widthItem: 15,
    marginItem: 1,
  };

  if (mediaQueries.matches) {
    sliderOrderProduct.itemShow = 1;
  }

  mediaQueries.addEventListener("change", function () {
    if (mediaQueries.matches) {
      sliderOrderProduct.itemShow = 1;
    } else {
      sliderOrderProduct.itemShow = 3;
    }
  });

  slider(sliderOrderProduct);
}

function testimonials() {
  const testimonialsPrevious = document.querySelector(
    ".testimonials .previous"
  );
  const testimonialsNext = document.querySelector(".testimonials .next");
  const testimonialsItems = document.querySelectorAll(
    ".testimonials .testimonials-slider .testimonials-slider-item"
  );

  const sliderTestimonials = {
    previousNav: testimonialsPrevious,
    nextNav: testimonialsNext,
    items: testimonialsItems,
    itemShow: 1,
    widthItem: 52.5,
    marginItem: 0,
  };

  slider(sliderTestimonials);
}

function slider(setting) {
  let totalItem = setting.items.length;
  let totalSlide = totalItem / setting.itemShow;
  let slidePosition = 1;

  mediaQueries.addEventListener("change", function () {
    totalSlide = totalItem / setting.itemShow;
    slidePosition = 1;
    for (const item of setting.items) {
      item.removeAttribute("style");
    }
  });

  function makeSlide() {
    setting.previousNav.addEventListener("click", function () {
      if (slidePosition > 1) {
        for (let i = 0; i < totalItem; i++) {
          if (!mediaQueries.matches) {
            setting.items[i].style.transform +=
              "translateX(" +
              (setting.widthItem * setting.itemShow +
                setting.marginItem * setting.itemShow) +
              "em)";
          } else {
            setting.items[i].style.transform += "translateX(" + 100 + "%)";
          }
        }
        slidePosition--;
      }
    });

    setting.nextNav.addEventListener("click", function () {
      if (slidePosition < totalSlide) {
        for (let i = 0; i < totalItem; i++) {
          if (!mediaQueries.matches) {
            setting.items[i].style.transform +=
              "translateX(-" +
              (setting.widthItem * setting.itemShow +
                setting.marginItem * setting.itemShow) +
              "em)";
          } else {
            setting.items[i].style.transform += "translateX(-" + 100 + "%)";
          }
        }
        slidePosition++;
      }
    });
  }
  makeSlide();
}
