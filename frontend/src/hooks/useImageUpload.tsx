import { useState, ChangeEvent } from 'react';

export function useImageUpload() {
    const [image, setImage] = useState<File | null>(null);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }

    return {
        image,
        handleFileChange,
    };
}
