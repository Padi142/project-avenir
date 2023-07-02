CREATE TABLE IF NOT EXISTS "scan_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"code_id" integer NOT NULL,
	"scanned_on" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "codes" ADD COLUMN "hash" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hash" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scan_records" ADD CONSTRAINT "scan_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scan_records" ADD CONSTRAINT "scan_records_code_id_codes_id_fk" FOREIGN KEY ("code_id") REFERENCES "codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
