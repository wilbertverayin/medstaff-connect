"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
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
import { findCandidatesAction } from "./actions"
import type { SuggestDoctorsForHROutput } from "@/ai/flows/suggest-doctors-for-hr"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Sparkles, UserCheck } from "lucide-react"

export const findCandidatesSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  specialtyNeeded: z.string().min(2, {
    message: "Specialty must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  jobType: z.enum(["Locum", "Permanent", "Fellowship", "Telemed"]),
})

export default function FindCandidatesPage() {
  const [suggestions, setSuggestions] = React.useState<SuggestDoctorsForHROutput>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<z.infer<typeof findCandidatesSchema>>({
    resolver: zodResolver(findCandidatesSchema),
    defaultValues: {
      jobTitle: "",
      specialtyNeeded: "",
      location: "",
      jobType: "Permanent",
    },
  })

  async function onSubmit(values: z.infer<typeof findCandidatesSchema>) {
    setIsLoading(true)
    setError(null)
    setSuggestions([])
    const result = await findCandidatesAction(values)
    setIsLoading(false)
    if (result.success && result.data) {
      setSuggestions(result.data)
    } else {
      setError(result.error || "An unknown error occurred.")
    }
  }

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold">Find Candidates with AI</h1>
        <p className="text-muted-foreground">
          Describe the job opening and let our AI suggest the best-fit doctors from the network.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill out the details of the position you need to fill.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Consultant Cardiologist" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialtyNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty Needed</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pediatrics" {...field} />
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
                        <Input placeholder="e.g., Makati, Metro Manila" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
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
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Get Suggestions"}
                {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
         <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
         </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">AI-Powered Suggestions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-6 w-6 text-primary" />
                    {suggestion.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Reason for Match:</strong> {suggestion.matchReason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!isLoading && !error && suggestions.length === 0 && form.formState.isSubmitted && (
         <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>No Suggestions Found</AlertTitle>
          <AlertDescription>The AI couldn't find any suitable matches based on your criteria. Try adjusting the job details.</AlertDescription>
        </Alert>
      )}

    </div>
  )
}
