// AI features disabled for static build

export interface SuggestDoctorsForHRInput {
  jobTitle: string;
  specialtyNeeded: string;
  location: string;
  jobType: 'Locum' | 'Permanent' | 'Fellowship' | 'Telemed';
  doctorProfiles: Array<{
    name: string;
    specialization: string;
    residency?: string;
    fellowship?: string;
    affiliations: string;
    city: string;
    province: string;
    availableFor: Array<'Locum' | 'Full-time' | 'Telemed' | 'Referrals'>;
    bio: string;
  }>;
}

export type SuggestDoctorsForHROutput = Array<{
  name: string;
  matchReason: string;
}>;

export async function suggestDoctorsForHR(input: SuggestDoctorsForHRInput): Promise<SuggestDoctorsForHROutput> {
  return [];
}
