export interface ProjectInterface {
    title: string,
    description: string,
    link: string
}

const Project = ({ project }: { project: ProjectInterface }) => {
    return (
        <div className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="px-6 py-4">
                <h3 className="font-bold text-xl mb-2 text-blue-600">{project.title}</h3>
                <p className="text-gray-700 text-base">{project.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 hover:text-teal-600 font-semibold transition duration-300 ease-in-out">
                    View Project
                </a>
            </div>
        </div>
    )
}

export default Project
