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

function preRegister(event) {
  event.preventDefault();

  var email = document.getElementById("pre-register-email").value;
  var username = document.getElementById("pre-register-namemc").value;
  var discord = document.getElementById("pre-register-nameds").value;
  var submitBtn = document.getElementById("pre-register-submit");

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSc9iEgseNWS_kLYWi0xr98MBKQp0R9oOqW7IZH8cRAsmFko4A/formResponse', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },    
    body: new URLSearchParams({
      'entry.1541645260': email,
      'entry.2104314557': username,
      'entry.1456682242': discord
    }).toString()
  }).then((success) => {
    submitBtn.value = "Registrato!";
    submitBtn.classList.add("success");

    setTimeout(function() {
      hidePopup();
      submitBtn.value = "Pre-registrati";
      submitBtn.classList.remove("success");
    }, 1500);

  }, (fail) => {
    submitBtn.value = "Riprova";
    submitBtn.classList.add("error");

    setTimeout(function() {
      submitBtn.value = "Pre-registrati";
      submitBtn.classList.remove("error");
    }, 1500);
  });
  
  return false;
}
