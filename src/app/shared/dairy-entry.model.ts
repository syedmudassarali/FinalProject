export class DiaryEntry{

    public constructor(public id: string, public recipe: string,
        public preptime: Number,public cooktime: Number,public cuisine: string,
        public course: string,public diet: string,public ingredients: string){}
}
