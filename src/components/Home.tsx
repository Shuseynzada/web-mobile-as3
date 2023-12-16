import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Project, { ProjectInterface } from './Project';


export default function Home() {

    const [projects, setProjects] = useState<ProjectInterface[]>([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_KEY + "/projects")
            .then((res: AxiosResponse) => {
                setProjects(res.data)
            })
            .catch((err: AxiosError) => {
                console.log(err.message)
            })
    }, [])

    return (
        <div className='home-container'>
            <header className='home-header'>
                <h1>Welcome to My Portfolio</h1>
                <p>General introduction about yourself or your work.</p>
            </header>
            <section className='projects-section'>
                <h2>My Projects</h2>
                <div className='projects-list'>
                    {projects.map((project, index) => <Project key={"project" + index} project={project} />)}
                </div>
            </section>
            <footer>
            </footer>
        </div>
    );
}
