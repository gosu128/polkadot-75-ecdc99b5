import Header from '@/components/Header';

const BDTeams = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex justify-center">
        <iframe 
          src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000" 
          className="w-[90vw] h-[50vw] max-w-6xl max-h-[80vh]" 
          frameBorder="0" 
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default BDTeams;
