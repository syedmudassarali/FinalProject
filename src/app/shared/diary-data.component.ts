import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { DiaryEntry } from "./dairy-entry.model";

@Injectable({providedIn:"root"})
export class DiaryDataService{

    public maxId: number;

    constructor(private http: HttpClient){}

    updateEntry(id: string, entry: DiaryEntry) {
      this.http.put<{message: string}>('http://localhost:3000/update-entry/' + id, entry).subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries();
      })
    }
    
    public diarySubject = new Subject<DiaryEntry[]>();
    private diaryEntries: DiaryEntry[] = [];

    onDeleteEntry(id: string){
        
        this.http.delete<{message: string}>('http://localhost:3000/remove-entry/' + id).subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getDiaryEntries();
        })
    }

    getDiaryEntries(){
        this.http.get<{diaryEntries: any}>('http://localhost:3000/diary-entries')
        .pipe(map((responseData) => {
            return responseData.diaryEntries.map((entry: { _id: string;
                recipe: String;
                preptime: Number;
                cooktime: Number;
                cuisine: String;
                course: String;
                diet: String;
                ingredients: String;                
                
                }) => {
                return {
                    recipe: entry.recipe,
                    preptime: entry.preptime,
                    id: entry._id,
                    cooktime: entry.cooktime,
                    cuisine: entry.cuisine,
                    course: entry.course,
                    diet: entry.diet,
                    ingredients: entry.ingredients,
              
                }
            })
        }))
        .subscribe((updateResponse) => {
            this.diaryEntries = updateResponse;
            this.diarySubject.next(this.diaryEntries);
        })
    }

    getDiaryEntry(id: string){
        const index = this.diaryEntries.findIndex(el => {
            return el.id == id;
        })
        return this.diaryEntries[index];
    }

    onAddDiaryEntry(diaryEntry: DiaryEntry){
     this.http.post<{message: string}>('http://localhost:3000/add-entry', diaryEntry).subscribe((jsonData) => {
                console.log(diaryEntry);
                this.getDiaryEntries();
            })
    }
}