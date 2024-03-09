import React from "react";
import HomeSection from "./HomeSection";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { slideData } from "../data/slideData";
const items = slideData.map((cdata) => {
  return (
    <img
      src={cdata.imageUrl}
      alt=""
      className=" cursor-pointer w-full h-[10rem] object-fit "
      role="presentation"
      style={{ height: "22rem", width: "102%" }}
    />
  );
});

const HomePage = () => {
  return (
    <HomeSection>
      <div className="">
        <div className="">
          <AliceCarousel
            className="-z-100"
            animationType="fadeout"
            animationDuration={800}
            disableButtonsControls
            infinite
            items={items}
            controlsStrategy="alternate"
            mouseTracking
            autoPlay
          />
        </div>
      </div>
    </HomeSection>
  );
};

export default HomePage;
