$(document).ready(function () {
  var itemsMainDiv = ".MultiCarousel";
  var itemsDiv = ".MultiCarousel-inner";
  var itemWidth = "";

  $(".leftLst, .rightLst").click(function () {
    var condition = $(this).hasClass("leftLst");
    if (condition) click(0, this);
    else click(1, this);
  });

  ResCarouselSize();

  $(window).resize(function () {
    ResCarouselSize();
  });

  //this function define the size of the items
  function ResCarouselSize() {
    var incno = 0;
    var dataItems = "data-items";
    var itemClass = ".item";
    var id = 0;
    var btnParentSb = "";
    var itemsSplit = "";
    var sampwidth = $(itemsMainDiv).width();
    var bodyWidth = $("body").width();
    $(itemsDiv).each(function () {
      id = id + 1;
      var itemNumbers = $(this).find(itemClass).length;
      btnParentSb = $(this).parent().attr(dataItems);
      itemsSplit = btnParentSb.split(",");
      $(this)
        .parent()
        .attr("id", "MultiCarousel" + id);

      if (bodyWidth >= 1200) {
        incno = itemsSplit[3];
        itemWidth = sampwidth / incno;
      } else if (bodyWidth >= 992) {
        incno = itemsSplit[2];
        itemWidth = sampwidth / incno;
      } else if (bodyWidth >= 768) {
        incno = itemsSplit[1];
        itemWidth = sampwidth / incno;
      } else {
        incno = itemsSplit[0];
        itemWidth = sampwidth / incno;
      }
      $(this).css({
        transform: "translateX(0px)",
        width: itemWidth * itemNumbers,
      });
      $(this)
        .find(itemClass)
        .each(function () {
          $(this).outerWidth(itemWidth);
        });

      $(".leftLst").addClass("over");
      $(".rightLst").removeClass("over");
    });
  }

  //this function used to move the items
  function ResCarousel(e, el, s) {
    var leftBtn = ".leftLst";
    var rightBtn = ".rightLst";
    var translateXval = "";
    var divStyle = $(el + " " + itemsDiv).css("transform");
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
      translateXval = parseInt(xds) - parseInt(itemWidth * s);
      $(el + " " + rightBtn).removeClass("over");

      if (translateXval <= itemWidth / 2) {
        translateXval = 0;
        $(el + " " + leftBtn).addClass("over");
      }
    } else if (e == 1) {
      var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
      translateXval = parseInt(xds) + parseInt(itemWidth * s);
      $(el + " " + leftBtn).removeClass("over");

      if (translateXval >= itemsCondition - itemWidth / 2) {
        translateXval = itemsCondition;
        $(el + " " + rightBtn).addClass("over");
      }
    }
    $(el + " " + itemsDiv).css(
      "transform",
      "translateX(" + -translateXval + "px)"
    );
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
    var Parent = "#" + $(ee).parent().attr("id");
    var slide = $(Parent).attr("data-slide");
    ResCarousel(ell, Parent, slide);
  }
});

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "358px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function toggleClass() {
  console.log("jhjhjh")
  var dropDown = document
    .querySelector(".drop-down_drop")
    .classList.toggle("drop-down--active");
}
function toggleNewClass() {
  console.log("jhjhjh")
  // var dropDown = document
  //   .querySelector(".drop-down_drop")
  //   .classList.toggle("drop-down--active");
}
function removeClass() {
  var dropDown = document
    .querySelector(".drop-down_drop")
    .classList.remove("drop-down--active");
}

let touchStartX = 0;
let touchEndX = 0;
var carousel = document.getElementById("MultiCarousel");
const items = document.querySelectorAll(".item");

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleGesture();
});

function handleGesture() {
  if (touchEndX < touchStartX) {
    nextSlide();
    resetInterval();
  }
  if (touchEndX > touchStartX) {
    prevSlide();
    resetInterval();
  }
}

items.forEach((item) => {
  let touchStartX = 0;
  let touchEndX = 0;

  item.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });

  item.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleItemGesture(item);
  });

  function handleItemGesture(item) {
    if (touchEndX < touchStartX) {
      // swipe left
      nextSlide();
      resetInterval();
    }
    if (touchEndX > touchStartX) {
      // swipe right
      prevSlide();
      resetInterval();
    }
  }
});


