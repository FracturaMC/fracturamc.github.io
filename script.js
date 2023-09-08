function parallaxed(e) {
  var amountMovedX = (e.clientX * -0.3 / 20);
  var amountMovedY = (e.clientY * -0.3 / 20);
  var x = document.getElementsByClassName("parallaxed");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
  }
}

function showPopup() {
  document.getElementById("popup").classList.add("glass-popup-visible");
  document.getElementById("popup-bg").classList.add("popup-blur-bg-visible");
}

function hidePopup() {
  document.getElementById("popup").classList.remove("glass-popup-visible");
  document.getElementById("popup-bg").classList.remove("popup-blur-bg-visible");
}

function formSubmit(e) {
  var url = "https://docs.google.com/forms/d/e/1FAIpQLSc9iEgseNWS_kLYWi0xr98MBKQp0R9oOqW7IZH8cRAsmFko4A/formResponse";
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.send(new FormData(document.getElementById("pre-register-form")));
  return false;
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId){
  document.getElementById(formId).addEventListener("submit", formSubmit);
}