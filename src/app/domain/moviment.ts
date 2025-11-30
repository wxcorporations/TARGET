export type IMovement = {
    id: string | number;
    create_at: string,
    description: string;
    cod_product: number;
    qtd: number;
};


type DateRange = {
    start?: string;
    end?: string;
};

type MovementFilter = {
    id?: string | number;
    description?: string;
    product_id?: number;
    date?: DateRange;
};

export class Movement {
    constructor(private readonly list: any) { }

    create(data: IMovement): IMovement {
        return {
            ...data
        }
    }

    filter(filter: MovementFilter): IMovement[] {
        const hasIdFilter =
            filter.id !== undefined &&
            filter.id !== null &&
            filter.id !== '' &&
            filter.id !== 0;

        const hasDescriptionFilter =
            !!filter.description && filter.description.trim().length > 0;

        const hasProductFilter = filter.product_id != 0;

        const hasDateStart = !!filter.date?.start;
        const hasDateEnd = !!filter.date?.end;

        const hasAnyFilter =
            hasIdFilter ||
            hasDescriptionFilter ||
            hasProductFilter ||
            hasDateStart ||
            hasDateEnd;

        if (!hasAnyFilter) {
            return this.list;
        }

        if (hasIdFilter) {
            return this.list.filter(
                (item: any) => String(item.id) === String(filter.id)
            );
        }

        return this.list.filter((item: any) => {
            const createdAt = new Date(item.create_at).getTime();

            if (hasDateStart) {
                const start = new Date(filter.date!.start!).getTime();
                if (createdAt < start) return false;
            }

            if (hasDateEnd) {
                const end = new Date(filter.date!.end!).getTime();
                if (createdAt > end) return false;
            }

            if (hasDescriptionFilter) {
                const descFilter = filter.description!.trim().toLowerCase();
                const descItem = (item.description ?? '').toLowerCase();
                if (!descItem.includes(descFilter)) return false;
            }

            if (hasProductFilter) {
                if (item.cod_product != filter.product_id) return false;
            }

            return true;
        });
    }
}
