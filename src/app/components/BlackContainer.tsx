export default function BlackContainer({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-black opacity-[90%] rounded pr-[15%] pl-[15%] pt-[5%] pb-[5%] z-10">
            {children}
        </div>
    );
}