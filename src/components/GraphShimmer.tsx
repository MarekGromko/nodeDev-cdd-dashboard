export default function GraphShimmer() {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
}