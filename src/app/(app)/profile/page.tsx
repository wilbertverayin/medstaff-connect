import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { doctorProfiles } from "@/lib/data";
import { Briefcase, Building, Download, Edit, GraduationCap, MapPin, Phone, ShieldCheck } from "lucide-react";
import React from "react";

export default function ProfilePage() {
  const userProfile = doctorProfiles[0];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your professional identity and visibility.</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src="https://placehold.co/200x200.png" alt={userProfile.name} data-ai-hint="doctor portrait" />
                <AvatarFallback>{userProfile.name.slice(4,6)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-muted-foreground">{userProfile.specialization}</p>
              <p className="mt-4 text-sm text-balance">{userProfile.bio}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userProfile.availableFor.map(avail => (
                  <Badge key={avail} variant="secondary" className="text-base">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {avail}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">PRC License</h3>
                  <p className="text-muted-foreground">123456 (Verified)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GraduationCap className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Residency</h3>
                  <p className="text-muted-foreground">{userProfile.residency}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GraduationCap className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Fellowship</h3>
                  <p className="text-muted-foreground">{userProfile.fellowship}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Building className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Affiliations</h3>
                  <p className="text-muted-foreground">{userProfile.affiliations}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">{`${userProfile.city}, ${userProfile.province}`}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="font-medium">Curriculum Vitae.pdf</span>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium">Cardiology Board Certificate.pdf</span>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium">PCP Certificate.pdf</span>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download</Button>
                </li>
              </ul>
                <Button className="mt-4 w-full" variant="secondary">Upload Document</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
