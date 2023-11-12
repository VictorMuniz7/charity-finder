import { Injectable } from '@angular/core';
import { Organization } from '../interfaces/organization';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter(criteria: string, search: string, orgsArray: Organization[]) {
    let filteredResults: Organization[] = []

    switch (criteria) {
      case 'name': filteredResults = orgsArray.filter(org => org.name.toLowerCase().includes(search.toLowerCase()))
        break

      case 'country': filteredResults = orgsArray.filter(org => org.country.toLowerCase().includes(search.toLowerCase()))
        break

      case 'countries':
        filteredResults = orgsArray.filter(org => {
          if(org.countries.country !== undefined){
            return org.countries.country.some(country =>
              country.name.toLowerCase().includes(search?.toLowerCase() ?? '')
            );
          } else {
            return false
          }
        });
        break;
        default: return orgsArray
    }

    return filteredResults
  }
}
