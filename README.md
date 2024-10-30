json de insert

Bus
{
"placa": "ABC-123",
"modelo": "Mercedes-Benz Sprinter",
"capacidad": 30
}

Asiento
{
"numero_asiento": "1A",
"tipo": "ventana",
"bus_id": 1 // Asegúrate de tener un bus con este ID
}

ruta
{
"origen": "Lima",
"destino": "Arequipa",
"distancia_km": 1000.5
}

horario
{
"fecha": "2023-10-01T00:00:00.000Z",
"hora_salida": "2023-10-01T10:00:00.000Z",
"hora_llegada": "2023-10-01T14:00:00.000Z",
"precio": 50.0,
"ruta_id": 1, // Asegúrate de tener una ruta con este ID
"bus_id": 1 // Asegúrate de tener un bus con este ID
}

reserve

{
"estado": "pendiente",
"fecha_reserva": "2023-10-01T00:00:00.000Z",
"monto_total": 100.0,
"usuario_id": 1, // ID del usuario creado
"horario_id": 1, // Asegúrate de tener un horario con este ID
"asiento_id": 1 // Asegúrate de tener un asiento con este ID
}
