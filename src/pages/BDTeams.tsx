import Header from '@/components/Header';

const BDTeams = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex justify-center">
        <div className="relative w-full max-w-screen-lg overflow-hidden">
         <iframe 
  src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000" 
  className="w-full h-[calc(100vh-210px)]" /* Decreased height slightly */
  frameBorder="0" 
  allowFullScreen
/>
        </div>
      </div>
    </div>
  );
};

export default BDTeams;
