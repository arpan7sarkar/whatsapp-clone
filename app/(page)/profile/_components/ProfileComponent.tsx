"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { ArrowLeft, Camera, Edit2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


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
      name: user?.name || "",
    }
  })
  const updateUserMutation = useMutation(api.users.updateUser);
  const onSubmit = async (data: { name: string }) => {
    try {
      if (user?.userId) {
        await updateUserMutation({
          userId: user.userId,
          name: data.name
        })
        setIsEditing(false);
      }
      router.refresh();
    } catch (error) {
      console.log(error);

    }
  }

  const handleImageChange = () => { }

  return (
    <>
      <header className='bg-[#202C33] [-2 flex items-center'>
        <Link href="/chat">
          <Button variant="ghost" size="icon" className=' mr-4 ' >
            <ArrowLeft className='h-6 w-6 text-[#00A884]' />
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
              <input type="file" id='profile-image' accept='image/*' className='hidden' onChange={handleImageChange} />
            </label>
          </div>
          <div className="w-full max-w-md space-y-4">
            <div className="bg-[#202C33] p-4 rounded-lg">
              <Label htmlFor="name" className="text-[#8696A0] text-sm">Name</Label>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 mt-1">
                  <Input
                    {...register("name", {
                      required: true
                    })}
                    className="bg-transparent border-none text-[#E9EDEF] focus-visible:ring-0"
                    autoFocus
                    onBlur={() => {
                      handleSubmit(onSubmit)
                    }}
                  />
                  <Button type="submit" size="sm" className="bg-[#00A884] hover:bg-[#00957B]">
                    Save
                  </Button>
                </form>
              ) : (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[#E9EDEF]">{user?.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-5 w-5 text-[#00A884]" />
                  </Button>
                </div>
              )}
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">Name is required</span>
              )}
            </div>
            <div className="bg-[#202C33] p-4 rounded-lg">
              <Label className="text-[#8696A0] text-sm">Email</Label>
              <div className="text-[#E9EDEF] mt-1">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileComponent