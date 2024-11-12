import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const ultimaReserva = await prisma.reserva.findFirst({
            include: {
                usuario: true,
                horario: true,
                asiento: true,
            },
            orderBy: {
                reserva_id: 'desc', 
            },
        });
        
        if (!ultimaReserva) {
            throw new Error('No hay reservas');
        }

        console.log(ultimaReserva);
        return NextResponse.json(ultimaReserva);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
