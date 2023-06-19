CREATE TABLE IF NOT EXISTS "codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"points" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_scanned" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_logged_in" timestamp DEFAULT now() NOT NULL
);
