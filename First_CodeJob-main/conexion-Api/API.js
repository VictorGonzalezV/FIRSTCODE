const url = "http://localhost:3000/ofertas";

export const obtenerOfertas = async () => {
try {
    const result = await fetch(url);
    const ofertas = await result.json();

    return ofertas;
} catch (error) {}
};


export const nuevaOferta = async (oferta) => {
console.log(oferta);
try {
    await fetch(url, {
    method: "POST",
    body: JSON.stringify(oferta),
    headers: {
        "Content-Type": "application/json",
    },
    });
    window.location.href = "perfil-empresa.html";
} catch (error) {
    console.log(error);
}
};
