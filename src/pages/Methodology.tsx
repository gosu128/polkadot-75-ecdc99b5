
import Header from '@/components/Header';

const Methodology = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32">
        <iframe 
          src="https://docs.google.com/presentation/d/e/2PACX-1vTK6cOXHFgXjxuBZbisQTnw26UM6o3ZXV0_6mLJH-lz8_E21gltwrZayHGQ-nS79E1Aa0sSVCsLY0r_/embed?start=false&loop=false&delayms=3000" 
          className="w-full h-[calc(100vh-200px)]"
          frameBorder="0" 
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Methodology;
