import { Component } from '@angular/core';
import { Organization } from 'src/app/interfaces/organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent {

  organizationArray: Organization[] = []
  isLoading: boolean = false

  constructor(
    private organizationService: OrganizationService
  ){}

  getSearchData(data: any){
   this.searchForOrganizations(data.criteria, data.search)
  }
   searchForOrganizations(criteria: string, search: string){
    this.organizationService.setFilteredOrgs(criteria, search)
    this.organizationService.isLoading.subscribe((data) => {
      this.isLoading = data
    })

    this.organizationService.organizationsLoaded.subscribe((data) => {
      this.organizationArray = data
      console.log(this.organizationArray)
    })
  }

}
