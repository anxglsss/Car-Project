export interface ICar {
	id?: number
	name: string
	color: string
	velocity?: number
	distance?: number
	currentDistance?: number
	startTime?: number
	wins?: number
	time?: number
}
export type engineStatus = 'started' | 'stopped' | 'drive'
