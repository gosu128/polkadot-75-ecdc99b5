import Header from '@/components/Header';

const BDTeams = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex justify-center">
        <div className="bg-white p-2 w-full max-w-[1280px]"> {/* Adjust max width */}
          <iframe 
            src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000" 
            className="w-full aspect-[16/9] border-0"  // Enforce 16:9 aspect ratio
            frameBorder="0" 
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default BDTeams;
