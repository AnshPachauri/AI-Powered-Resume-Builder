import {useState,useEffect,} from 'react'
import {useNavigate} from 'react-router-dom'
import { PlusIcon , UploadCloudIcon} from "lucide-react"
import { dummyResumeData } from "../assets/assets";
import type { Resume } from "../assets/assets";
import { FilePenLineIcon , TrashIcon ,PencilIcon ,XIcon, UploadCloud } from 'lucide-react';



const Dashboard = () => {
    const colors = [
    '#2563EB', // Bright blue
    '#14B8A6', // Teal / cyan
    '#F97316', // Orange
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B'  // Amber
    ];


    const [allResumes, setAllResumes] = useState<Resume[]>([]);
    const [showCreateResume, setShowCreateResume] = useState<boolean>(false);
    const [showUploadResume, setShowUploadResume] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [resume, setResume] = useState<File | null>(null);
    const [editResumeId, setEditResumeId] = useState<string>('');

    const navigate = useNavigate();
    


    const loadAllResumes = async () => {
        setAllResumes(dummyResumeData);
    };
    const createResume = async (e : any) => {
        e.preventDefault();
        setShowCreateResume(false);
        navigate('/app/builder/res123')

    };
    const UploadResume = async (e : any) => {
        e.preventDefault();
        setShowUploadResume(false);
        navigate('/app/builder/res123')

    };
    useEffect(() => {
        loadAllResumes();
    }, []);

    const CreateResumeComponent = () => {
        return (
            <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                    <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter Resume Title' className='w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600' required/>
                    <button className='w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors'>Create Resume</button>
                    <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{
                        setShowCreateResume(false);
                        setTitle('');
                    }}/>
                </div>
            </form>
        )
    }

    const UploadResumeComponent = () => { 
        return (
            <form onSubmit={UploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
                <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                    <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume Title' className='w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600' required/>
                        <div>
                            <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                                Select resume file
                                <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-indigo-500 hover:text-indigo-700 cursor-pointer transition-colors'>
                                    {resume?(
                                        <p className='text-indigo-700'>{resume.name}</p>
                                    ):(
                                        <>
                                            <UploadCloud className = 'size-14 stroke-1' />
                                            <p>Upload resume</p>
                                        </>
                                        
                                    )}
                                </div>
                            </label>
                        </div>
                    <button className='w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors'>Upload Resume</button>
                    <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{
                        setShowUploadResume(false);
                        setTitle('');
                    }}/>
                </div>
            </form>
        )
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">

                <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">Welcome, Ansh Pachauri</p>
                <div className="flex gap-4">
                    <button onClick={()=> setShowCreateResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border borded-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <PlusIcon className = "size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-purple-500 text-white rounded-full" />
                        <p className="text-sm group-hover:text-purple-600 transition-all duration-300">Create Resume</p>
                    </button>

                    <button onClick={()=> setShowUploadResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border borded-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <UploadCloudIcon className = "size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-purple-500 text-white rounded-full" />
                        <p className="text-sm group-hover:text-purple-600 transition-all duration-300">Upload Existing</p>
                    </button>
                </div>

                <hr className="border-slate-300 my-6 sm:w-[305px]"/>

                <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
                    {allResumes.map((resume,index)=>{
                        const baseColor = colors[index % colors.length];
                        return (
                            <button key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer ' style={{background : `linear-gradient(135deg, ${baseColor}10,${baseColor}40)`,borderColor : baseColor + '40'}}>
                                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color : baseColor}}/>
                                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style = {{color : baseColor}}>{resume.title}</p>
                                <p className='absolute bottom-1 text-[11px] text-slate-400 grouphover:text-slate-500 transition-all duration-300 px-2 text-center' style = {{color : baseColor + '90'}}>
                                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                                <div className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                                    <TrashIcon className='size-7 p-1.5 hover:gb-white/50 rounded text-slate-700 transition-colors' /> 
                                    <PencilIcon className='size-7 p-1.5 hover:gb-white/50 rounded text-slate-700 transition-colors'></PencilIcon>
                                </div>
                            </button>
                        )
                    })}

                </div>
                
                {showCreateResume && <CreateResumeComponent/>}
                {showUploadResume && <UploadResumeComponent/>}

            </div>
        </div>
    )
}

export default Dashboard