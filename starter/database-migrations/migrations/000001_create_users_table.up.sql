CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ NULL
);

INSERT INTO users(id, username, email, password) VALUES 
('bd006d41-aded-4040-9934-2ba4e909ef9a', 'admin', 'admin@gmail.com', '$2a$10$4DpVg6a3.jPMnkIx.U3R4exDtbr6ivuCS//cpYdHkJh4/txpop6ey');