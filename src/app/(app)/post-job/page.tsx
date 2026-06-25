
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createJobPostAction } from "./actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, Building, ClipboardPlus, Loader2, Mail, MapPin, Stethoscope } from "lucide-react"

export const createJobPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  hospital: z.string().min(3, "Hospital name must be at least 3 characters."),
  location: z.string().min(3, "Location must be at least 3 characters."),
  specialty: z.string().min(3, "Specialty must be at least 3 characters."),
  type: z.enum(["Permanent", "Locum", "Fellowship", "Telemed"]),
  contact: z.string().email("Please enter a valid email address for contact."),
})

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof createJobPostSchema>>({
    resolver: zodResolver(createJobPostSchema),
    defaultValues: {
      title: "",
      hospital: "",
      location: "",
      specialty: "",
      type: "Permanent",
      contact: "",
    },
  })

  async function onSubmit(values: z.infer<typeof createJobPostSchema>) {
    setIsLoading(true)
    const result = await createJobPostAction(values)
    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Success!",
        description: "Your job post has been created.",
      })
      router.push("/dashboard")
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Could not create job post.",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">
          Fill in the details below to find the perfect candidate.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Provide the specifics of the job opening.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., Consultant Cardiologist" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hospital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital/Clinic Name</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., Makati Medical Center" {...field} className="pl-10"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., Makati, Metro Manila" {...field} className="pl-10"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., Cardiology" {...field} className="pl-10"/>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Permanent">Permanent</SelectItem>
                          <SelectItem value="Locum">Locum</SelectItem>
                          <SelectItem value="Fellowship">Fellowship</SelectItem>
                          <SelectItem value="Telemed">Telemed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input type="email" placeholder="e.g., hr@hospital.com" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </>
            ) : (
              <>
                <ClipboardPlus className="mr-2 h-4 w-4" />
                Post Job
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
