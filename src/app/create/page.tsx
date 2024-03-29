"use client"

import { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"



const defaultErrorState = {
    title: '',
    bgImage: '',
    content: ''
}

export function ConvexImage({ imageId }: { imageId: Id<"_storage"> }) {
    const imageUrl = useQuery(api.files.getImageUrl, { imageId });

    return (
        imageUrl && (
            <Image
                alt="image test image"
                className="w-fit"
                src={imageUrl}
                width={200}
                height={200}
            />
        )
    );
}

export default function CreatePage() {

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const [bgImage, setBgImage] = useState<Id<"_storage"> | null>(null);
    const createBlogpost = useMutation(api.blogs.createBlogpost);
    const [errors, setErrors] = useState(defaultErrorState)
    const { toast } = useToast()
    const router = useRouter();
    const session = useSession()

    return (
        <div className="mt-16">
            <h1 className="text-4xl font-bold mb-8">Create a Blog Post</h1>
            <p className="text-lg max-w-md mb-6">start a your new journey with us</p>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const title = formData.get("title") as string;
                    const content = formData.get("content") as string;
                    let newErrors = {
                        ...defaultErrorState,
                    };

                    if (!title) {
                        newErrors = {
                            ...newErrors,
                            title: "please fill in this required field",
                        };
                    }

                    if (!content) {
                        newErrors = {
                            ...newErrors,
                            content: "please fill in this required field",
                        };
                    }

                    if (!bgImage) {
                        newErrors = {
                            ...newErrors,
                            bgImage: "please fill in this required field",
                        };
                    }



                    setErrors(newErrors);
                    const hasErrors = Object.values(newErrors).some(Boolean);

                    if (hasErrors) {
                        toast({
                            title: "Form Errors",
                            description: "Please fill fields on the page",
                            variant: "destructive",
                        });
                        return;
                    }

                    const blogpostID = await createBlogpost({
                        bgImage: bgImage,
                        title,
                        profileImage: session.session?.user.imageUrl,
                        content
                    })

                    router.push(`/thumbnails/${blogpostID}`)

                }}
            >

                <div className="space-y-8 pb-8">
                    
                    <div className={clsx("flex  flex-col gap-4 rounded p-2", {
                        "border border-red-500": errors.bgImage
                    })}>
                        <h2 className="text-2xl font-bold">Test Background Image </h2>

                        {bgImage && (
                            <ConvexImage imageId={bgImage} />
                        )}

                        <UploadButton
                            uploadUrl={generateUploadUrl}
                            fileTypes={["image/*"]}
                            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                                setBgImage((uploaded[0].response as any).storageId);
                            }}
                            onUploadError={(error: unknown) => {
                                // Do something with the error.
                                alert(`ERROR! ${error}`);
                            }}
                        />
                        {errors.bgImage && <div className="text-red-500">{errors.bgImage}</div>}
                    </div>
                    
                    
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="title">Title</Label>
                        <Input name="title" className={clsx({
                            "border border-red-500": errors.title
                        })} id="title" type="text" placeholder="Title." />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="content">Content</Label>
                        <Textarea name="content" id="content" placeholder="Type your content here." />
                        {errors.content && <div className="text-red-500">{errors.content}</div>}
                    </div>
       

                    
                </div>

                <Button>Create Blog</Button>
            </form>
        </div>
    )
}