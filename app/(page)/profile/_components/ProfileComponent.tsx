"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Preloaded, usePreloadedQuery } from 'convex/react'
import { ArrowLeft, Camera } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"


const ProfileComponent = ({ userInfo }: { userInfo: Preloaded<typeof api.users.readUser> }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const user = usePreloadedQuery(userInfo);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:user?.name || "",
    }
  })
  
  const onSubmit = () => {}
  
  const handleImageChange = () => {}

  return (
    <>
    <header className='bg-[#202C33] [-2 flex items-center'>
      <Link href="/chat">
      <Button variant="ghost" size="icon" className=' mr-4 ' >
        <ArrowLeft className='h-6 w-6 text-[#00A884]'/>
      </Button>
      </Link>
      <h1 className='text-2xl font-bold text-[#00A884]'>Profile</h1>
    </header>

    <div className='flex-1 overflow-y-auto '>
      <div className='p-4 flex flex-col items-center'>

        <div className='relative mb-6'>
          <Avatar className='h-40 w-40 '>
            <AvatarImage src={user?.profileImage || ""} alt='Profile' />
            <AvatarFallback className='text-[#00A884]'>{user?.name || ""}</AvatarFallback>
          </Avatar>
          <label htmlFor="profile-image" className='absolute bottom-0 right-0 bg-[#00A884] rounded-full p-2 cursor-pointer '>
            <Camera className='h-6 w-6 text-[#111B21]' />
            <input type="file" id='profile-image' accept='image/*' className='hidden' onChange={handleImageChange}  />
          </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileComponent