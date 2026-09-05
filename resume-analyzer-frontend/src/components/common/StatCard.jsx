function StatCard({ title, value, subtitle }) {

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">

            <h3 className="text-gray-500 text-sm">
                {title}
            </h3>

            <p className="text-3xl font-bold mt-3 text-blue-600">
                {value}
            </p>

            {subtitle && (
                <p className="text-gray-500 text-sm mt-2">
                    {subtitle}
                </p>
            )}

        </div>
    );
}

export default StatCard;