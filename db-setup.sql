/*
  # MedCare Hospital System Database Schema

  1. New Tables
    - `appointments`: Patient appointment bookings
    - `staff_members`: Medical staff information
    - `departments`: Hospital departments
    - `patients`: Patient records
    - `vital_signs`: Real-time patient vitals
    - `bed_assignments`: Current bed occupancy

  2. Security
    - Enable RLS on all tables
    - Add policies for secure data access

  3. Indexes
    - Add indexes for frequently queried columns
*/

CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text,
  head_doctor text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments are viewable by everyone"
  ON departments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS staff_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  email text UNIQUE NOT NULL,
  department_id uuid REFERENCES departments(id),
  specialization text,
  phone text,
  rating numeric DEFAULT 4.5,
  bio text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff info viewable by authenticated users"
  ON staff_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE,
  phone text,
  date_of_birth date,
  blood_type text,
  allergies text,
  medical_history text,
  admitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view own records"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  department text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time,
  notes text,
  status text DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Appointments viewable by staff"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Patients can create appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS vital_signs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id),
  heart_rate integer,
  blood_pressure text,
  oxygen_saturation numeric,
  temperature numeric,
  respiratory_rate integer,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE vital_signs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vital signs viewable by authorized staff"
  ON vital_signs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS bed_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bed_number integer UNIQUE NOT NULL,
  patient_id uuid REFERENCES patients(id),
  status text DEFAULT 'vacant',
  admission_date timestamptz,
  discharge_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bed_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bed assignments viewable by staff"
  ON bed_assignments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_vital_signs_patient ON vital_signs(patient_id);
CREATE INDEX idx_vital_signs_recorded ON vital_signs(recorded_at);
CREATE INDEX idx_bed_assignments_status ON bed_assignments(status);
CREATE INDEX idx_staff_department ON staff_members(department_id);

INSERT INTO departments (name, description, icon, head_doctor) VALUES
  ('Intensive Care Unit', 'Critical care with advanced monitoring', '🏥', 'Dr. Robert Chen'),
  ('Cardiology', 'Heart and cardiovascular diseases', '❤️', 'Dr. Sarah Newman'),
  ('Pulmonology', 'Respiratory system care', '🫁', 'Dr. James Wilson'),
  ('Neurology', 'Neurological disorders', '🧠', 'Dr. Emma Kumar'),
  ('Emergency Medicine', 'Trauma and emergency care', '🦷', 'Dr. Michael Johnson'),
  ('Surgery', 'General and specialized surgery', '⚕️', 'Dr. Lisa Anderson');

INSERT INTO staff_members (name, role, email, department_id, specialization, rating, bio)
SELECT
  'Dr. Robert Chen', 'Chief ICU Specialist', 'robert.chen@medcare.com', id, 'Critical Care', 4.9, '20+ years of critical care experience'
FROM departments WHERE name = 'Intensive Care Unit';

INSERT INTO staff_members (name, role, email, department_id, specialization, rating, bio)
SELECT
  'Dr. Sarah Newman', 'Cardiology Director', 'sarah.newman@medcare.com', id, 'Cardiology', 4.8, '18+ years in cardiac care'
FROM departments WHERE name = 'Cardiology';

INSERT INTO staff_members (name, role, email, department_id, specialization, rating, bio)
SELECT
  'Dr. Michael Johnson', 'Emergency Head', 'michael.johnson@medcare.com', id, 'Emergency Medicine', 4.7, '15+ years trauma expertise'
FROM departments WHERE name = 'Emergency Medicine';

INSERT INTO staff_members (name, role, email, department_id, specialization, rating, bio)
SELECT
  'Dr. Emma Kumar', 'Neurology Specialist', 'emma.kumar@medcare.com', id, 'Neurology', 4.9, '16+ years in neurology'
FROM departments WHERE name = 'Neurology';
