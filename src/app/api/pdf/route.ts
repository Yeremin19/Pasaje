import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(req: NextRequest) {
	// Manejar solicitud POST
	const { html } = await req.json()

	try {
		// Lanzar una nueva instancia del navegador, modo sin sandbox
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disable-setuid-sandbox'], // Sin sandbox
		})
		const page = await browser.newPage()

		// Establecer el contenido HTML en la página y esperar a que la red esté inactiva
		await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 }) // Aumentar tiempo de espera a 60s

		// Generar el PDF
		const pdfBuffer = await page.pdf({ format: 'A4' })

		// Cerrar el navegador
		await browser.close()

		// Enviar el PDF como respuesta
		const pdfResponse = new NextResponse(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename=output.pdf',
			},
		})

		return pdfResponse
	} catch (error) {
		// Manejo de errores específicos
		if (error) {
			console.error('Error: Timeout al generar el PDF.', error)
			return NextResponse.json(
				{ error: 'Timeout al generar el PDF. Intente nuevamente.' },
				{ status: 500 }
			)
		} else {
			console.error('Error al generar el PDF:', error)
			return NextResponse.json(
				{ error: 'Error al generar el PDF.' },
				{ status: 500 }
			)
		}
	}
}
