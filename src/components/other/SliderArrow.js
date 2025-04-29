export const PrevArrow = ({ currentSlide, slideCount, ...arrowProps }) => (
  <a {...arrowProps} href="#">
    <i className="far fa-angle-left"></i>
  </a>
);

export const NextArrow = ({ currentSlide, slideCount, ...arrowProps }) => (
  <a {...arrowProps} href="#">
    <i className="far fa-angle-right"></i>
  </a>
);

// Add default export for both arrow components
export default { PrevArrow, NextArrow };
