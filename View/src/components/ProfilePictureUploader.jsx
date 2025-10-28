import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FaCamera, FaFileUpload, FaTrash } from 'react-icons/fa';

function ProfilePictureUploader({ onCapture }) {
    const [view, setView] = useState('options');
    const [capturedImage, setCapturedImage] = useState(null);
    const [stream, setStream] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            setStream(stream);
            setView('camera');
        } catch (err) {
            console.error("Erro ao acessar a câmera: ", err);
            alert(`Erro ao acessar a câmera: ${err.name}\n\nPor favor, verifique as permissões e se está em localhost.`);
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, [stream]);

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            const dataUrl = canvas.toDataURL('image/png');
            setCapturedImage(dataUrl);
            onCapture(dataUrl);
            setView('preview');
            stopCamera();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result;
                setCapturedImage(dataUrl);
                onCapture(dataUrl);
                setView('preview');
            };
            reader.readAsDataURL(file);
        }
    };

    const resetUploader = () => {
        setCapturedImage(null);
        onCapture(null);
        stopCamera();
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
        setView('options');
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stopCamera]);

    return (
        <div className="w-full flex flex-col items-center bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Escolher foto de perfil</h3>

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {view === 'options' && (
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={startCamera}
                        className="flex flex-col items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                        <FaCamera size={24} />
                        <span>Tirar Foto</span>
                    </button>
                    <input
                        type="file"
                        id="file-upload"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors cursor-pointer"
                    >
                        <FaFileUpload size={24} />
                        <span>Da Galeria</span>
                    </label>
                </div>
            )}

            {view === 'camera' && (
                <div className="flex flex-col items-center gap-4">

                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full max-w-xs bg-gray-800 rounded"
                    />
                    <button
                        type="button"
                        onClick={takePicture}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Capturar
                    </button>
                    <button
                        type="button"
                        onClick={resetUploader}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        Voltar
                    </button>
                </div>
            )}

            {view === 'preview' && (
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={capturedImage}
                        alt="Foto de perfil"
                        className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
                    />
                    <button
                        type="button"
                        onClick={resetUploader}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                        <FaTrash />
                        <span>Remover Foto</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfilePictureUploader;