import video from '../assets/video.mp4'

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source
          src={video}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}