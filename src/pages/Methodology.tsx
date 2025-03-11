import Header from '@/components/Header';

const Methodology = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32">
        <iframe 
  src={`https://docs.google.com/gview?url=${encodeURIComponent("https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs//methodology.pdf")}&embedded=true`} 
  className="w-full h-[calc(100vh-200px)]"
  frameBorder="0"
  allowFullScreen
/>
      </div>
    </div>
  );
};

export default Methodology;
