
export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">GitGram</div>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">Notifications</a>
                </div>
            </div>
        </nav>
    )
}