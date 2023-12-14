import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface Project {
    title: string,
    description: string,
    link: string
}

export default function Home() {

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(()=>{
        axios.get(import.meta.env.VITE_API_KEY+"/projects")
            .then((res:AxiosResponse)=>{
                setProjects(res.data)
            })
            .catch((err:AxiosError)=>{
                console.log(err.message)
            })
    },[])

    return (
        <div>
            <header>=
            </header>
            <section>
                <h1>Welcome to My Portfolio</h1>
                <p>General introduction about yourself or your work.</p>
            </section>
            <section>
                <h2>My Projects</h2>
                <div>
                    {projects.map((project, index) => (
                        <div key={index}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                        </div>
                    ))}
                </div>
            </section>
            <footer>
            </footer>
        </div>
    );
}
