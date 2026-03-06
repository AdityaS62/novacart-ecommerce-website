export function ProductCardSkeleton() {
    return (
        <div className="card">
            <div className="aspect-square skeleton" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-16 skeleton" />
                <div className="h-4 w-3/4 skeleton" />
                <div className="h-3 w-20 skeleton" />
                <div className="h-5 w-24 skeleton" />
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="w-full h-[500px] rounded-3xl skeleton" />
    );
}

export function TextLineSkeleton({ width = 'w-full', height = 'h-4' }) {
    return <div className={`${width} ${height} skeleton`} />;
}
