
let counter = 0; //Store current carousel div number

function gotoNextItem(carousel) {
  let loop = +carousel.getAttribute("loop") || "true";
  let scroll_val = carousel.children[0].offsetWidth + 20; // width + margin
  let items = carousel.childElementCount;
  
  if(window.screen.availWidth > 576){
    items = items - 1;
  }
  carousel.scrollLeft += scroll_val;
  if (loop === "true" && carousel.scrollLeft >= (scroll_val * (items-1)) ) {
    carousel.scrollTo(1, 0);
  }
}

function gotoLastItem(carousel) {
  let loop = carousel.getAttribute("loop") || "true";
  let scroll_val = carousel.children[0].offsetWidth + 20; // width + margin
  let items = carousel.childElementCount;

  carousel.scrollLeft-=scroll_val;
  if (loop === "true" && carousel.scrollLeft < scroll_val) {
    carousel.scrollTo(scroll_val * items, 0);
  }
}

//To start auto loop carousel
for (const carousel of document.getElementsByClassName("items")) {

  let width = carousel.getAttribute("width") || "440px"; //Get interval attribute from carousel
  let height = carousel.getAttribute("height") || "330px"; //Get interval attribute from carousel
  let auto_loop = carousel.getAttribute("auto-loop") || "true"; //Get auto loop attribute from carousel
  let interval = +carousel.getAttribute("interval") || 5000; //Get interval attribute from carousel
  let scroll_bar = carousel.getAttribute("scroll") || "false"; //Get interval attribute from carousel


  let last_button = document.getElementsByClassName("last-button")[counter]; // Get last button for this carousel
  let next_button = document.getElementsByClassName("next-button")[counter]; // Get next button for this carousel
  let carousel_interval; //Start current carousel interval

  carousel.style.width = width;
  carousel.style.height = height;

  if (auto_loop === "true") {
    let interval_func = () => {
      carousel_interval = setInterval(() => {
        gotoNextItem(carousel);
      }, interval);
    };
    let interval_clear_func = () => {
      clearInterval(carousel_interval);
    };

    interval_func(); //Start interval

    carousel.parentElement.onmouseout = interval_func; //Add start interval function to onmouseout
    carousel.parentElement.onmouseover = interval_clear_func; //Add clear interval function to onmouseover
  }

  if (scroll_bar === "true"){
    carousel.style.overflow = "auto";
  }

  if(last_button){
    last_button.onclick =  function(){
      gotoLastItem(carousel);
    };
  }
  if(next_button){
    next_button.onclick =  function(){
      gotoNextItem(carousel);
    };
  }

  counter += 1;
}


