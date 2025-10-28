import { useRef, useState, useCallback, useEffect } from 'react';


function CameraCapture({ onCapture }) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [stream, setStream] = useState(null)
    const [capturedImage, setCapturedImage] = useState(null)

    const startCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setStream(stream)
            setCapturedImage(null)
            onCapture(null)
        } catch (err) {
            console.error("Erro ao acessar a câmera: ", err)
            alert("Não foi possível acessar a câmera. Verifique as permissões.")
        }
    }, [onCapture])

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
            setStream(null)
        }
    }, [stream])

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

            const dataUrl = canvas.toDataURL('image/png')
            setCapturedImage(dataUrl)
            onCapture(dataUrl)
            stopCamera()
        }
    }

    useEffect(() => {
        return () => {
            stopCamera()
        }
    }, [stopCamera])

    return (
        <div className="flex flex-col items-center gap-2 my-4">
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {capturedImage ? (
                <img src={capturedImage} alt="Foto de perfil" className="w-64 h-auto rounded border-2 border-green-500" />
            ) : (
                <video ref={videoRef} autoPlay playsInline className={`w-64 bg-gray-800 rounded ${!stream && 'hidden'}`} />
            )}

            {!stream && !capturedImage && (
                <button onClick={startCamera} type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Abrir Câmera
                </button>
            )}
            {stream && (
                <button onClick={takePicture} type="button" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Tirar Foto
                </button>
            )}
            {capturedImage && (
                <button onClick={startCamera} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Tirar Outra Foto
                </button>
            )}
        </div>
    )
}

export default CameraCapture