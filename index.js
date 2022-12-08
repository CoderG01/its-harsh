$(document).ready(function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  console.log("the document is ready to build up new things.");

  // dark mode change attribute of html from light to dark
  $(".radio_btn").click(function () {
    $(".radio_inner").toggleClass("active");
    if ($("html").attr("theme") === "light") {
      $("html").attr("theme", "dark");
    } else {
      $("html").attr("theme", "light");
    }
  });

  // preloader js
  setTimeout(() => {
    $(".navbar").fadeIn(5000);
    $(".main_page").fadeIn(5000);
    $(".preloader").fadeOut("slow");

    var textWrapper = document.querySelector(".ml9 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml9 .letter",
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1),
      })
      .add({
        targets: ".ml9",
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, 3500);

  $(".menu_icon").click(function () {
    $(".top_bar").toggleClass("top_bar_hover");
    $(".middel_bar").toggleClass("middel_bar_hover");
    $(".bottom_bar").toggleClass("bottom_bar_hover");
  });

  $("#Home_link").click(function () {
    $(".page_number_p").html("01");
  });
  $("#skill_link").click(function () {
    $(".page_number_p").html("02");
  });
  $("#work_link").click(function () {
    $(".page_number_p").html("03");
  });
  $("#contact_link").click(function () {
    $(".page_number_p").html("04");
  });

  $(".dh-container").directionalHover();
  $(".dh-container").directionalHover({
    // CSS class for the overlay
    overlay: "dh-overlay",

    // Linear or swing
    easing: "swing",

    // <a href="https://www.jqueryscript.net/animation/">Animation</a> speed in ms
    speed: 400,
  });

  $(".like_btn").click(function () {
    // alert("hey")
    $(this).css("cursor", "pointer");
    $(this).find(".like_icon").toggleClass("fas fa-heart").fadeOut(100);
    $(this).find(".like_icon").toggleClass("far fa-heart").fadeIn(100);

    let id = $(this).parent().attr("id");
    // console.log(project_id + "is liked by the user")
    updatelocalStorage(id);
  });

  function updatelocalStorage(e) {
    console.log(e);
    // localStorage.setItem("liked Project",id)
    let liked_project = [];
    if (localStorage.getItem("Projects")) {
      liked_project = JSON.parse(localStorage.getItem("Projects"));
    }
    isLiked = liked_project.includes(e);
    if (isLiked) {
      const index = liked_project.indexOf(e);
      if (index > -1) {
        // only splice array when item is found
        liked_project.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      liked_project.push(e);
    }

    liked_project = getUnique(liked_project);

    console.log(liked_project);
    localStorage.setItem("Projects", JSON.stringify(liked_project));
  }

  function getUnique(a) {
    let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
    return unique;
  }

  // debugger;
  $(document).scroll(function () {
    let y = $(this).scrollTop();
    if (y > 500) {
      $(".scroll_to_top").fadeIn();
    } else {
      $(".scroll_to_top").fadeOut();
    }
  });

  //
  //
  //
  // update section index in footer
  $("body").scroll(function () {
    let secondary_Section = $(".secondary-section");
    // console.log(secondary_Section);
    for (let i = 0; i < secondary_Section.length; i++) {
      let element = secondary_Section[i];
      let topPosition = element.getBoundingClientRect().top;
      if (topPosition <= 0) {
        $(element).addClass("touchedTop");
      } else {
        $(element).removeClass("touchedTop");
      }
      let touchedTopEle = $(".touchedTop");
      let index = $(touchedTopEle[touchedTopEle.length - 1])[0].getAttribute(
        "data-index"
      );
      $(".page_number_p").text(index.padStart(2, "0"));
    }
  });
  // update section index in footer
  //
  //
  //

  // get season functionality
  function getSeason(month) {
    if (month >= 3 && month <= 6) {
        return "summer";
    }
    
    if (month >= 7 && month <= 10) {
        return "monsoon";
    }

    // month => 11,12,1,2
    return "winter";
  }
  let curDate = new Date();
  month = curDate.getMonth();
  year = curDate.getFullYear();
  let season = getSeason(month + 1);
  $('#seasonText').text(season)
  $('#seasonImg').attr('src',`./img/${season}.svg`)

  $('#currentYear').text(year)
});
