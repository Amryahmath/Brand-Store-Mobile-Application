import Link from 'next/link';
import Image from 'next/image';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 mx-auto max-w-md">
      {/* Onboarding Indicator */}
      <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Hero Image */}
        <div className="w-full max-w-[270px] mb-10 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
            alt="Fashion model"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Find The<br />
            <span className="inline-block">Best Collections</span>
          </h1>
          <p className="text-gray-500 text-sm px-4 leading-relaxed">
            Get your dream item easily with FashionHub<br />
            and get other intersting offer
          </p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="w-full flex gap-4 pb-8">
        <Link
          href="/explore"
          className="flex-1 py-5 px-8 border-2 border-gray-900 rounded-full text-center font-semibold text-lg hover:bg-gray-50 transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="/explore"
          className="flex-1 py-5 px-8 bg-primary text-white rounded-full text-center font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
