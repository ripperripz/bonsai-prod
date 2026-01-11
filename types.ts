export interface MenuItem {
  label: string;
  path: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface PaymentPlan {
  stage: string;
  percentage: string;
  description: string;
}