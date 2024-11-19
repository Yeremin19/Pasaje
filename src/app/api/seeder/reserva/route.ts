import {NextResponse} from "next/server";
import {reservaSeeder} from "@/app/api/seeder/reserva/reservaSeeder";

export async function POST(req: Request) {
    try {
        await reservaSeeder()
        return NextResponse.json({ message: "Seeder completado"})
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }
}