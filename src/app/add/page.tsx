"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
}

type Option = {
    title: string,
    additionalPrice: number
}

const AddPage = () => {

    const { data: session, status } = useSession();
    const [inputs, setInputs] = useState<Inputs>({
        title:"",
        desc:"",
        price:0,
        catSlug:"",
    })

    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0,
    })

    const [options, setOptions] = useState<Option[]>([])

    const [file, setFile] = useState<FileList | null>()

    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        router.push("/");
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev=>{
            return{ ...prev,[e.target.name]:e.target.value}
        })
    }

    const changeOption = (e:React.ChangeEvent<HTMLInputElement>) => {
        setOption(prev=>{
            return{ ...prev,[e.target.name]:e.target.value}
        })
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            
            const res = await fetch("http://localhost:3000/api/products", {
                method:"POST",
                body:JSON.stringify({
                    ...inputs,
                    price: Number(inputs.price),
                    options: options.map(opt => ({...opt, additionalPrice: Number(opt.additionalPrice)})),
                    img: ""
                })
            })

            const data = await res.json()

            router.push(`/product/${data.id}`)
            
        } catch (err) {
            console.log(err);
        }
    }

    const upload = () => {

    }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} className='bg-fuchsia-50'>
      <form className='shadow-lg flex flex-wrap gap-6 p-8 w-2/5 mt-10 bg-white rounded-md' onSubmit={handleSubmit}>
        <h1 className='font-bold text-xl text-center w-full text-red-500'>Ajouter un nouveau produit</h1>
        <div className='w-full flex flex-col gap-2'>
            <label>Désignation</label>
            <input className='ring-1 ring-red-400 p-2 rounded-sm' type="text" name='title' onChange={handleChange}/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Image</label>
            <input className='ring-1 ring-red-400 p-2 rounded-sm' type="file" onChange={e => setFile(e.target.files)}/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label >Description</label>
            <textarea className='ring-1 ring-red-400 p-2 rounded-sm' name='desc' onChange={handleChange}/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Prix</label>
            <input className='ring-1 ring-red-400 p-2 rounded-sm' type="number" name='price' onChange={handleChange}/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Catégorie</label>
            <input className='ring-1 ring-red-400 p-2 rounded-sm' type="text" name='catSlug' onChange={handleChange}/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Options</label>
            <div className='flex gap-2'>
                <input onChange={changeOption} className='ring-1 ring-red-400 p-2 rounded-sm' type="text" placeholder='Titre' name='title'/>
                <input onChange={changeOption} className='ring-1 ring-red-400 p-2 rounded-sm' type="number" placeholder='Prix additionnel' name='additionalPrice'/>
            </div>
                <div>
                    {options.map((item) => (<div key={item.title} className='ring-1 p-2 ring-red-500 rounded-sm cursor-pointer w-2/3 mb-2 first:mt-2' onClick={() => setOptions(options.filter((opt) => opt.title !== item.title))}>
                        <span>{item.title}</span>
                        <span>MGA {item.additionalPrice}</span>
                    </div>))}
                </div>
            <div className='bg-red-500 w-36 h-10 rounded-sm text-white text-center p-2' onClick={() => setOptions((prev) => [...prev, option])}>Ajouter options</div>
        </div>
        
      <button type='submit' className='rounded-lg p-2 w-full bg-red-600 text-white'>Soumettre</button>
      </form>
    </div>
  )
}

export default AddPage
