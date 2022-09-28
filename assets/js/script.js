
let counter = 0; //Store current carousel div number

function gotoNextItem(carousel) {

  const {loop, current_item, scroll_val, items} = getAttributeValues(carousel);

  carousel.scrollLeft += scroll_val;

  if (loop === "true" &&  current_item >= items) {
    if(window.screen.availWidth <= 576){
      carousel.setAttribute("current_item", 1);
    }else{
      carousel.setAttribute("current_item", +carousel.getAttribute("show-item"));
    }
    carousel.scrollTo(1, 0);
    return
  }

  carousel.setAttribute("current_item", current_item + 1);
}

function gotoLastItem(carousel) {
  
  const {loop, current_item, scroll_val, items} = getAttributeValues(carousel);

  carousel.scrollLeft-=scroll_val;
  
  if (loop === "true" && current_item === +carousel.getAttribute("show-item")) {
    carousel.setAttribute("current_item", items)
    carousel.scrollTo(scroll_val * items, 0);
    return
  }

  carousel.setAttribute("current_item", current_item - 1)
}

//To start auto loop carousel
for (const carousel of document.getElementsByClassName("items")) {
  let height = carousel.getAttribute("height") || "330px"; //Get height attribute from carousel
  let auto_loop = carousel.getAttribute("auto-loop") || "true"; //Get auto loop attribute from carousel
  let interval = +carousel.getAttribute("interval") || 5000; //Get interval attribute from carousel
  let scroll_bar = carousel.getAttribute("scroll") || "false"; //Get scroll bar show state attribute from carousel
  let show_item = +carousel.getAttribute("show-item") || 2; //Get show item number attribute from carousel

  let item_margin = parseInt( window.getComputedStyle ( carousel.children[0]).marginRight) * 2; //Get item margin from carousel
  
  if(window.screen.availWidth <= 576){
    carousel.setAttribute("current_item", 1);
    carousel.setAttribute("show-item", 1);
    show_item = 1;
  }
  else{
    carousel.setAttribute("current_item", show_item) ; //Set last displayed item attribute from carousel
  }
  
  carousel.setAttribute("show-item", show_item) ; //Set last displayed item attribute from carousel

  let width = `${(+carousel.children[0].offsetWidth + item_margin)  * show_item}px` ;

  carousel.style.width = width;
  carousel.style.height = height;

  checkAutoLoop(carousel, auto_loop, interval);
  

  if (scroll_bar === "true"){
    carousel.style.overflow = "auto";
  }

  setCarouselControlButtons(carousel, counter);

  counter += 1;
}


function getAttributeValues(carousel){
  let loop = carousel.getAttribute("loop") || "true";
  let current_item = +carousel.getAttribute("current_item");
  let scroll_val = carousel.children[0].offsetWidth + 20; // width + margin
  let items = carousel.childElementCount;

  return {loop, current_item, scroll_val, items}
}

function setCarouselControlButtons(carousel, counter){
  let last_button = document.getElementsByClassName("last-button")[counter]; // Get last button for this carousel
  let next_button = document.getElementsByClassName("next-button")[counter]; // Get next button for this carousel
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
}

function checkAutoLoop(carousel, auto_loop, interval){

  let carousel_interval; //Start current carousel interval
  if (auto_loop === "true") {
    let interval_func = () => {
      carousel_interval = setInterval(() => {
        gotoNextItem(carousel);
      }, interval);
    };
    let interval_clear_func = () => {
      clearInterval(carousel_interval);
    };

    if(+carousel.getAttribute("show-item") < carousel.childElementCount){
      interval_func(); //Start interval
    }

    carousel.parentElement.onmouseout = interval_func; //Add start interval function to onmouseout
    carousel.parentElement.onmouseover = interval_clear_func; //Add clear interval function to onmouseover
  }

}