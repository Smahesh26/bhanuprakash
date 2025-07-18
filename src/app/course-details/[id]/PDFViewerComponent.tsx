"use client";
import { useState } from 'react';

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewerComponent = ({ fileUrl }: PDFViewerProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '100%', minHeight: 600 }}>
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: 20, 
          color: '#5624d0' 
        }}>
          Loading PDF...
        </div>
      )}
      <iframe
        src={fileUrl}
        title="PDF Viewer"
        style={{ 
          width: '100%', 
          height: 600, 
          border: 'none', 
          borderRadius: 8 
        }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default PDFViewerComponent;