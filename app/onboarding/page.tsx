import Link from 'next/link';
import Image from 'next/image';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Onboarding Indicator */}
      <div className="absolute top-8 left-0 right-0 flex justify-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
      </div>

      {/* Hero Image - Full width, extends to edges */}
      <div className="w-full h-[60vh] relative rounded-b-[40px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
          alt="Fashion model"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-8">
        {/* Title */}
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Find The<br />
            <span className="inline-block">Best Collections</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Get your dream item easily with FashionHub<br />
            and get other intersting offer
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="w-full flex gap-4 pb-8">
          <Link
            href="/explore"
            className="flex-1 py-5 px-8 border-2 border-gray-900 rounded-full text-center font-semibold text-lg"
          >
            Sign Up
          </Link>
          <Link
            href="/explore"
            className="flex-1 py-5 px-8 bg-primary text-white rounded-full text-center font-semibold text-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
