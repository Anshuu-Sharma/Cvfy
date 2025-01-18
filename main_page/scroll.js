
const elementsToAnimate = document.querySelectorAll('.aboutCvfyLeft, .aboutCvfyRightHeading, .aboutCvfyRightInfo');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

    }
    else{
        entry.target.classList.remove('in-view')
    }
  });
}, {
  threshold: 0.5  
});


elementsToAnimate.forEach(element => {
  observer.observe(element);
});
