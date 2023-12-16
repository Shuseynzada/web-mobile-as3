import axios, { AxiosResponse } from "axios"
import { useEffect } from "react"

export interface ProjectInterface {
    title: string,
    description: string,
    link: string
}


const Project = ({ project }: { project: ProjectInterface }) => {
    return (
        <div className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
    )
}

export default Project
