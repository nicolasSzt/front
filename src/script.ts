class Vehicle {
    private marca: string;
    private color: string;
    private distanciaRecorrida: number;

    constructor(
        marca: string,
        color: string,
        distanciaRecorrida: number
    ) {
        this.marca = marca;
        this.color = color;
        this.distanciaRecorrida = distanciaRecorrida;
    }

    increaseDistance(distancia: number): void {

        if (distancia <= 0) {
            console.log("La distancia debe ser mayor a 0.");
        }

        this.distanciaRecorrida += distancia;
        console.log(`Nueva distancia recorrida: ${this.distanciaRecorrida} km`);
    }

    veicleInformation(): string {
        return `Vehiculo: ${this.marca} color: ${this.color}, Distancia: ${this.distanciaRecorrida} km`;
    }
}

const autoRojo = new Vehicle("Ferrari", "Rojo", 10000);

console.log(`informacion veicular: ${autoRojo.veicleInformation()}`);

autoRojo.increaseDistance(100);
