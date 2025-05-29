import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect, useRef, useState } from 'react';

const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'u_images'); // Make sure this is unsigned

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dssoqpeiv/image/upload', {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      throw new Error('Cloudinary upload failed');
    }

    const result = await res.json();
    return result.secure_url;
  } catch (error) {
    console.error('Upload Error:', error);
    alert('Image upload failed. Please try again.');
    return null;
  }
};

const TiptapEditor = ({ content, onChange }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !editor) return;

    setUploading(true);
    const url = await uploadImageToCloudinary(file);
    setUploading(false);

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border rounded p-2 bg-white">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={triggerFileInput}
          className={`px-3 py-1 rounded text-sm ${
            uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      <EditorContent editor={editor} className="min-h-[200px] p-2 border rounded" />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default TiptapEditor;
