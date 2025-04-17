import Image from "next/image";

export function Navbar(): React.JSX.Element {
    return (
        <nav className="mr-6 ml-6 mt-2 w-full">
            <div className="flex items-center">
                <Image
                    src={"https://live.staticflickr.com/65535/54455195422_75049b52e6_m.jpg"}
                    alt="Logo de KidsTrotter"
                    height={140}
                    width={140}
                />
                <div className="flex-1">
                    <h1 className="text-[var(--secondary-color)] bold text-center">KidsTrotter</h1>
                </div>
            </div>
        </nav>
    );
}