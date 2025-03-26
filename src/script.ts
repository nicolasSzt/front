class Veiculo {
    marca: string
    color: string
    distancia_recorrida:number

    constructor(
        marca: string,
        color: string,
        distancia_recorrida: number
    ) {
        this.marca = marca;
        this.color = color;
        this.distancia_recorrida = distancia_recorrida;
    }

    aumentarDistancia(distancia: number) {
        this.distancia_recorrida = this.distancia_recorrida += distancia
        console.log(autoRojo);
    }

}

const autoRojo = new Veiculo("Ferrari", "Rojo", 10000)

autoRojo.aumentarDistancia(90)

