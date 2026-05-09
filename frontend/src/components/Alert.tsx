


export default function Alert({children}) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
            <strong className="font-bold">Error!</strong>
            {children}
        </div>
    )
}