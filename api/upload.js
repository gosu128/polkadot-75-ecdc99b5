import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file } = req.body;
    
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Check if we have a Blob token
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.log('No Blob token found in environment variables');
      // For local development without Blob token, return a mock URL
      return res.status(200).json({ 
        url: 'https://placehold.co/600x400/png?text=Image+Uploaded',
        isMock: true,
        message: 'Using mock URL because BLOB_READ_WRITE_TOKEN is not set'
      });
    }

    try {
      // Convert base64 to buffer
      const buffer = Buffer.from(file.split(',')[1], 'base64');
      
      // Upload to Vercel Blob
      const { url } = await put(`complaints/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`, buffer, {
        access: 'public',
        contentType: 'image/jpeg',
      });

      return res.status(200).json({ url });
    } catch (blobError) {
      console.error('Error with Vercel Blob upload:', blobError);
      
      // If we're in development mode, return a mock URL instead of failing
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Using mock URL due to Blob upload error');
        return res.status(200).json({ 
          url: 'https://placehold.co/600x400/png?text=Image+Uploaded',
          isMock: true,
          message: 'Using mock URL due to Blob upload error',
          error: blobError.message
        });
      }
      
      // In production, rethrow the error
      throw blobError;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ 
      error: 'Failed to upload file',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 