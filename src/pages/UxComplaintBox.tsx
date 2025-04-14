import React, { useState, useRef } from 'react';
import { AlertTriangle, Upload } from 'lucide-react';

// Add type definition for the Tally global object
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const UxComplaintBox = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    status: 'idle' | 'uploading' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setUploadStatus({ status: 'idle' });
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      fileUrl: '' // We'll handle this separately
    };

    try {
      // If there's a file, we need to upload it first
      let fileUrl = '';
      if (selectedFile && previewUrl) {
        try {
          setUploadStatus({ status: 'uploading', message: 'Uploading your file...' });
          
          // Upload the file to our API
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: previewUrl }),
          });
          
          const uploadResult = await uploadResponse.json();
          
          if (!uploadResponse.ok) {
            console.error('Upload failed:', uploadResult);
            setUploadStatus({ 
              status: 'error', 
              message: 'File upload failed. Continuing with form submission...' 
            });
            // Continue with submission even if file upload fails
            console.log('Continuing with form submission despite file upload failure');
          } else {
            fileUrl = uploadResult.url;
            console.log('File uploaded successfully:', fileUrl);
            
            if (uploadResult.isMock) {
              setUploadStatus({ 
                status: 'success', 
                message: 'Using a placeholder image for development' 
              });
            } else {
              setUploadStatus({ 
                status: 'success', 
                message: 'File uploaded successfully' 
              });
            }
          }
        } catch (uploadError) {
          console.error('Error during file upload:', uploadError);
          setUploadStatus({ 
            status: 'error', 
            message: 'File upload error. Continuing with form submission...' 
          });
          // Continue with submission even if file upload fails
          console.log('Continuing with form submission despite file upload error');
        }
      }

      // Update the data with the file URL
      const submissionData = {
        ...data,
        fileUrl
      };

      // Use a relative URL that works in both development and production
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadStatus({ status: 'idle' });
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-6 text-polkadot-dark">
            UX <span className="text-polkadot-pink">Complaint</span> Box
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Found something frustrating in the Polkadot ecosystem? Tell us about your UX pain points 
            and help us make the experience better for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center h-full">
            <img 
              src="./lovable-uploads/Referenda.png" 
              alt="UX Complaint Box" 
              className="w-full h-[calc(100vh-300px)] object-contain rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md h-full">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-polkadot-pink mr-2" />
              <h2 className="text-2xl font-semibold">Submit Your Complaint</h2>
            </div>

            {/* Custom Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-polkadot-pink focus:border-polkadot-pink"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-polkadot-pink focus:border-polkadot-pink"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Complaint
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-polkadot-pink focus:border-polkadot-pink"
                  placeholder="Describe the UX issue you encountered..."
                ></textarea>
              </div>
              
              {/* File Upload Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attach Screenshot (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="mb-4">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="mx-auto h-32 w-auto object-contain rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="mt-2 text-sm text-polkadot-pink hover:text-pink-600"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-polkadot-pink hover:text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-polkadot-pink"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* File Upload Status */}
              {uploadStatus.status !== 'idle' && (
                <div className={`p-3 rounded-md ${
                  uploadStatus.status === 'uploading' ? 'bg-blue-50 text-blue-700' :
                  uploadStatus.status === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-yellow-50 text-yellow-700'
                }`}>
                  {uploadStatus.message}
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-polkadot-pink text-white py-3 px-4 rounded-md hover:bg-pink-600 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </div>
              
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-md">
                  Thank you for your feedback! We'll review your complaint and work on improving the experience.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                  There was an error submitting your complaint. Please try again later.
                  {process.env.NODE_ENV === 'development' && (
                    <p className="mt-2 text-sm">Note: In development mode, file uploads may not work without proper configuration.</p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Your Feedback Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-polkadot-pink">Identify Pain Points</h3>
              <p className="text-gray-600">Your complaints help us discover where users are struggling the most.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-polkadot-pink">Prioritize Improvements</h3>
              <p className="text-gray-600">We use your feedback to decide which UX issues to tackle first.</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-polkadot-pink">Build Better Products</h3>
              <p className="text-gray-600">Your insights drive our mission to create more intuitive experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UxComplaintBox;
