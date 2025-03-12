import Header from '@/components/Header';

const BDTeams = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex justify-center">
        <div className="relative w-full max-w-[1100px]">
          {/* Correct Aspect Ratio Wrapper (Google Slides default is 4:3 or 16:9) */}
          <div className="relative w-full" style={{ paddingTop: "75%" }}>  
            <iframe
              src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000"
              className="absolute top-0 left-0 w-full h-full border-0"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDTeams;

