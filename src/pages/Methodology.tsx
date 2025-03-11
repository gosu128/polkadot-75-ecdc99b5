
import Header from '@/components/Header';

const Methodology = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32">
        <iframe 
          src="https://docs.google.com/presentation/d/1_ZD9gZb7flXCKxO_3t4R0HIm1TdjCHltD1hvtU_2z0M/edit?usp=sharing/embed?start=false&loop=false&delayms=3000" 
          className="w-full h-[calc(100vh-200px)]"
          frameBorder="0" 
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Methodology;
