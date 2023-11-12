import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Organization } from 'src/app/interfaces/organization';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchData: EventEmitter<{criteria: string, search: string}> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
  ){}

  form = this.formBuilder.group({
    search: new FormControl('', Validators.required),
    criteria: 'name'
  })

  orgsArray: Organization[] = []

  getOrganizations(){
    let {search, criteria} = this.form.value

    if(search && criteria){
      this.searchData.emit({criteria, search})
    }

  }


}
