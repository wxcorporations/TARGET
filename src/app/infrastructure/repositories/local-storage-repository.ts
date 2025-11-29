// Tipo base: precisa ter um id numérico
export interface Base {
    id: number | string;
}

export class LocalStorageRepository {
    constructor(private readonly storageKey: string) {
    }

    static hasBase(name: string): boolean {
        return Boolean(window.localStorage.getItem(name));
    }
    private load(): Base[] | [] {
        const json = window.localStorage.getItem(this.storageKey);

        if (!json) return [];

        try {
            return JSON.parse(json);
        } catch {
            return [];
        }
    }


    private save(list: Base[]): void {
        window.localStorage.setItem(this.storageKey, JSON.stringify(list));
    }

    createBase(list: Base[]): void {
        window.localStorage.setItem(this.storageKey, JSON.stringify(list));
    }

    getAll(): Base[] {
        return this.load();
    }


    add(item: Base): void {
        const list: Base[] = this.load();

        if (item.id) {
            list.push(item);
            this.save(list);
        }
    }

    remove(id: string): void {
        const list = this.load();
        const filtered = list.filter((i: Base) => i.id !== id);
        this.save(filtered);
    }

    clear(): void {
        this.save([]);
    }
}
