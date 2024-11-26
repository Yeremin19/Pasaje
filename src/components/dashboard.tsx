"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar'; // Ajusta la ruta si es necesario
import {  Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { getReservas } from '@/actions/reserva';

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

  const lineDataDay = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [
      {
        label: 'Ingresos del Día',
        data: [2856, 3320, 3750, 3000, 3550, 3610, 3695 ], // Cambiar estos datos según los ingresos por día
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };

  const lineDataWeek = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Ingresos Semanales',
        data: [25425, 24450, 26380, 27200], // Cambiar según los ingresos semanales
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const lineDataMonth = {
    labels: ['Septiembre ', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        data: [77300, 77523, 75444, 77012], // Cambiar según los ingresos mensuales
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
    ],
  };

  const lineDataYear = {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Ingresos Anuales',
        data: [230000, 218000, 223000, 240500], // Cambiar según los ingresos anuales
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
    ],
  };

  const [reservasTotalPrecio, setReservasTotalPrecio] = useState(0);
  const [reservasTotal, setReservasTotal] = useState(0);

  useEffect(() => {
    const getReservasTotal = async () => {
      const reservas: [{ precio: string }] = await getReservas();

      let totalPrecio: number = 0;
      let totalReservas = 0;

      reservas.forEach((reserva) => {
        if (reserva.precio) {
          //@ts-ignore
          totalPrecio += Number(reserva.precio);
        }
        totalReservas += 1;
      });

      // @ts-ignore
      setReservasTotalPrecio(totalPrecio);
      setReservasTotal(totalReservas);
    };

    getReservasTotal();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />

      <main className="flex-1 p-0">
        <div className="bg-red-500 text-white p-4 mb-6 shadow-md">
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
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>

            <div className="bg-purple-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="buses.png" alt="Buses en Ruta" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Buses en Ruta</h2>
                <p className="text-2xl font-bold">11</p>
              </div>
            </div>

            <div className="bg-blue-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="rutas.png" alt="Rutas Populares" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Rutas Populares</h2>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>

            <div className="bg-orange-500 text-white p-4 shadow-md rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <img src="ingresos.png" alt="Ingresos del Día" className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-md font-semibold">Ingresos</h2>
                <p className="text-2xl font-bold">{reservasTotalPrecio}</p>
              </div>
            </div>
          </div>

          {/* Gráficos en la parte inferior */}
          <div className="grid grid-cols-2 gap-7 mt-8">
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4"> Predicción de Ingresos diarios</h3>
              <Line data={lineDataDay} />
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Predicción de Ingresos Semanales</h3>
              <Line data={lineDataWeek} />
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Predicción de Ingresos Mensuales</h3>
              <Line data={lineDataMonth} />
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Predicción de Ingresos Anuales</h3>
              <Line data={lineDataYear} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;