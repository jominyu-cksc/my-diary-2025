import { Auth } from "firebase/auth";
import { collection, Firestore, getDocs, query, where } from "firebase/firestore"; 
import { DiaryEntryType } from "../data/Diary";

export class StorageService {

    private auth: Auth
    private db: Firestore

    constructor(auth: Auth, db: Firestore) {
        this.auth = auth
        this.db = db
    }

    public async getEntries(filter: string): Promise<DiaryEntryType[]> {
        const entriesRef = collection(this.db, "entries");
        const q = query(entriesRef, where("userId", "==", this.auth.currentUser?.uid ?? ''))
        const querySnapshot = await getDocs(q)
        const entries: DiaryEntryType[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            entries.push({
                id: doc.id,
                mood: data.mood,
                date: new Date(data.dateTime),
                title: data.title,
                content: data.content,            
            })
        })
        //console.log(entries)
        return entries
    }
}