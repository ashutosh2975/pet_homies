import React from "react";
import HomeLandingContainer from "./HomeLandingContainer";
import CardBelowHome from "./CardBelowHome";
import PlanningToAdoptAPet from "./PlanningToAdoptAPet";
import AnimatedPetSlider from "./AnimatedPetSlider";

const Home = (props) => {
  return (
    <>
      <HomeLandingContainer description={props.description} />
      <CardBelowHome />
      <PlanningToAdoptAPet />
      <AnimatedPetSlider />
    </>
  );
};

export default Home;
