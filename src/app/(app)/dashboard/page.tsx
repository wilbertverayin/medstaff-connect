import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { jobPosts } from "@/lib/data"
import { Briefcase, Building, MapPin, PlusCircle, Search, Stethoscope } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Board</h1>
          <p className="text-muted-foreground">
            Find your next career opportunity in the medical field.
          </p>
        </div>
        <Link href="/post-job" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </div>


      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by title, hospital..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
            <SelectItem value="dermatology">Dermatology</SelectItem>
            <SelectItem value="orthopedic-surgery">Orthopedic Surgery</SelectItem>
            <SelectItem value="family-medicine">Family Medicine</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metro-manila">Metro Manila</SelectItem>
            <SelectItem value="cebu">Cebu</SelectItem>
            <SelectItem value="davao">Davao</SelectItem>
          </SelectContent>
        </Select>
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPosts.map((job, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-2">
                <Building className="h-4 w-4" /> {job.hospital}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Stethoscope className="h-4 w-4" />
                <span>{job.specialty}</span>
              </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge variant={job.type === 'Locum' ? 'secondary' : 'outline'}>
                {job.type}
              </Badge>
              <Button variant="default">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
