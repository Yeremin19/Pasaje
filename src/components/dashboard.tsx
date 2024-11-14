"use client";
import React, {useContext, useEffect, useState} from 'react';
import Sidebar from '../components/sidebar'; // Ajusta la ruta si es necesario
import { Bar, Doughnut, Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { getReservas } from '@/actions/reserva'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const barData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      {
        label: 'Pasajes Vendidos',
        data: [30, 50, 40, 60, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Buses en Ruta', 'Rutas Populares', 'Reportes'],
    datasets: [
      {
        data: [10, 5, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ingresos del Mes',
        data: [5000, 7000, 8000, 6000, 9000],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Distribución de Ingresos',
        data: [
          { x: 1, y: 1000 },
          { x: 2, y: 2000 },
          { x: 3, y: 1500 },
          { x: 4, y: 3000 },
          { x: 5, y: 2500 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const [reservasTotalPrecio, setReservasTotalPrecio] = useState(0)
  const [reservasTotal, setReservasTotal] = useState(0)


  useEffect(() => {

    const getReservasTotal = async () => {
      const reservas: [{precio: string}] = await getReservas()

      let totalPrecio: number = 0
      let totalReservas = 0

      reservas.forEach( reserva => {
            if (reserva.precio) {
              //@ts-ignore
              totalPrecio += Number(reserva.precio);
            }
            totalReservas += 1
          }
      )

      // @ts-ignore
      setReservasTotalPrecio(totalPrecio)
      setReservasTotal(totalReservas)

    }

    getReservasTotal()

  }, []);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />

      <main className="flex-1 p-0">
        <div className="bg-cyan-800 text-white p-4 mb-6 shadow-md">
          <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-red-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="vendidos.png" alt="Pasajes Vendidos" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Pasajes Vendidos</h2>
                <p className="text-2xl font-bold">{reservasTotal}</p>
              </div>
            </div>

            <div className="bg-yellow-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="reporte.png" alt="Reportes" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Reportes</h2>
                <p className="text-2xl font-bold">50</p>
              </div>
            </div>

            <div className="bg-purple-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="buses.png" alt="Buses en Ruta" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Buses en Ruta</h2>
                <p className="text-2xl font-bold">10</p>
              </div>
            </div>

            <div className="bg-blue-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="rutas.png" alt="Rutas Populares" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Rutas Populares</h2>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>

            <div className="bg-orange-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="ingresos.png" alt="Ingresos del Día" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Ingresos del Día</h2>
                <p className="text-2xl font-bold">{reservasTotalPrecio}</p>
              </div>
            </div>
          </div>

          {/* Gráficos en la parte inferior */}
          <div className="grid grid-cols-2 gap-7 mt-8">
          <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Gráfico de Líneas</h3>
              <Line data={lineData} />
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Gráfico de Dispersión</h3>
              <Scatter data={scatterData} />
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Gráfico de Barras</h3>
              <Bar data={barData} />
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Gráfico Circular</h3>
              <Doughnut data={doughnutData} />
            </div>

          </div>
        </div> s
      </main>
    </div>
  );
}

export default Dashboard;
