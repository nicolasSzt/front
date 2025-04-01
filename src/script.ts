// class Vehicle {
//     private marca: string;
//     private color: string;
//     private distanciaRecorrida: number;

//     constructor(
//         marca: string,
//         color: string,
//         distanciaRecorrida: number
//     ) {
//         this.marca = marca;
//         this.color = color;
//         this.distanciaRecorrida = distanciaRecorrida;
//     }

//     increaseDistance(distancia: number): void {

//         if (distancia <= 0) {
//             console.log("La distancia debe ser mayor a 0.");
//         }

//         this.distanciaRecorrida += distancia;
//         console.log(`Nueva distancia recorrida: ${this.distanciaRecorrida} km`);
//     }

//     veicleInformation(): string {
//         return `Vehiculo: ${this.marca} color: ${this.color}, Distancia: ${this.distanciaRecorrida} km`;
//     }

// }

// const autoRojo = new Vehicle("Ferrari", "Rojo", 10000);

// console.log(`informacion veicular: ${autoRojo.veicleInformation()}`);

// autoRojo.increaseDistance(100);

// crear gestor de tareas

// Tares

/*
    -id 
    -titulo
    -completada 
    - fecha_creacion 
*/

class GeneratorId {
    private generatedIds: Set<string> = new Set();

    public getRandomId(): string {
        let idRandom: string;

        do {
            idRandom = Math.floor(Math.random() * 10000).toString(35);
        } while (this.generatedIds.has(idRandom));

        this.generatedIds.add(idRandom);
        return idRandom;
    }
}

class Log {
    private id: string
    private description?: string;
    private dateCreate?: string;

    constructor(
        id: string = new GeneratorId().getRandomId(),
        description?: string,
        dateCreate?: string
    ) {
        this.id = id;
        this.description = description
        this.dateCreate = dateCreate
    }

    public getLogId() {
        return this.id
    }
}

class AdminitrationAction {
    private actions: Log[] = [];

    constructor(action: Log[]) {
        this.actions = action;
    }

    public addAction(description: string, dateCreate: string): void {
        const actionId = new Log().getLogId()
        const newAction = new Log(actionId, description, dateCreate)

        this.actions.push(newAction);
    }

    public showActions(): void {
        if (this.actions.length > 0) {
            console.log(this.actions)
        } else {
            console.log('no hay Accciones')
        }
    }

    public deleteAction(id: string): void {
        this.actions = this.actions.filter(action => action.getLogId() !== id);
    }

    public deleteAllActions(): void {

        while (this.actions.length > 0) {
            this.actions.pop();
        }

    }

}

const newAction = new AdminitrationAction([]);

newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.addAction('Estudiar TypeScript', new Date().toLocaleString());
newAction.showActions()
newAction.showActions()
newAction.deleteAllActions();
newAction.showActions()
