import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Organization } from '../interfaces/organization';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private readonly apiKey = environment.apiKey

  nextOrgId: number = 1
  filteredList: Organization[] = []

  public organizationsLoaded: EventEmitter<any[]> = new EventEmitter();
  public isLoading: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private filterService: FilterService
  ) {}

  getOrganizations(){
    return this.http.get<any>(`https://api.globalgiving.org/api/public/orgservice/all/organizations/vetted?&api_key=${this.apiKey}&nextOrgId=${this.nextOrgId}`)
  }

  setFilteredOrgs(criteria: string, search: string){
    this.getAllOrganizations(criteria, search, [])
  }

  getAllOrganizations(criteria: string, search: string, allOrganizations: Organization[]){
    this.getOrganizations().subscribe((data) => {
      allOrganizations = allOrganizations.concat(this.filterService.filter(criteria, search, data.organizations.organization))

      if(data.organizations.nextOrgId && allOrganizations.length <= 39){
        this.isLoading.emit(true)
        this.nextOrgId = data.organizations.nextOrgId;
        this.getAllOrganizations(criteria, search, allOrganizations)
        this.organizationsLoaded.emit(allOrganizations)
      } else {
        this.isLoading.emit(false)
        this.filteredList = allOrganizations
        this.organizationsLoaded.emit(allOrganizations)
      }
    })
  }




}


