import prisma from "@/libs/prisma";
import { addDays, subDays, subYears, setHours, setMinutes } from 'date-fns'

// Definir las rutas y sus precios
const RUTAS_CONFIG = [
    { origen: 'Huaraz', destino: 'Chiquian', precio: 15.00, distancia_km: 84 },
    { origen: 'Huaraz', destino: 'Conococha', precio: 14.00, distancia_km: 57 },
    { origen: 'Huaraz', destino: 'Baypass', precio: 15.00, distancia_km: 70 },
    { origen: 'Huaraz', destino: 'Pachapaqui', precio: 15.00, distancia_km: 95 },
    { origen: 'Huaraz', destino: 'Huanzala', precio: 18.00, distancia_km: 110 },
    { origen: 'Huaraz', destino: 'Huallanca', precio: 18.00, distancia_km: 115 },
    { origen: 'Huaraz', destino: 'La Union', precio: 25.00, distancia_km: 130 }
]

export async function reservaSeeder() {
    console.log('🌱 Iniciando proceso de seeding...')

    // Crear rutas base
    const rutas = await Promise.all(
        RUTAS_CONFIG.map(ruta =>
            prisma.ruta.create({
                data: {
                    origen: ruta.origen,
                    destino: ruta.destino,
                    distancia_km: ruta.distancia_km
                }
            })
        )
    )

    // Crear buses
    const buses = await Promise.all([
        prisma.bus.create({
            data: {
                placa: 'T4N-789',
                modelo: 'Toyota Coaster',
                capacidad: 30
            }
        }),
        prisma.bus.create({
            data: {
                placa: 'H8M-456',
                modelo: 'Toyota Coaster',
                capacidad: 30
            }
        }),
        prisma.bus.create({
            data: {
                placa: 'P2K-123',
                modelo: 'Toyota Coaster',
                capacidad: 30
            }
        })
    ])

    // Crear asientos para cada bus
    const asientosPorBus = await Promise.all(
        buses.map(async (bus) => {
            const asientos = []
            for (let i = 1; i <= 30; i++) {
                const tipo = i % 2 === 0 ? 'pasillo' : 'ventana'
                asientos.push(
                    prisma.asiento.create({
                        data: {
                            numero_asiento: i.toString().padStart(2, '0'),
                            tipo: tipo,
                            bus_id: bus.bus_id
                        }
                    })
                )
            }
            return Promise.all(asientos)
        })
    )

    // Crear algunos usuarios
    const usuarios = await Promise.all([
        prisma.usuario.create({
            data: {
                nombre: 'Juan',
                apellido: 'Pérez',
                dni: '12345678',
                correo: 'juan@example.com',
                telefono: '987654321',
                password: 'hashed_password',
                rol: 'cliente'
            }
        }),
        prisma.usuario.create({
            data: {
                nombre: 'María',
                apellido: 'García',
                dni: '87654321',
                correo: 'maria@example.com',
                telefono: '123456789',
                password: 'hashed_password',
                rol: 'cliente'
            }
        }),
        prisma.usuario.create({
            data: {
                nombre: 'Carlos',
                apellido: 'Rodríguez',
                dni: '45678912',
                correo: 'carlos@example.com',
                telefono: '951234567',
                password: 'hashed_password',
                rol: 'cliente'
            }
        })
    ])

    // Generar horarios y reservas para los últimos 5 años
    const fechaInicio = subYears(new Date(), 5)
    const fechaFin = new Date()
    let currentDate = fechaInicio

    // Horarios fijos para cada ruta
    const HORARIOS_SALIDA = [
        { hora: 6, minuto: 0 },  // 6:00 AM
        { hora: 8, minuto: 0 },  // 8:00 AM
        { hora: 10, minuto: 0 }, // 10:00 AM
        { hora: 14, minuto: 0 }, // 2:00 PM
        { hora: 16, minuto: 0 }  // 4:00 PM
    ]

    while (currentDate <= fechaFin) {
        // Para cada ruta, crear horarios diarios
        for (let rutaIndex = 0; rutaIndex < rutas.length; rutaIndex++) {
            const ruta = rutas[rutaIndex]
            const rutaConfig = RUTAS_CONFIG[rutaIndex]

            // Crear horarios para cada hora de salida
            const horarios = await Promise.all(
                HORARIOS_SALIDA.map(async (horario) => {
                    const horaSalida = setHours(setMinutes(currentDate, horario.minuto), horario.hora)
                    // Calculamos hora de llegada basada en la distancia (asumiendo velocidad promedio de 40 km/h)
                    const tiempoViajeHoras = rutaConfig.distancia_km / 40
                    const horaLlegada = addDays(horaSalida, Math.floor(tiempoViajeHoras / 24))
                    horaLlegada.setHours(horaSalida.getHours() + (tiempoViajeHoras % 24))

                    return prisma.horario.create({
                        data: {
                            fecha: currentDate,
                            hora_salida: horaSalida,
                            hora_llegada: horaLlegada,
                            ruta_id: ruta.ruta_id,
                            bus_id: buses[Math.floor(Math.random() * buses.length)].bus_id
                        }
                    })
                })
            )

            // Generar reservas aleatorias para cada horario
            for (const horario of horarios) {
                // Número de reservas varía según el día de la semana (más en fines de semana)
                const esFindeSemana = [0, 6].includes(new Date(horario.fecha).getDay())
                const numReservas = Math.floor(Math.random() * (esFindeSemana ? 25 : 15)) + (esFindeSemana ? 5 : 3)
                const asientosDisponibles = [...asientosPorBus[0]]

                for (let i = 0; i < numReservas && i < asientosDisponibles.length; i++) {
                    const precio = rutaConfig.precio // Usar el precio fijo de la ruta
                    const usuario = usuarios[Math.floor(Math.random() * usuarios.length)]
                    const asiento = asientosDisponibles[i]
                    const diasAntes = Math.floor(Math.random() * 7) // Reservas entre 0-7 días antes

                    await prisma.reserva.create({
                        data: {
                            precio: precio,
                            estado: Math.random() > 0.05 ? 'pagado' : 'cancelado', // 95% pagado, 5% cancelado
                            fecha_reserva: subDays(new Date(horario.fecha), diasAntes),
                            usuario_id: usuario.usuario_id,
                            horario_id: horario.horario_id,
                            asiento_id: asiento.asiento_id
                        }
                    })
                }
            }
        }

        currentDate = addDays(currentDate, 1)
    }

    console.log('✅ Seeding completado!')
}