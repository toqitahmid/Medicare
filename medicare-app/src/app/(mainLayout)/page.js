import Banner from "../ui/Banner";
import Specialization from "../ui/Specialization";
import WhyChoose from "../ui/WhyChoose";


export default function Home() {
  return (
    <div className="lg:space-y-40 md:space-y-40 space-y-25">
      <Banner></Banner>
      <Specialization></Specialization>
      <WhyChoose></WhyChoose>
    </div>
  );
}
