
export async function getReservas() {
    try {
        const response = await fetch('http://localhost:3000/api/reserve')
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Error en la función totalReservas' + error
        )
        return []
    }
}