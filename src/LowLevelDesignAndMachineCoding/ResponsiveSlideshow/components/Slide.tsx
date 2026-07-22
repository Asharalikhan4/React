interface SlidePropsTypes {
  image_url: string,
  caption: string,
  active: boolean
};

const Slide = ({ image_url, caption, active }: SlidePropsTypes) => {
  console.log("Slide Component", image_url)
  return (
    <div>
      <div className={`slide ${active ? "active" : ""}`}>
        <img src={image_url} alt={caption} />
        <span>{caption}</span>
      </div>
    </div>
  );
};

export default Slide;