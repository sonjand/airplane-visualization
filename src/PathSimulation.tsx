import "./PathSimulation.css"
import { useState, useRef, useEffect } from "react";

const PathSimulation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [speedInput, setSpeedInput] = useState(10);
    const [yawInput, setYawInput] = useState(0);
    const [speed, setSpeed] = useState(10);
    const [yaw, setYaw] = useState(0);
    const [path, setPath] = useState([{ x: 0, y: 0 }]);
    const airplaneImage = useRef<HTMLImageElement | null>(null);
    const dt = 0.1;

    useEffect(() => {
        airplaneImage.current = new Image();
        airplaneImage.current.src = "/airplane-clip-art.png";
        airplaneImage.current.onload = () => {
            console.log("Image loaded successfully")
            setPath((prevPath) => [...prevPath]); // Trigger a re-render
        };

        airplaneImage.current.onerror = () => {
            console.error("Error loading image.");
        };
    });

    useEffect(() => {
        const updatePosition = () => {
            setPath((prevPath) => {
                const lastPos = prevPath[prevPath.length - 1];
                const newX = lastPos.x + speed * Math.cos(convertDegreesToRadians(yaw)) * dt * 10;
                const newY = lastPos.y + speed * Math.sin(convertDegreesToRadians(yaw)) * dt * 10;
                return [...prevPath, { x: newX, y: newY }];
            });
        };

        const interval = setInterval(updatePosition, dt * 1000);
        return () => clearInterval(interval);
    }, [speed, yaw]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const lastPos = path[path.length - 1];

        ctx.beginPath();
        path.forEach((point, index) => {
            const relativeX = centerX + (point.x - lastPos.x);
            const relativeY = centerY + (point.y - lastPos.y);
            if (index === 0) {
                ctx.moveTo(relativeX, relativeY);
            } else {
                ctx.lineTo(relativeX, relativeY);
            }
        });
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw airplane at center
        if (airplaneImage.current && airplaneImage.current.complete) {
            const imgWidth = 20;
            const imgHeight = 20;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(convertDegreesToRadians(yaw));
            ctx.drawImage(airplaneImage.current, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
            ctx.restore();
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(centerX - 10, centerY - 10, 20, 20);
        }
    }, [path]);

    const applyChanges = () => {
        setSpeed(speedInput);
        setYaw(yawInput);
    };

    return (
        <div className="simulator-container">
            <h1 className="simulator-title">Airplane Simulator</h1>
            <canvas ref={canvasRef} width={400} height={400} className="simulator-canvas" />
            <div className="controls">
                <div className="input-group">
                    <label>Speed (knots)</label>
                    <input
                        type="number"
                        value={speedInput}
                        onChange={(e) => setSpeedInput(Number(e.target.value))}
                        placeholder="Speed (knots)"
                    />
                </div>
                <div className="input-group">
                    <label>Yaw (degrees)</label>
                    <input
                        type="number"
                        value={yawInput}
                        onChange={(e) => setYawInput(Number(e.target.value))}
                        placeholder="Yaw (degrees)"
                    />
                </div>
                <button onClick={applyChanges}>Apply</button>
            </div>
        </div>
    );
};


function convertDegreesToRadians(degrees: number) {
    return (degrees * Math.PI) / 180
}

export default PathSimulation;
