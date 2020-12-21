function sliderAuto() {
  const slider = document.querySelector('.testimonials-slider'),
    sliderInner = slider.querySelector('.testimonials-slider__inner'),
    slides = slider.querySelectorAll('.testimonials-item');

  const resizeScreen = () => {
    const width = window.getComputedStyle(slider).width;

    let offset = 0,
      interval;

    let xDown = null,
      yDown = null;

    sliderInner.style.transform = `translateX(${offset}px)`;

    sliderInner.style.width = `${100 * slides.length}%`;
    slides.forEach(slide => slide.style.width = width);

    function nextSlide() {
      if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += +width.slice(0, width.length - 2);
      }
      sliderInner.style.transform = `translateX(-${offset}px)`;
    }

    function prevSlide() {
      if (offset === 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      } else {
        offset -= +width.slice(0, width.length - 2);
      }
      sliderInner.style.transform = `translateX(-${offset}px)`;
    }

    function autoPlaySlide() {
      nextSlide();
    }

    function startSlide() {
      interval = setInterval(autoPlaySlide, 5000);
    }

    function stopSlide() {
      clearInterval(interval);
    }

    function getTouches(evt) {
      return evt.touches || evt.originalEvent.touches;
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          nextSlide();
          stopSlide();
        } else {
          prevSlide();
          stopSlide();
        }
      }
      xDown = null;
      yDown = null;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    slider.addEventListener('mouseenter', (e) => {
      if (e.target.matches('.testimonials-slider')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseleave', (e) => {
      if (e.target.matches('.testimonials-slider')) {
        startSlide();
      }
    });

    startSlide();
  };

  resizeScreen();
  window.addEventListener('resize', () => resizeScreen());

}

export default sliderAuto;