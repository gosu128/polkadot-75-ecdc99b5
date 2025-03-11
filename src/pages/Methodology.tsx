import Header from '@/components/Header';

const Methodology = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32">
        <embed 
  src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs//methodology.pdf" 
  type="application/pdf"
  className="w-full h-[90vh]"
/>
      </div>
    </div>
  );
};

export default Methodology;
