btconfig.onclick = function () {
  if (isvisible) {
    lbmainlabel.innerHTML = 'Visible';
    console.log('am CLicking');
    isvisible = false;
  } else {
    lbmainlabel.innerHTML = 'Invisible';
    isvisible = true;
  }
};
