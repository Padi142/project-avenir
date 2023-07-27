ALTER TABLE "scan_records" ADD COLUMN "received_message" integer;--> statement-breakpoint
ALTER TABLE "scan_records" ADD COLUMN "sent_message" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scan_records" ADD CONSTRAINT "scan_records_received_message_code_messages_id_fk" FOREIGN KEY ("received_message") REFERENCES "code_messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scan_records" ADD CONSTRAINT "scan_records_sent_message_code_messages_id_fk" FOREIGN KEY ("sent_message") REFERENCES "code_messages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
