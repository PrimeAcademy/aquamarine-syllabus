CREATE TABLE "shoes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"cost" INTEGER
);

INSERT INTO "shoes" ("name", "cost")
VALUES ('Red Wing', '250'),
('Puma Soliel V2', 40),
('Space Boots', 10),
('Adidas Superstar', 192),
('Jordan XII', 178),
('Converse Chuck Taylor low', 32),
('Nike Roshe Run', 127),
('Nike Huarache', 148); 