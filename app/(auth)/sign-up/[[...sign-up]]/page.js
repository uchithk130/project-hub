import { SignUp } from "@clerk/nextjs";
import Image from 'next/image';
import croppedImage from "../../../../public/cropped_image.png";
export default function Page() {
  return (

    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-blue-200 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt=""
            src={croppedImage}
            className="absolute inset-0 h w-3/5 object-cover opacity-80 mx-auto px-10 pt-8 pb-0"
          />
    
          <div className="hidden lg:relative lg:block lg:p-12">
            
    
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl pt-0">
              Welcome to<p><span className="font-semibold text-gray-700 text-7xl">Project HUB</span></p> 
            </h2>
    
            <p className="mt-4 leading-relaxed text-white/90">
              {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
              quibusdam aperiam voluptatum. */}
            </p>

          </div>
        </section>
        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <SignUp />
        </main>
      </div>
    </section>
      );;
}