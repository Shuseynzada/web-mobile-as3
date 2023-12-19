import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Project, { ProjectInterface } from './Project';
import { photoMe } from '../../assets';

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
        <div className='container mx-auto px-4'>
            <header className='text-center py-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white'>
                <h1 className='text-5xl font-bold leading-tight'>Welcome to My Portfolio</h1>
                <p className='mt-4 text-xl font-light'>Discover my projects and explore my work.</p>
                <a href="#projects" className="mt-6 inline-block px-6 py-2 text-lg font-medium text-white bg-opacity-80 bg-black rounded hover:bg-opacity-100 transition duration-300">View Projects</a>
            </header>
            <section className='bg-gray-50 py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-wrap items-center -mx-4'>
                        <div className='w-full lg:w-1/2 px-4 mb-6 lg:mb-0'>
                            <h2 className='text-4xl font-semibold text-gray-800 mb-4'>About Me</h2>
                            <p className='text-gray-700 text-lg mb-4'>
                                I'm a passionate software developer with a focus on front-end technologies.
                                With over I years of experience, I specialize in creating engaging, user-friendly
                                web applications. I'm dedicated to learning the latest technologies and bringing
                                innovative ideas to life.
                            </p>
                            {/* Add more paragraphs or content as needed */}
                        </div>
                        <div className='w-full lg:w-1/2 px-4 flex justify-center'>
                            <img src={photoMe} alt='About Me' className='rounded-lg shadow-lg max-w-sm lg:max-w-md' />
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-10' id='projects'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 relative'>
                    My Projects
                </h2>
                <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {projects.map((project, index) => <Project key={"project" + index} project={project} />)}
                </div>
            </section>
        </div>
    );
}
