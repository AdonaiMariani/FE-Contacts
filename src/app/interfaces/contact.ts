export interface Contact {
    id: number;
    name: string;
    phone: string;
    email?: string | null;
    address?: string | null;
    isFavorite?: boolean;
}
