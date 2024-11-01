import { NextResponse, NextRequest } from 'next/server'
import ExcelJS from 'exceljs'

export async function POST(req: NextRequest) {
	try {
		// Leer los datos del cuerpo de la solicitud
		const { data } = await req.json()

		// Crear un nuevo libro de trabajo
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Sheet 1')

		// Agregar columnas
		worksheet.columns = [
			{ header: 'ID', key: 'id', width: 10 },
			{ header: 'Nombre', key: 'nombre', width: 30 },
			{ header: 'Correo', key: 'correo', width: 30 },
		]

		// Agregar filas con los datos recibidos
		data.forEach((item: { id: number; nombre: string; correo: string }) => {
			worksheet.addRow(item)
		})

		// Generar el archivo Excel en un buffer
		const buffer = await workbook.xlsx.writeBuffer()

		// Enviar el archivo Excel como respuesta
		const excelResponse = new NextResponse(buffer, {
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': 'attachment; filename=output.xlsx',
			},
		})

		return excelResponse
	} catch (error) {
		console.error('Error al generar el archivo Excel:', error)
		return NextResponse.json(
			{ error: 'Error al generar el archivo Excel' },
			{ status: 500 }
		)
	}
}
