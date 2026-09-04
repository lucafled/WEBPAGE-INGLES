CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'student',
  modality VARCHAR(20) DEFAULT 'online',
  meet_link TEXT DEFAULT 'https://meet.google.com/abc-defg-hij'
);

CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'disponible'
);