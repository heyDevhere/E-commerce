import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontex";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "Dev Ecommerce",
    src:"images/stockfresh_7725590_business-desktop-with-credit-card_sizeXL-1.jpg",

  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />
    </>
  );
};

export default About;
