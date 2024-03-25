import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SliderProps = {
  sliderData: Slider[];
};

export const Slider = ({ sliderData }: SliderProps) => {
  console.log(sliderData);

  return (
    <Carousel>
      <CarouselContent>
        {sliderData.map((slider) => (
          <CarouselItem key={slider.id}>
            <Image
              src={slider.attributes.image.data.attributes.url}
              alt={slider.attributes.name}
              width={1000}
              height={400}
              className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
