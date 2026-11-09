import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, AppointmentStatus, BookingStatus, Gender, PaymentMethod } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const doctor = await prisma.doctor.upsert({
    where: { pmdcNumber: 'PMDC-123456' },
    update: {},
    create: {
      fullName: 'Muhammad Irfan',
      pmdcNumber: 'PMDC-123456',
      specialty: 'Cardiologist',
      qualification: 'MBBS, FCPS (Cardiology)',
      phone: '03001234567',
      city: 'Lahore',
      clinicName: 'Irfan Heart Care Clinic',
      bio: 'Experienced cardiologist providing compassionate diagnosis and cardiac care.',
      experienceYears: 12,
      consultationFeePkr: 2500,
      availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    },
  });

  const patientData = [
    {
      fullName: 'Ayesha Khan',
      cnic: '3520212345671',
      phone: '03011234567',
      dateOfBirth: new Date('1991-04-15'),
      gender: Gender.FEMALE,
      bloodGroup: 'B+',
      city: 'Lahore',
      address: 'Gulberg III, Lahore',
    },
    {
      fullName: 'Usman Ali',
      cnic: '3520212345672',
      phone: '03121234567',
      dateOfBirth: new Date('1985-09-22'),
      gender: Gender.MALE,
      bloodGroup: 'O+',
      city: 'Lahore',
      chronicConditions: 'Mild hypertension',
    },
    {
      fullName: 'Sara Ahmed',
      cnic: '3520212345673',
      phone: '03221234567',
      dateOfBirth: new Date('1997-12-03'),
      gender: Gender.FEMALE,
      bloodGroup: 'A+',
      city: 'Lahore',
    },
  ];

  const patients = [];
  for (const data of patientData) {
    patients.push(await prisma.patient.upsert({
      where: { cnic: data.cnic },
      update: data,
      create: data,
    }));
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(10, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(11, 30, 0, 0);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(14, 0, 0, 0);

  const completedAppointment = await findOrCreateAppointment({
    doctorId: doctor.id,
    patientId: patients[0].id,
    appointmentDate: yesterday,
    status: AppointmentStatus.COMPLETED,
    reason: 'Regular heart health checkup',
    feePkr: doctor.consultationFeePkr,
  });
  const bookedAppointment = await findOrCreateAppointment({
    doctorId: doctor.id,
    patientId: patients[1].id,
    appointmentDate: tomorrow,
    status: AppointmentStatus.BOOKED,
    reason: 'Blood pressure and chest discomfort consultation',
    feePkr: doctor.consultationFeePkr,
  });
  const followUpAppointment = await findOrCreateAppointment({
    doctorId: doctor.id,
    patientId: patients[2].id,
    appointmentDate: nextWeek,
    status: AppointmentStatus.BOOKED,
    reason: 'Initial cardiac consultation',
    feePkr: doctor.consultationFeePkr,
  });

  await prisma.prescription.upsert({
    where: { id: `demo-prescription-${completedAppointment.id}` },
    update: {},
    create: {
      id: `demo-prescription-${completedAppointment.id}`,
      appointmentId: completedAppointment.id,
      diagnosis: 'Mild hypertension',
      notes: 'Reduce salt intake and check blood pressure twice a day.',
      medicines: [
        { name: 'Amlodipine', dose: '5mg once daily', days: 30 },
        { name: 'Aspirin', dose: '75mg once daily after dinner', days: 30 },
      ],
      labTests: ['ECG', 'Lipid profile'],
      followUpDate: nextWeek,
    },
  });

  await prisma.payment.upsert({
    where: { id: `demo-payment-${completedAppointment.id}` },
    update: {},
    create: {
      id: `demo-payment-${completedAppointment.id}`,
      appointmentId: completedAppointment.id,
      amountPkr: 2500,
      method: PaymentMethod.JAZZCASH,
      reference: 'JC-DEMO-1001',
    },
  });

  await prisma.booking.upsert({
    where: { appointmentId: bookedAppointment.id },
    update: { status: BookingStatus.CONFIRMED },
    create: {
      doctorId: doctor.id,
      patientId: patients[1].id,
      appointmentId: bookedAppointment.id,
      bookingDate: bookedAppointment.appointmentDate,
      status: BookingStatus.CONFIRMED,
      notes: 'Patient requested a morning slot.',
    },
  });
  await prisma.booking.upsert({
    where: { appointmentId: followUpAppointment.id },
    update: {},
    create: {
      doctorId: doctor.id,
      patientId: patients[2].id,
      appointmentId: followUpAppointment.id,
      bookingDate: followUpAppointment.appointmentDate,
      status: BookingStatus.PENDING,
    },
  });

  await prisma.review.upsert({
    where: { appointmentId: completedAppointment.id },
    update: { rating: 5, comment: 'Very professional and explained everything clearly.' },
    create: {
      doctorId: doctor.id,
      patientId: patients[0].id,
      appointmentId: completedAppointment.id,
      rating: 5,
      comment: 'Very professional and explained everything clearly.',
    },
  });

  console.log(`Demo data ready for ${doctor.fullName}`);
}

async function findOrCreateAppointment(data: {
  doctorId: string;
  patientId: string;
  appointmentDate: Date;
  status: AppointmentStatus;
  reason: string;
  feePkr: number;
}) {
  const existing = await prisma.appointment.findFirst({
    where: {
      doctorId: data.doctorId,
      patientId: data.patientId,
      appointmentDate: data.appointmentDate,
    },
  });
  return existing ?? prisma.appointment.create({ data });
}

main()
  .catch((error) => {
    console.error('Demo seed failed', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
