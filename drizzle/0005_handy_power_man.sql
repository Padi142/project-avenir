ALTER TABLE "code_messages" ADD COLUMN "code_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code_messages" ADD CONSTRAINT "code_messages_code_id_codes_id_fk" FOREIGN KEY ("code_id") REFERENCES "codes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
