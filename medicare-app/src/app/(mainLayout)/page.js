import Banner from "../ui/Banner";
import Specialization from "../ui/Specialization";
import WhyChoose from "../ui/WhyChoose";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-12 pb-14 sm:space-y-16 lg:space-y-20">
      <Banner />
      <Specialization />
      <WhyChoose />
    </div>
  );
}
