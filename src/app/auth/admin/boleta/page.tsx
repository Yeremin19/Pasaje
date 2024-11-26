"use client";

interface Props {
    name: string | undefined
    apellido: string | undefined
    fecha: string | undefined
    hora: string | undefined
    dni: string | undefined
    asiento: string | undefined
    precio: string | undefined

}

const Receipt = ({name, apellido, fecha, hora, dni, asiento, precio}: Props) => {

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg border border-gray-300 p-4 text-sm font-sans">
            <div className="text-center mb-4">
                <h1 className="text-xl font-bold">El Rápido S.R.L.</h1>
                <p className="text-gray-600">AV. 28 DE JULIO NRO 20 URB. HUARUPAMPA ANCHASH - HUARAZ</p>
                <p className="text-gray-600">RUC: 20002561449</p>
            </div>
            <hr className="border-gray-400 mb-4" />
            <div className="mb-4">
                <p className="font-bold">Boleta de Venta Electrónica</p>
                <p className="text-gray-600">BP02 - 170410</p>
            </div>
            <div className="mb-4">
                <table className="w-full text-left">
                    <tbody>
                        <tr>
                            <td className="font-bold">DATOS DEL PASAJERO</td>
                        </tr>
                        <tr>
                            <td>APELLIDOS Y NOMBRES:</td>
                            <td className="text-right">{name} {apellido}</td>
                        </tr>
                        <tr>
                            <td>TIPO DE DOCUMENTO:</td>
                            <td className="text-right">DNI</td>
                        </tr>
                        <tr>
                            <td>NÚMERO DE DOCUMENTO:</td>
                            <td className="text-right">{dni}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mb-4">
                <p className="font-bold">DATOS DEL VIAJE</p>
                <table className="w-full text-left">
                    <tbody>
                        <tr>
                            <td>CIUDAD DE ORIGEN Y DESTINO:</td>
                            <td className="text-right">HUARAZ PRINCIPAL - CHIQUIAN</td>
                        </tr>
                        <tr>
                            <td>DÍA Y HORA DE VIAJE:</td>
                            <td className="text-right">{fecha} {hora}</td>
                        </tr>
                        <tr>
                            <td>NÚMERO DE ASIENTO:</td>
                            <td className="text-right">{asiento}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mb-4">
                <p className="font-bold">DESPLAZAMIENTO</p>
                <p className="text-gray-600">EMBARQUE:</p>
                <p className="ml-4 text-gray-800">AV. 28 DE JULIO NRO 20 URB. HUARUPAMPA (LADO DE LA IGLESIA SAN ANTONIO) ANCASH - HUARAZ</p>
                <p className="text-gray-600">DESEMBARQUE:</p>
                <p className="ml-4 text-gray-800">JR. COMERCIO S/N CND. CHIQUIAN ANCAS - BOLOGNESI CHIQUIAN</p>
            </div>
            <hr className="border-gray-400 mb-4" />
            <div className="mb-4">
                <p className="text-center font-bold">SON: QUINCE CON 00/100 SOLES</p>
                <table className="w-full text-left">
                    <tbody>
                        <tr>
                            <td>TOTAL GRAVADO:</td>
                            <td className="text-right">0.00</td>
                        </tr>
                        <tr>
                            <td>TOTAL GRATUITA:</td>
                            <td className="text-right">0.00</td>
                        </tr>
                        <tr>
                            <td>TOTAL EXONERADO:</td>
                            <td className="text-right">{precio}</td>
                        </tr>
                        <tr>
                            <td>TOTAL DESCUENTO:</td>
                            <td className="text-right">0.00</td>
                        </tr>
                        <tr>
                            <td>IGV:</td>
                            <td className="text-right">0.00</td>
                        </tr>
                        <tr>
                            <td><strong>IMPORTE TOTAL:</strong></td>
                            <td className="text-right font-bold">{precio}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <p className="text-gray-600">REPRESENTACIÓN IMPRESA DEL COMPROBANTE</p>
                <p className="text-gray-600">GRACIAS POR SU PREFERENCIA</p>
            </div>
        </div>
    );
};

export default Receipt;