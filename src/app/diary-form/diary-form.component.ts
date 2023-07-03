import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DiaryEntry } from '../shared/dairy-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent implements OnInit {

  editMode = false;
  private paramId: string;
  diaryEntry: DiaryEntry;

  diaryForm : FormGroup;
  
  
  constructor(private diaryDataService: DiaryDataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.diaryEntry = this.diaryDataService.getDiaryEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })
    

    this.diaryForm = new FormGroup({
      'recipe': new FormControl(this.editMode ? this.diaryEntry.recipe : '', [Validators.required]),
      'preptime': new FormControl(this.editMode ? this.diaryEntry.preptime : '', [Validators.required]),
      'cooktime': new FormControl(this.editMode ? this.diaryEntry.cooktime:'', [Validators.required]),
      'cuisine': new FormControl(this.editMode ? this.diaryEntry.cuisine:'', [Validators.required]),
      'course': new FormControl(this.editMode ? this.diaryEntry.course:'', [Validators.required]),
      'diet': new FormControl(this.editMode ? this.diaryEntry.diet:'', [Validators.required]),
      'ingredients': new FormControl(this.editMode ? this.diaryEntry.ingredients:'', [Validators.required])
    })
    
  }

  onSubmit(){
    const entry = new DiaryEntry('', this.diaryForm.value.recipe, this.diaryForm.value.preptime,
    this.diaryForm.value.cooktime, this.diaryForm.value.cuisine,this.diaryForm.value.course,this.diaryForm.value.diet,
    this.diaryForm.value.ingredients);
    if(this.editMode){
      entry.id = this.paramId;
      this.diaryDataService.updateEntry(this.paramId, entry);
    }
    else{
      this.diaryDataService.onAddDiaryEntry(entry);
    }
    this.router.navigateByUrl("");
  }
}
