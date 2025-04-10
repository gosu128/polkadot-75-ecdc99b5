import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertTriangle, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  product: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  complaint: z.string().min(10, {
    message: "Your complaint must be at least 10 characters.",
  }),
  images: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UxComplaintBox = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      product: "",
      complaint: "",
      images: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(files).forEach(file => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: `Only PNG and JPG files are allowed. Invalid files: ${invalidFiles.join(', ')}`,
        variant: "destructive",
      });
    }

    setSelectedImages(prev => [...prev, ...validFiles]);
    form.setValue('images', validFiles);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    if (selectedImages.length === 1) {
      form.setValue('images', undefined);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", data);
    console.log("Images:", selectedImages);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Complaint Submitted!",
      description: "Thank you for your feedback. We'll look into it.",
    });
    
    form.reset();
    setSelectedImages([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
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
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/Referenda.png" 
              alt="UX Complaint Box" 
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-polkadot-pink mr-2" />
              <h2 className="text-2xl font-semibold">Submit Your Complaint</h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product or Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Which product has the UX issue?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Complaint</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the UX issue in detail. What confused you? What didn't work as expected?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Screenshots (PNG/JPG only)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-polkadot-pink transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/png,image/jpeg"
                              multiple
                              onChange={handleImageChange}
                            />
                          </div>
                          
                          {selectedImages.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                              {selectedImages.map((file, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                                    <img 
                                      src={URL.createObjectURL(file)} 
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-polkadot-pink hover:bg-polkadot-pink/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                Your feedback helps us improve the Polkadot ecosystem. We review all submissions and prioritize fixes based on user impact.
              </p>
            </div>
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
