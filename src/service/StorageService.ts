import { Auth } from "firebase/auth";
import { addDoc, collection, doc, Firestore, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { DiaryEntryType } from "../data/Diary";

export class StorageService {

    private auth: Auth
    private db: Firestore

    constructor(auth: Auth, db: Firestore) {
        this.auth = auth
        this.db = db
    }

    public async getEntries(filter: string): Promise<DiaryEntryType[]> {
        const entriesRef = collection(this.db, "entries")
        const q = query(entriesRef,
            where("userId", "==", this.auth.currentUser?.uid ?? ''),
            orderBy("dateTime", "desc")
        )
        const querySnapshot = await getDocs(q)
        const entries: DiaryEntryType[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            entries.push({
                id: doc.id,
                mood: data.mood,
                star: data.star,
                date: new Date(data.dateTime),
                title: data.title,
                content: data.content,
            })
        })
        //console.log(entries)
        return entries
    }

    public async getEntry(id: string): Promise<DiaryEntryType | null> {
        const docRef = doc(this.db, "entries", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.userId !== (this.auth.currentUser?.uid ?? '')) {
                // security breach
                return null
            }
            return {
                id: docSnap.id,
                mood: data.mood,
                star: data.star,
                date: new Date(data.dateTime),
                title: data.title,
                content: data.content,
            }
        } else {
            return null
        }
    }

    public async addEntry(entry: DiaryEntryType) {
        const docRef = await addDoc(collection(this.db, "entries"), {
            mood: entry.mood,
            star: entry.star,
            dateTime: entry.date.toJSON(),
            title: entry.title,
            content: entry.content,
            userId: this.auth.currentUser?.uid ?? '',
        });
    }

    public async updateEntry(entry: DiaryEntryType) {
        await setDoc(doc(this.db, "entries", entry.id), {
            mood: entry.mood,
            star: entry.star,
            dateTime: entry.date.toJSON(),
            title: entry.title,
            content: entry.content,
            userId: this.auth.currentUser?.uid ?? '',
        });
    }
}