export default function GraphShimmer() {
    return (
        <div className="flex w-full h-full flex-col gap-4">
            <div className="h-4"/>
            <div className="skeleton flex-1 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
}