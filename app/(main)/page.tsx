import { Slider } from "@/components/slider";
import { getSliders } from "@/utils/getSliders";

export default async function Home() {
  const sliderData = await getSliders();

  return (
    <main className="p-4 md:p-10 md:px-16">
      <Slider sliderData={sliderData} />
    </main>
  );
}
