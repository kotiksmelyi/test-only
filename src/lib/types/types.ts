export interface IEvent {
	year: number;
	description: string;
}

export interface IEvents {
	id: number;
	title: string;
	events: IEvent[];
}