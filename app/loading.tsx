// import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
            <img src={loader.src} height={150} width={150} alt="Loading..." />
        </div>
    );
};

export default LoadingPage;

// Using <img> instead of <Image> because:
// 1. next/image adds optimization (WebP/AVIF) that doesn't apply to animated GIFs
// 2. Statically imported images have inferred width/height that conflict
//    with explicit props, triggering the "width or height modified" warning   