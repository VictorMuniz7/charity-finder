
export interface OrganizationObject{
  organizations: Organization[]
}

export interface Organization {
  activeProjects: number,
  addressLine1: string,
  addressLine2: string,
  city: string,
  country: string,
  iso3166CountryCode: string,
  ein: string,
  id: number,
  logoUrl: string,
  mission: string,
  name: string,
  postal: string,
  state: string,
  totalProjects: number,
  url: string,
  themes: Theme[],
  countries: CountryObject,

}

export interface Theme{
  id: string,
  name: string
}

export interface CountryObject{
  country: Country[]
}

export interface Country{
  iso3166CountryCode: string,
  name: string,
}
