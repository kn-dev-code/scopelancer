"use client"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import NavBar from '../pages/navbar'
import { Spinner } from '@/components/ui/spinner'
import { Skeleton } from '@/components/ui/skeleton'
import SideBar from '../pages/sidebar'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from '@/lib/axios/api'
import { resetPassword } from 'better-auth/api'
import { toast } from '@/components/ui/toast'

const Session = () => {
  const [addingSession, setAddingSession] = useState(false);
  const queryClient = useQueryClient();

  const sessionSchema = z.object({
    clientName: z.string().min(1, "Must be at least one character"),
    companyName: z.string().min(1, "Must be at least one character").optional(),
    title: z.string().min(5, "Must be at least 5 characters in title"),
    description: z.string().min(1, "Must be at least 5 characters in description").optional()
  })

  type SessionType = z.infer<typeof sessionSchema>;

  const { register, handleSubmit, reset, formState: { isDirty, dirtyFields, errors } } = useForm<SessionType>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      clientName: "",
      companyName: "",
      title: "",
      description: "",
    }
  })



  // Edit function & Resetting the session schema for editing
  const handleEditForm = () => {
    reset(sessionSchema);
  }

  // get session data
  const { data: sessionData, error, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = await api.get("/api/sessions/users");
      return data.sessions;
    }
  })

  // post session data
  const postSessionData = useMutation({
    mutationFn: async(newSessionData: SessionType) => {
      const {data} = await api.post("/api/sessions/users", newSessionData);
    }
  })
  // patch session data
  const {mutate} = useMutation({
    mutationFn: async(updatedData) => {
      const {data}  = await api.patch(`/api/sessions/users/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['session']});
    }
  });

  const onSubmit = (sessionSchema) => {
    mutate()
  }
  const deleteSessionData = () => {

  }


  return (
    <>
      <div className="bg-[#0A0F13] font-sans dark:bg-black w-full h-screen overflow-hidden">
        <NavBar />
        <SideBar />
        <main className="bg-[#0A0F13] w-[80%] py-32 px-16 dark:bg-black sm:items-start relative left-[20%] bottom-full border-2 border-[#22272C] h-screen">
          {/* Welcome and small description container */}
          <div className="flex flex-col justify-between w-[85%] relative left-0 bottom-14">
            {/* Will render later for user's name */}
            <h1 className="text-white text-2xl font-bold">Sessions</h1>
            <div className="flex flex-row justify-self-center justify-between">
              <span className="text-[#9199A2] text-sm">Every client call you've turned into documented scope.</span>
              <div className="relative left-[20%] bottom-4">
                <Button onClick={() => { }} className="bg-[#2EA2E6] text-black rounded-lg h-10 hover:bg-[#2EA2E6]/80 hover:cursor-pointer">
                  + New Session
                </Button>
              </div>
            </div>
          </div>
          {/* Recent sessions container */}
          <div>
            {/* Header display for recent sessions and the count */}

            <div>
              <Card className="bg-[#12161D] border-2 border-[#202327] rounded-2xl w-[25%] h-48 hover:border-2 hover:border-[#2E9EE0] hover:cursor-pointer hover:transition hover:duration-500 hover:ease-in-out">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle className="text-[#9199A2] text-md"><Spinner /></CardTitle> {/* Company Name */}
                    <CardTitle className=""><Skeleton className="w-24 bg-white" /></CardTitle> {/* Session Title */}
                    <Button className="rounded-lg"><Skeleton className="w-24" /></Button> {/* Session Status */}
                  </div>
                  <CardDescription className="text-white text-xl"><Skeleton className="w-24" /></CardDescription>
                  <CardDescription className="text-[#9199A2]"><Skeleton className="w-24" /></CardDescription>
                </CardHeader>
              </Card>
            </div>
            {/* Recent sessions list (In processing) */}
          </div>
        </main>
      </div>
    </>
  );
}

export default Session