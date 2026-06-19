import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const [errorCount, setErrorCount] = useState(10);
    const [pageCount, setPageCount] = useState(10);

    const navigate = useNavigate()

    useEffect(() => {
        const bodyWidth = window.innerWidth;

        const errorTextWidth = 80;
        const pageTextWidth = 150;

        setErrorCount(Math.floor(bodyWidth / errorTextWidth));
        setPageCount(Math.floor(bodyWidth / pageTextWidth));

        const handleMouseMove = (e) => {
            const leftTape = document.getElementById("leftTape");
            const centerTape = document.getElementById("centerTape");

            if (leftTape) {
                leftTape.style.transform = `translate(${e.pageX / 30}px, ${e.pageY / 30
                    }px) rotate(-45deg)`;
            }

            if (centerTape) {
                centerTape.style.transform = `translate(${e.pageX / 10}px, ${e.pageY / 10
                    }px) scale(1.5) rotate(5deg)`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-green-600 via-green-200 to-green-400 font-bold">
            {/* 404 */}
            <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-[10rem] md:text-[7rem]">4</h1>

                <div className="relative flex items-center justify-center mx-8 w-28">
                    <span className="absolute w-[200%] h-3 bg-green-400 rotate-45 border border-black shadow-lg"></span>

                    <span className="absolute w-[200%] h-3 bg-green-400 -rotate-45 border border-black shadow-lg"></span>
                </div>

                <h1 className="text-[10rem] md:text-[7rem]">4</h1>
            </div>

            {/* Left Tape */}
            <div
                id="leftTape"
                className="absolute top-[10%] left-[-20%] w-[105%] h-10 bg-gradient-to-b from-green-500 to-green-400 border border-black shadow-lg flex items-center justify-around rotate-[-45deg] animate-slideLeft"
            >
                {Array.from({ length: errorCount }).map((_, index) => (
                    <p key={index}>ERROR</p>
                ))}
            </div>

            {/* Center Tape */}
            <div
                id="centerTape"
                className="absolute bottom-[20%] w-[105%] h-10 bg-gradient-to-b from-green-500 to-green-400 border border-black shadow-lg flex items-center justify-around scale-150 rotate-[5deg] animate-slideCenter"
            >
                {Array.from({ length: pageCount }).map((_, index) => (
                    <p key={index}>PAGE NOT FOUND!</p>
                ))}
            </div>
            <Button onClick={() => { navigate('/') }}
                className='absolute bottom-[30%] left-1/2 -translate-x-1/2 px-6 py-3 bg-black text-white rounded-lg hover:scale-105 transition-all duration-300 '>Go Home
            </Button>


        </div>
    );
};

export default NotFound;